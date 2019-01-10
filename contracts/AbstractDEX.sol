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
     * @param _maker_data off-chain offer params(external account, nonce, etc.)
     * @param _maker_value value in maker token
     * @param _maker_deadline maker message deadline block
     * @param _maker_signature EC signature of maker message*
     * @param _taker_data off-chain demand params (external account, nonce, etc.)
     * @param _taker_value value in taker token
     * @param _taker_deadline taker message deadline block
     * @param _taker_signature EC signature of taker message*
     * @param _collateral_value value of collateral token that will be send as refund
     * @param _oracles list of approved oracle accounts
     * @param _min_oracles_count count of oracles signatures required for transfer confirmation
     * @return positive number corresponds to trade id
     */
    function open_trade(
        bytes calldata _maker_data,
        uint256 _maker_value,
        uint256 _maker_deadline,
        bytes calldata _maker_signature,
        bytes calldata _taker_data,
        uint256 _taker_value,
        uint256 _taker_deadline,
        bytes calldata _taker_signature,
        uint256 _collateral_value,
        address[] calldata _oracles,
        uint256 _min_oracles_count
    ) external returns (
        uint256 trade_id
    );

    /**
     * @dev Close trade and pay refund when transfer isn't confirmed.
     * @param _trade_id trade identifier
     * @return true when success closed
     */
    function close_trade(
        uint256 _trade_id
    ) external returns (
        bool success
    );

    /**
     * @dev Get trade by id
     * @param _trade_id trade identifier
     */
    function trade_of(
        uint256 _trade_id
    ) external view returns (
        bool
    );

    /**
     * @dev Cancel order before trading.
     */
    function cancel_order(
        bytes calldata _data,
        uint256 _value,
        uint256 _deadline,
        bytes calldata _signature,
        uint256 _collateral_value,
        address[] calldata _oracles,
        uint256 _min_oracles_count
    ) external returns (bool);

    /**
     * @dev Confirm transfer by hash.
     * @param _data_hash transaction descriptor hash
     * @notice oracles call only
     */
    function confirm_transfer(
        bytes32 _data_hash
    ) external returns (bool);
    
}
