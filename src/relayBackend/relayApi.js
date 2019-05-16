let getPair = require("./getCoinName.js")

let Cryptos = ["ETH", "BTC", "LTC", "XMR"];

async function limitOrderList(ipfs, web3) {

    let contractInstance = require("../contracts/IExchange.json")
    console.log(contractInstance)
    // to be sent at APP or Index js
    let webEx = new web3.eth.Contract(contractInstance.abi, '0x0a7FBfd6C6eaB1e06b0a21Ab2Dd0CAEfaD2957B9', {
        defaultAccount: '0x1234567890123456789012345678901234567891', // default from address
        defaultGasPrice: '20000000000' // default gas price in wei, 20 gwei in this case
    });

        // let trades = [];
        let options = {
            fromBlock: Number,
            toBlock: Number
        };
        // Make logic to search for the latest XX orders and remember the last block so it knows where from to fetch
        options = {
            fromBlock: 10573500,
            toBlock: 10673501
        };
        // Get the past events
        let pastEvents = await webEx.getPastEvents("TradeStart", options)
            .then(tradeEvent => {
                return tradeEvent
            });
    
        let orders = [];
        // Loop trough past Events and call getTrade Contract Function
        for(let x=0; x < pastEvents.length; x++){
            // Call getTrade
            await webEx.methods.getTrade(pastEvents[x].raw.topics[1]).call().then(res => {
             pastEvents[x].getTrade = res;
             console.log("res ", res)
             let collateral = res.collateral
             console.log(collateral)
             console.log("This is Collateral :", collateral)
             pastEvents[x].getTrade.collateralWei = web3.utils.fromWei(collateral);
            console.log("Get Trade: ", Math.floor(Date.now()/1000))
            })
    
            // Call getMarket 
            await webEx.methods.getMarket(pastEvents[x].getTrade.market).call().then(res => {
                pastEvents[x].getMarket = res;
            })
            console.log("getMarket: ", Math.floor(Date.now()/1000))
            console.log(pastEvents[x].getTrade.takerExtra)
            // Call IPFS storage and decode takeExtra and makeExtra 
            await ipfs.get(web3.utils.hexToAscii(pastEvents[x].getTrade.takerExtra))
            .then(res => JSON.parse(res[0].content)).then(res => {
                pastEvents[x].takerInfo = res
            })
            console.log("IPFS TakerExtra ", Math.floor(Date.now()/1000))
    
            await ipfs.get(web3.utils.hexToAscii(pastEvents[x].getTrade.makerExtra))
            .then(res =>  JSON.parse(res[0].content)).then(res => {
            pastEvents[x].makerInfo = res
            })
            console.log("IPFS MakerExtra", Math.floor(Date.now()/1000))
            console.log(pastEvents[x])
            // get pairs info       
            let pairs = await getPair(pastEvents[x].takerInfo.account, pastEvents[x].makerInfo.account, Cryptos)
            console.log(pairs, Math.floor(Date.now()/1000))
            pastEvents[x].makerInfo.name = pairs.address1 
            pastEvents[x].takerInfo.name = pairs.address2 
    
            let order = {
            "params": "",
            "signature": pastEvents[x].signature,
            "market": pastEvents[x].getTrade.market,
            "deal": pastEvents[x].getTrade.deal,
            "account": pastEvents[x].takerInfo.account,
            "sell": pastEvents[x].takerInfo.sell,
            "buy": pastEvents[x].takerInfo.buy,
            "nonce": pastEvents[x].takerInfo.nonce,
            "receive": {
              "amount": pastEvents[x].takerInfo.buy,
              "name": pastEvents[x].makerInfo.name,
              "abbr": pastEvents[x].makerInfo.name
            },
            "send": {
              "amount": pastEvents[x].takerInfo.sell,
              "name": pastEvents[x].takerInfo.name, 
              "abbr": pastEvents[x].takerInfo.name 
            },
            "price": {
              "amount": (pastEvents[x].takerInfo.sell / pastEvents[x].takerInfo.buy )
            },
            "order_total": pastEvents[x].makerInfo.sell,
            "collateral": {
              "amount": pastEvents[x].getTrade.collateralWei,
              "currencyAbbr": pastEvents[x].makerInfo.name
            }
          }
          orders[x] = order;
    
        }
        return orders;   
}

