function randomHex(length) {
    let hex = '';
    for (let i = 0; i < length; ++i)
        hex += Math.random().toString(16).substring(2, 4);
    return '0x'+hex;
}

async function genMakerOrder(web3, marketId, deadline, collateral, signer) {
    const extra = web3.utils.toHex('QmfSnGmfexFsLDkbgN76Qhx2W8sxrNDobFEQZ6ER5qg2wW'+randomHex(1));

    const dealId = web3.utils.soliditySha3(
        {t: 'bytes32', v: marketId}
      , {t: 'uint256', v: 1}
      , {t: 'uint256', v: 2}
    );
    const order = web3.eth.abi.encodeParameters(
        ['bytes32', 'bytes32', 'uint256', 'uint256', 'bytes']
      , [marketId, dealId, collateral, deadline, extra]
    );
    const hash = web3.utils.sha3(order);
    return {order: order, signature: await web3.eth.sign(hash, signer)};
}

async function genTakerOrder(web3, marketId, deadline, signer) {
    const extra = web3.utils.toHex('QmfSnGmfexFsLDkbgN76Qhx2W8sxrNDobFEQZ6ER5qg2wW'+randomHex(1));

    const dealId = web3.utils.soliditySha3(
        {t: 'bytes32', v: marketId}
      , {t: 'uint256', v: 1}
      , {t: 'uint256', v: 2}
    );
    const order = web3.eth.abi.encodeParameters(
        ['bytes32', 'bytes32', 'uint256', 'bytes']
      , [marketId, dealId, deadline, extra]
    );
    const hash = web3.utils.sha3(order);
    return {order: order, signature: await web3.eth.sign(hash, signer)};
}

module.exports = {
    genMakerOrder
  , genTakerOrder
}
