pragma solidity >=0.5.0 <0.6.0;

import './oraclizeAPI.sol';
import './AbstractDEX.sol';
import './AbstractOracle.sol';

contract OraclizeOracle is AbstractOracle, usingOraclize {
    struct Trade {
        AbstractDEX dex;
        uint256 id;
    }
    mapping(bytes32 => Trade) public queries;

    function toString(address x) internal pure returns (string memory) {
        bytes memory b = new bytes(20);
        for (uint i = 0; i < 20; i++)
            b[i] = byte(uint8(uint(x) / (2**(8*(19 - i)))));
        return string(b);
    }

    function toString(uint256 x) internal pure returns (string memory) {
        bytes memory b = new bytes(32);
        for (uint i = 0; i < 32; i++)
            b[i] = byte(uint8(uint(x) / (2**(8*(31 - i)))));
        return string(b);
    }

    function __callback(bytes32 myid, string memory result) public {
        if (msg.sender != oraclize_cbAddress()) revert();
        Trade storage trade = queries[myid];
        trade.dex.confirmTransfer(trade.id, parseAddr(result));
    }

    function checkTrade(address _dex, uint256 _tradeId) external returns(bool success) {
        bytes32 qid = oraclize_query("computation", ["QmaMFiHXSqCFKkGPbWZh5zKmM827GWNpk9Y1EYhoLfwdHq", toString(_dex), toString(_tradeId)]);
        queries[qid] = Trade(AbstractDEX(_dex), _tradeId);
        return success;
    }

    function() external payable {}
}
