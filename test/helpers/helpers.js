function randomHex(length) {
    let hex = '';
    for (let i = 0; i < length; ++i)
        hex += Math.random().toString(16).substring(2, 4);
    return '0x'+hex;
}

async function generateOrder(web3, deadline, value, signer) {
    const data = web3.utils.toHex(JSON.stringify({
        account: randomHex(20),
        token:   randomHex(20),
    }));

    const hash = web3.utils.soliditySha3(
        {t: 'bytes',   v: data},
        {t: 'uint256', v: deadline},
        {t: 'uint256', v: value}
    );

    return {data: data, signature: await web3.eth.sign(hash, signer)};
}

module.exports = {
    generateOrder
}
