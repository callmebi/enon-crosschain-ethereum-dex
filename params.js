async function makeParams(web3, account) {
    let makerData = web3.utils.toHex(JSON.stringify({
        token: "0x9ed6569B559aF18B2E535804d8FFdB00BDC657ab",
        account: account,
        nonce: 1
    }));
    let takerData = web3.utils.toHex(JSON.stringify({
        token: "0x9ed6569B559aF18B2E535804d8FFdB00BDC657ab",
        account: "0x4af013AfBAdb22D8A88c92D68Fc96B033b9Ebb8a",
        nonce: 1
    }));
    let blockNumber = await web3.eth.getBlockNumber();
    let deadline = blockNumber + 100;
    let makerSignature = await web3.eth.sign(web3.utils.soliditySha3(
        {t: 'bytes',   v: makerData},
        {t: 'uint256', v: deadline},
        {t: 'uint256', v: 10}
    ), account);
    let takerSignature = await web3.eth.sign(web3.utils.soliditySha3(
        {t: 'bytes',   v: takerData},
        {t: 'uint256', v: deadline},
        {t: 'uint256', v: 10}
    ), account);
    return [makerData, takerData, deadline, makerSignature, takerSignature];
}

module.exports = {
    makeParams
}
