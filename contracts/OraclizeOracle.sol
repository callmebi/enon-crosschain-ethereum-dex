pragma solidity >=0.5.0 <0.6.0;

import './oraclizeAPI.sol';
import './DEX.sol';
import './AbstractOracle.sol';

contract OraclizeOracle is AbstractOracle, usingOraclize {
    struct Trade {
        DEX dex;
        uint256 id;
    }

    mapping(bytes32 => Trade) public queries;

    function toString(address x) internal pure returns (string memory) {
        bytes memory b = new bytes(20);
        for (uint i = 0; i < 20; i++)
            b[i] = byte(uint8(uint(x) / (2**(8*(19 - i)))));
        return string(b);
    }

    function __callback(bytes32 myid, string memory result) public {
        if (msg.sender != oraclize_cbAddress()) revert();
        Trade storage trade = queries[myid];
        address trader = parseAddr(result);
        if (trader != address(0))
            trade.dex.confirmTransfer(trade.id, trader);
    }

    function checkTrade(address _dex, uint256 _tradeId) external returns(bool success) {
        DEX dex = DEX(_dex);
        (address maker, address taker,,,) = dex.trades(_tradeId);
        bytes32 qid = oraclize_query("computation", [
            "QmTrMDmkrsdmPNnQKQMJbycmhJCKCC19y6bsCAVhb8gu1U",
            toString(maker),
            string(dex.tradeDataOf(_tradeId, maker)),
            toString(taker),
            string(dex.tradeDataOf(_tradeId, taker))
        ]);
        queries[qid] = Trade(dex, _tradeId);
        success = true;
    }

    function() external payable {}
}
