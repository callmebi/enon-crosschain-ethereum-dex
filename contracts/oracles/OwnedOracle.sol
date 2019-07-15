/*
    EOA based oracle contract.
*/

pragma solidity >= 0.5.0;

import '../interface/IExchange.sol';
import '../interface/IOracle.sol';

contract OwnedOracle is IOracle {
    IExchange public dex;
    address public owner;

    event CheckTrade(uint256 indexed id);

    constructor(IExchange _dex, address _onwer) public {
        dex = _dex;
        owner = _onwer;
    }

    function confirmTransfer(
        uint256[] calldata _makers,
        uint256[] calldata _takers
    ) external returns (bool) {
        require(msg.sender == owner);
        return dex.confirmTransfer(_makers, _takers);
    }

    function checkTrade(address _dex, uint256 _id) external returns(bool success) {
        require(_dex == address(dex));
        emit CheckTrade(_id);
        success = true;
    }
}
