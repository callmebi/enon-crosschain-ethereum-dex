pragma solidity >=0.5.0 <0.6.0;

contract AbstractOracle {
    function checkTrade(
        address _dex,
        uint256 _tradeId
    ) external returns(
        bool success
    );
}
