/**
 * @title Interface of oracle contract.
 */

pragma solidity >= 0.5.0;

interface IOracle {
    /**
     * @dev Check trade transfers and make decision.
     * @param _dex Exchange address
     * @param _id Trade identifier
     */
    function checkTrade(
        address _dex,
        uint256 _id
    ) external returns(
        bool success
    );
}
