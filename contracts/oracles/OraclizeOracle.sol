/*
    Oraclize based oracle contract.
*/

pragma solidity >= 0.5.0;

import '../misc/oraclizeAPI.sol';
import '../interface/IExchange.sol';
import '../interface/IOracle.sol';

contract OraclizeOracle is IOracle, usingOraclize {
    mapping(bytes32 => uint256) public tradeOf;
    IExchange public dex;

    constructor(IExchange _dex) public {
        dex = _dex;
    }

    function __callback(bytes32 myid, string memory result) public {
        if (msg.sender != oraclize_cbAddress()) revert();

        uint256 id = tradeOf[myid];
        uint8 retCode = uint8(bytes(result)[0]);

        if (retCode == 0x31) {
            dex.confirmTakerTransfer(id);
        } else if (retCode == 0x32) {
            dex.confirmMakerTransfer(id);
        } else if (retCode == 0x33) {
            return;
        } else {
            _checkTrade(id, 300);
        }
    }

    function checkTrade(uint256 _id) external returns(bool success) {
        require(msg.sender == address(dex));
        _checkTrade(_id, 0);
        success = true;
    }

    function() external payable {}

    function _checkTrade(uint256 _id, uint256 _wait) internal {
        bytes32 qid = oraclize_query(_wait, "computation", [
            "QmfNoScMZnRWZP7Zhk587qYTgc4dJ5F21uz5353gvg7Vxz",
            toString(address(dex)),
            toString(_id)
        ]);
        tradeOf[qid] = _id;
    }

    function toString(uint256 _i) internal returns (string memory result) {
        // TODO
        return "";
    }

    function toString(address _i) internal returns (string memory result) {
        // TODO
        return "";
    }
}
