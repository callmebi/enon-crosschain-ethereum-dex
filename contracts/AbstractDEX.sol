/*
    Interface of DEX contract.
*/

pragma solidity >= 0.5.0;

import 'openzeppelin-solidity/contracts/token/ERC20/ERC20.sol';

contract AbstractDEX {
    /**
     * @dev Notification for opened trades. 
     */
    event TradeOpened(uint256 indexed id);

    /**
     * @dev Notification for finalized trades. 
     */
    event TradeClosed(uint256 indexed id);

    /**
     * @dev Notify for every confirmed transfers. 
     */
    event TransferConfirmed(
        uint256 indexed id,
        address indexed trader,
        address indexed oracle
    );

    struct Trade {
        // Trade params
        address maker;
        address taker;
        uint256 collateralValue;
        // Trade state
        uint256 openBlock;
        uint256 closeBlock;
    }

    // Trade list 
    Trade[] public trades;

    // Value of transfer for trader
    mapping(uint256 => mapping(address => uint256)) public valueToSell;
    mapping(uint256 => mapping(address => uint256)) public valueToBuy;
    // Transfer extra params for trader
    mapping(uint256 => mapping(address => bytes)) public extraData;
    
    /**
     * @dev Collateral token address.
     */
    ERC20 public collateral;

    uint256 public tradingBlocks;

    /**
     * @dev Open trade by matching two orders.
     * @param makerOrder ABI-encoded maker order
     * @param takerOrder ABI-encoded taker order
     * @return unique trade identifier
     * @notice orders should not be used befor
     */
    function openTrade(
        bytes calldata makerOrder,
        bytes calldata makerSignature,
        bytes calldata takerOrder,
        bytes calldata takerSignature
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
     * @dev Confirm transfer for trade.
     * @param _tradeId trade identifier 
     * @param _trader trader address
     * @notice oracles call only
     */
    function confirmTransfer(
        uint256 _tradeId,
        address _trader
    ) external returns (
        bool success
    );
}
