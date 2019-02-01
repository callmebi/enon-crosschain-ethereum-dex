/*
    Interface of oracle contract.
*/

pragma solidity >= 0.5.0;

import './AbstractDEX.sol';

contract AbstractOracle {
    AbstractDEX public dex;

    function checkTrade(
        uint256 _tradeId
    ) external returns(
        bool success
    );
}
