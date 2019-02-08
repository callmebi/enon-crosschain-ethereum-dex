/*
    Oraclize based oracle contract.
*/

pragma solidity >= 0.5.0;

import './oraclizeAPI.sol';
import './DEX.sol';
import './AbstractOracle.sol';

contract OraclizeOracle is AbstractOracle, usingOraclize {
    struct Request {
        uint256 tradeId;
        address trader;
    }
    mapping(bytes32 => Request) public requestOf;

    constructor(AbstractDEX _dex) public {
        dex = _dex;
    }

    function __callback(bytes32 myid, string memory result) public {
        if (msg.sender != oraclize_cbAddress()) revert();
        Request storage req = requestOf[myid];
        (address maker, address taker,,uint256 open,) = dex.trades(req.tradeId);

        if (parseInt(result) >= dex.valueToBuy(req.tradeId, req.trader)) {
            if (req.trader == maker)
                dex.confirmTransfer(req.tradeId, taker);
            else if (req.trader == taker)
                dex.confirmTransfer(req.tradeId, maker);
        } else if (open + dex.tradingBlocks() > block.number) {
            checkBalance(req.tradeId, req.trader, 300);
        }
    }

    function checkTrade(uint256 _tradeId) external returns(bool success) {
        require(msg.sender == address(dex));
        (address maker, address taker,,,) = dex.trades(_tradeId);

        // Request maker balance
        checkBalance(_tradeId, maker, 0);

        // Request taker balance
        checkBalance(_tradeId, taker, 0);

        success = true;
    }

    function checkBalance(uint256 _tradeId, address _trader, uint256 _wait) internal {
        bytes32 qid;
        if (_wait > 0) {
            qid = oraclize_query(_wait, "computation", [
                "Qmd74LG8ApsCuYZribR4VUpZNN4ZXaW8247mowyHRCmtEy",
                string(dex.extraData(_tradeId, _trader))
            ]);
        } else {
            qid = oraclize_query("computation", [
                "Qmd74LG8ApsCuYZribR4VUpZNN4ZXaW8247mowyHRCmtEy",
                string(dex.extraData(_tradeId, _trader))
            ]);
        }
        requestOf[qid] = Request(_tradeId, _trader);
    }

    function() external payable {}
}
