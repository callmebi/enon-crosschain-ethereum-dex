/*
    Oraclize based oracle contract.
*/

pragma solidity >= 0.5.0;

import '../misc/oraclizeAPI.sol';
import '../interface/IExchange.sol';
import '../interface/IOracle.sol';

contract OraclizeOracle is IOracle, usingOraclize {
    string public constant oracleComputation = "QmXiZAKhh77KGfn3jLfbbqeURfVVrKwUQfoXyT3ipV6KiU";
    mapping(bytes32 => uint256) public tradeOf;
    IExchange public dex;

    event OraclizeQuery(bytes32 indexed qid);

    constructor(IExchange _dex) public {
        dex = _dex;
    }

    function __callback(bytes32 myid, string memory result) public {
        if (msg.sender != oraclize_cbAddress()) revert();

        uint256 id = tradeOf[myid];
        uint256 retCode = parseInt(result);

        if (retCode & 1 > 0)
            dex.confirmTakerTransfer(id);

        if (retCode & 2 > 0)
            dex.confirmMakerTransfer(id);

        if (retCode & 4 > 0) {
            bytes32 qid = oraclize_query(30, "computation", [
                oracleComputation,
                //toString(address(dex)),
                "0x538c7a7b2ce0a50692b762bafc2de2630b9338eb", //toString(address(dex)),
                uint2str(id)
            ], 1000000);
            tradeOf[qid] = id;
            emit OraclizeQuery(qid);
        }
    }

    function checkTrade(address _dex, uint256 _id) external returns(bool success) {
        //require(_dex == address(dex));
        bytes32 qid = oraclize_query("computation", [
            oracleComputation,
            "0x538c7a7b2ce0a50692b762bafc2de2630b9338eb", //toString(address(dex)),
            uint2str(_id)
        ], 1000000);
        tradeOf[qid] = _id;
        emit OraclizeQuery(qid);
        success = true;
    }

    function() external payable {}

    function toString(address x) public returns (string memory) {
        bytes memory b = new bytes(20);
        for (uint i = 0; i < 20; i++)
            b[i] = byte(uint8(uint(x) / (2**(8*(19 - i)))));
        return string(b);
    }
}
