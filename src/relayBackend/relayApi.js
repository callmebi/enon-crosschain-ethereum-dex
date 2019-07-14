function limitOrderList(ipfs, web3) {

    async function decode(order) {
        const params = web3.eth.abi.decodeParameters(
            ['bytes32', 'bytes32', 'uint256', 'uint256', 'bytes'],
            order.params
        );

        let btcPrice = await fetch('https://api.coindesk.com/v1/bpi/currentprice.json')
        .then(res => res.json()).then(res => parseFloat(res.bpi.USD.rate.replace(",", "")))

        const ipfsRes = await ipfs.get(web3.utils.hexToAscii(params[4]));
        console.log("ipfs Res is", ipfsRes[0].content)
        const makerExtra = JSON.parse(ipfsRes[0].content);
        order = Object.assign(order, makerExtra);
        console.log("now order is ", order)
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
        order.price =  order.receive.amount * btcPrice ;
        // TODO: Total estimation
        order.order_total = order.price;
        // TODO: Collateral fetch
        order.collateral = order.receive.amount
        return order;
    }
    return fetch('http://192.99.56.237:8000')
        .then(res => res.json())
        .then(orders => Promise.all(orders.map(order => decode(order))))
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
<<<<<<< HEAD
    const market = '0xf0eac308065dc9d05d7b7b217d88378878a9adfa9851eb6e2a053ebdbda32ff4'; 
=======
    const market = '0xd45d8a1a60c7652dc1e6e8ac77dfa5933191065bec24142124cdaf579606f71a'; 
>>>>>>> 6d94322... Fix market_id
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
    order.collateral = new web3.utils.BN(order.send.amount.toString());
    order.collateral = new web3.utils.toBN(order.collateral);
    console.log("Order Collateral is:", order.collateral)
    const allowance = await Collateral.methods.allowance(account, Exchange.address).call();
    if (allowance < order.collateral) {
        console.log('Allowance is low, request more');
        await Collateral.methods.approve.cacheSend(Exchange.address, order.collateral, {from: account});
    }
    
    console.log("order.collateral is: ", order.collateral)
    const signed = await signMakerOrder(
        ipfs,
        web3,
        account,
        order.address,
        order.receive.abbr === 'BTC' ? order.receive.amount * 10**8 : undefined,
        order.send.abbr === 'ETH' ? web3.utils.toWei(order.send.amount.toString(), 'ether') : undefined,
        order.collateral
    );
    
    fetch('http://192.99.56.237:8000', {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(signed)
    })
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
