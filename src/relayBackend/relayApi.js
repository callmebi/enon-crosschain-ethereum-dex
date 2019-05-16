<<<<<<< HEAD
function limitOrderList(ipfs, web3) {
    console.log(web3);
    async function decode(order) {
        const params = web3.eth.abi.decodeParameters(
            ['bytes32', 'bytes32', 'uint256', 'uint256', 'bytes'],
            order.params
        );
        const ipfsRes = await ipfs.get(web3.utils.hexToAscii(params[4]));
        const makerExtra = JSON.parse(ipfsRes[0].content);
        order = Object.assign(order, makerExtra);
        order.receive = {
            amount: order.buy / 10**8,
            name: 'Bitcoin',
            abbr: 'BTC'
		};
        order.send = {
            amount: order.sell / 10**18,
            name: 'Ethereum',
            abbr: 'ETH'
        };
		// TODO: Price estimation 
        order.price = { amount: order.send.amount / order.receive.amount };
        // TODO: Total estimation
        order.order_total = 8888;
        // TODO: Collateral fetch
        order.collateral= { amount: 1000, currencyAbbr: 'ETH' };
        return order;
    }
    return fetch('http://enon-relay.herokuapp.com/')
        .then(res => res.json())
        .then(orders => Promise.all(orders.map(order => decode(order))))
=======
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
            // toBlock: 10673501
        };
        // Get the past events
        let pastEvents = await webEx.getPastEvents("TradeStart", options)
            .then(tradeEvent => {
                return tradeEvent
            });
    
        let orders = [];
        // Loop trough past Events and call getTrade Contract Function
        for(let x=0; x < pastEvents.length; x++){
            
            (async function test () {
            // Call getTrade
            await webEx.methods.getTrade(pastEvents[x].raw.topics[1]).call().then(res => {
             pastEvents[x].getTrade = res;
             let collateral = res.collateral
             pastEvents[x].getTrade.collateralWei = web3.utils.fromWei(collateral);
            })
            // Call getMarket 
            await webEx.methods.getMarket(pastEvents[x].getTrade.market).call().then(res => {
                pastEvents[x].getMarket = res;
            })
            // Call IPFS storage and decode takeExtra and makeExtra 
            await ipfs.get(web3.utils.hexToAscii(pastEvents[x].getTrade.takerExtra))
            .then(res => JSON.parse(res[0].content)).then(res => {
                pastEvents[x].takerInfo = res
            })
            await ipfs.get(web3.utils.hexToAscii(pastEvents[x].getTrade.makerExtra))
            .then(res =>  JSON.parse(res[0].content)).then(res => {
            pastEvents[x].makerInfo = res
            })
            // Get coin name and trading pair       
            let pairs = await getPair(pastEvents[x].takerInfo.account, pastEvents[x].makerInfo.account, Cryptos)
            // Filter undefined addresses
            if(pairs.address1 == undefined || pairs.address2 == undefined)
            {
                return
            }
            pastEvents[x].makerInfo.name = pairs.address1 
            pastEvents[x].takerInfo.name = pairs.address2 
    
            let order = {
            "key": x,
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
          console.log(order)
        }() )
     

    }
        return orders;   
>>>>>>> ef36a1bd0ace55a699ada0b5c2d5cf5c19a7141c
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
<<<<<<< HEAD
        order.receive.abbr == 'BTC' ? order.receive.amount * 10**8 : undefined,
        order.send.abbr == 'ETH' ? web3.utils.toWei(order.send.amount.toString(), 'ether') : undefined,
        order.collateral
    );
    fetch('http://enon-relay.herokuapp.com/', {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(signed)
    });
=======
        order.receive.abbr === 'BTC' ? order.receive.amount * 10**8 : undefined,
        order.send.abbr === 'ETH' ? web3.utils.toWei(order.send.amount.toString(), 'ether') : undefined,
        order.collateral
    );
    console.log(signed);
>>>>>>> ef36a1bd0ace55a699ada0b5c2d5cf5c19a7141c
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
