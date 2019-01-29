pragma solidity >=0.5.0 <0.6.0;

import './DEX.sol';
import './AbstractOracle.sol';

contract OwnedOracle is AbstractOracle {
    constructor(address _onwer) public {
        owner = _onwer;
    }

    address public owner;

    DEX     public dex;
    uint256 public tradeId;

    function confirmTransfer(address _trader) public returns (bool) {
        require(msg.sender == owner);
        return dex.confirmTransfer(tradeId, _trader);
    }

    function checkTrade(address _dex, uint256 _tradeId) external returns(bool success) {
        dex = DEX(_dex);
        tradeId = _tradeId;
        success = true;
    }
}
