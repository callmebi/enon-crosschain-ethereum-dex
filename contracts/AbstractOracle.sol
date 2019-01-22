pragma solidity ^0.5.0;

import './AbstractDEX.sol';

contract AbstractOracle {
    function checkTrade(AbstractDEX _dex, uint256 _tradeId) public returns(bool success);
}
