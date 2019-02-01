/*
    EOA based oracle contract.
*/

pragma solidity >= 0.5.0;

import './AbstractDEX.sol';
import './AbstractOracle.sol';

contract OwnedOracle is AbstractOracle {
    address public owner;
    uint256 public tradeId;

    constructor(AbstractDEX _dex, address _onwer) public {
        dex = _dex;
        owner = _onwer;
    }

    function confirmTransfer(address _trader) public returns (bool) {
        require(msg.sender == owner);
        return dex.confirmTransfer(tradeId, _trader);
    }

    function checkTrade(uint256 _tradeId) external returns(bool success) {
        tradeId = _tradeId;
        success = true;
    }
}