async function signTakerOrder(ipfs, web3, account, recipient, maker) {
    const extra = JSON.stringify({
        market: maker.market,
        deal: maker.deal,
        account: recipient,
        sell: maker.buy,
        buy: maker.sell,
        nonce: web3.utils.randomHex(4)
    });
    const ipfsRes = await ipfs.add(new Buffer(extra));
    const extraHash = ipfsRes[0].hash;

    const blockNumber = await web3.eth.getBlockNumber();
    const deadline = blockNumber + 1000;

    const params = web3.eth.abi.encodeParameters(
        ['bytes32', 'bytes32', 'uint256', 'bytes'],
        [maker.market, maker.deal, deadline, web3.utils.toHex(extraHash)]
    );
    console.log('maker order params: '+[maker.market, maker.deal, deadline, web3.utils.toHex(extraHash)]);
    const paramsHash = web3.utils.sha3(params);
    console.log('taker order hash: '+paramsHash);
    const signature = await web3.eth.personal.sign(paramsHash, account);
    console.log('taker order signature: '+signature);
    return {params, signature};
}

async function signMakerOrder(ipfs, web3, account, recipient, buy, sell, collateral) {
    // BTC/ETH market id
    const market = '0x17f166723b75c5da81f69d333af4676251d1b8b97326351320cf3ca53beacca0'; 
    const deal = web3.utils.soliditySha3(
        {t: 'uint256', v: sell},
        {t: 'uint256', v: buy}
    );

    const extra = JSON.stringify({
        market: market,
        deal: deal,
        account: recipient,
        sell: sell,
        buy: buy,
        nonce: web3.utils.randomHex(4)
    });
    const ipfsRes = await ipfs.add(new Buffer(extra));
    const extraHash = ipfsRes[0].hash;

    const blockNumber = await web3.eth.getBlockNumber();
    const deadline = blockNumber + 1000;

    const params = web3.eth.abi.encodeParameters(
        ['bytes32', 'bytes32', 'uint256', 'uint256', 'bytes'],
        [market, deal, collateral, deadline, web3.utils.toHex(extraHash)]
    );
    console.log('maker order params: '+[market, deal, deadline, collateral, web3.utils.toHex(extraHash)]);
    const paramsHash = web3.utils.sha3(params);
    console.log('maker order hash: '+paramsHash);
    const signature = await web3.eth.personal.sign(paramsHash, account);
    console.log('maker order signature: '+signature);
    return {params, signature};
}

async function makeOrder(contracts, ipfs, web3, account, order) {
    const { Exchange, Collateral } = contracts;

    const allowance = await Collateral.methods.allowance(account, Exchange.address).call();
    if (allowance < order.collateral) {
        console.log('Allowance is low, request more');
        await Collateral.methods.approve.cacheSend(Exchange.address, order.collateral, {from: account});
    }

    const signed = await signMakerOrder(
        ipfs,
        web3,
        account,
        order.address,
        order.receive.abbr === 'BTC' ? order.receive.amount * 10**8 : undefined,
        order.send.abbr === 'ETH' ? web3.utils.toWei(order.send.amount.toString(), 'ether') : undefined,
        order.collateral
    );
    console.log(signed);
}

async function startTrade(contracts, ipfs, web3, account, order) {
    console.log('maker params: '+order.market+' '+order.deal);

    const { Exchange } = contracts;
    const taker = await signTakerOrder(ipfs, web3, account, account, order);
    Exchange.methods.startTrade.cacheSend(
        order.params,
        order.signature,
        taker.params,
        taker.signature,
        {from: account}
    );
}

export {
    limitOrderList
  , startTrade
  , makeOrder
};
