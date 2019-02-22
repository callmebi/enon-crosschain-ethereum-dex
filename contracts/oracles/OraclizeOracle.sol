/*
    Oraclize based oracle contract.
*/

pragma solidity >= 0.5.0;

import '../misc/oraclizeAPI.sol';
import '../interface/IExchange.sol';
import '../interface/IOracle.sol';

contract OraclizeOracle is IOracle, usingOraclize {
    string public constant oracleComputation = "QmSDdJwTF66CVLKD52RdNkTz5KBfoPbk6aj3hLrrHq1wGc";
    mapping(bytes32 => uint256) public tradeOf;
    IExchange public dex;

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
            bytes32 qid = oraclize_query(300, "computation", [
                oracleComputation,
                toString(address(dex)),
                uint2str(id)
            ]);
            tradeOf[qid] = id;
        }
    }

    function checkTrade(address _dex, uint256 _id) external returns(bool success) {
        require(_dex == address(dex));
        bytes32 qid = oraclize_query("computation", [
            oracleComputation,
            toString(address(dex)),
            uint2str(_id)
        ]);
        tradeOf[qid] = _id;
        success = true;
    }

    function() external payable {}

    function toString(address x) internal returns (string memory) {
        bytes memory b = new bytes(20);
        for (uint i = 0; i < 20; i++)
            b[i] = byte(uint8(uint(x) / (2**(8*(19 - i)))));
        return string(b);
    }
}
