async function makeParams(web3) {
    let accounts = await web3.eth.getAccounts();

    let makerData = web3.utils.toHex(JSON.stringify({
        token: "0xE8DBe0Fff90F0A8e8d97054dA2DaaCe228cdbB32",
        account: accounts[0],
        nonce: 1
    }));

    let takerData = web3.utils.toHex(JSON.stringify({
        token: "0xE8DBe0Fff90F0A8e8d97054dA2DaaCe228cdbB32",
        account: "0x4af013AfBAdb22D8A88c92D68Fc96B033b9Ebb8a",
        nonce: 1
    }));

    let blockNumber = await web3.eth.getBlockNumber();
    let deadline = blockNumber + 100;

    let makerOrder = web3.eth.abi.encodeParameters(
        ['bytes', 'uint256', 'uint256', 'uint256', 'uint256'],
        [makerData, '5', '5', '10', deadline]
    );

    let takerOrder = web3.eth.abi.encodeParameters(
        ['bytes', 'uint256', 'uint256', 'uint256', 'uint256'],
        [takerData, '5', '5', '10', deadline]
    );

    let makerSignature = await web3.eth.sign(web3.utils.sha3(makerOrder), accounts[0]);
    let takerSignature = await web3.eth.sign(web3.utils.sha3(takerOrder), accounts[0]);

    return [makerOrder, makerSignature, takerOrder, takerSignature];
}

module.exports = {
    makeParams
}
