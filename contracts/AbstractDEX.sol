pragma solidity >=0.4.21 <0.6.0;

contract AbstractDEX {
    /**
     * @dev Event emitted for every registered order in a contract.
     */
    event TradeOpened(uint256 indexed trade_id);

    /**
     * @dev Event emitted for every closed trade in a contract.
     */
    event TradeClosed(uint256 indexed trade_id);

    /**
     * @dev Open trade by matching two orders.
     * @param _makerData off-chain offer params(external account, value, nonce, etc.)
     * @param _makerDeadline maker message deadline block
     * @param _makerSignature EC signature of maker message*
     * @param _takerData off-chain demand params (external account, value, nonce, etc.)
     * @param _takerDeadline taker message deadline block
     * @param _takerSignature EC signature of taker message*
     * @param _collateralValue value of collateral token that will be send as refund
     * @param _oracles list of approved oracle accounts
     * @param _minTransferConfirmations count of oracles signatures required for transfer confirmation
     * @return positive number corresponds to trade id
     */
    function openTrade(
        bytes calldata _makerData,
        uint256 _makerDeadline,
        bytes calldata _makerSignature,
        bytes calldata _takerData,
        uint256 _takerDeadline,
        bytes calldata _takerSignature,
        uint256 _collateralValue,
        address[] calldata _oracles,
        uint256 _minTransferConfirmations
    ) external returns (
        uint256 tradeId
    );

    /**
     * @dev Close trade and pay refund when transfer isn't confirmed.
     * @param _tradeId trade identifier
     * @return true when success closed
     */
    function closeTrade(
        uint256 _tradeId
    ) external returns (
        bool success
    );

    /**
     * @dev Confirm trade transfers.
     * @param _tradeId trade identifier 
     * @param _trader trade party whom makes transfers
     * @notice oracles call only
     */
    function confirmTransfer(
        uint256 _tradeId,
        address _trader
    ) external returns (bool);
}
