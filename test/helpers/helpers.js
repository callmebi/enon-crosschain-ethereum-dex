function randomHex(length) {
    let hex = '';
    for (let i = 0; i < length; ++i)
        hex += Math.random().toString(16).substring(2, 4);
    return '0x'+hex;
}

async function generateOrder(web3, deadline, value, signer) {
    const extra = web3.utils.toHex(JSON.stringify({
        account: randomHex(20),
        token:   randomHex(20),
    }));

    const order = web3.eth.abi.encodeParameters(
        ['bytes', 'uint256', 'uint256', 'uint256', 'uint256'],
        [extra, '5', '5', value, deadline]
    );
    const hash = web3.utils.sha3(order);
    return {order: order, signature: await web3.eth.sign(hash, signer)};
}

module.exports = {
    generateOrder
}
