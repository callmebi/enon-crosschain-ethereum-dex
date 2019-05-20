function limitOrderList(ipfs, web3) {
    async function decode(order) {
        const params = web3.eth.abi.decodeParameters(
            ['bytes32', 'bytes32', 'uint256', 'uint256', 'bytes'],
            order.params
        );
        console.log(params)
        const ipfsRes = await ipfs.get(web3.utils.hexToAscii(params[4]));
        console.log(params)
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
    fetch('http://enon-relay.herokuapp.com/', {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(signed)
    });
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