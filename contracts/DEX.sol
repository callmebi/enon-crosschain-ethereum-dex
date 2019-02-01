/*
    DEX core contract.
*/

pragma solidity >= 0.5.0;

import 'openzeppelin-solidity/contracts/cryptography/ECDSA.sol';
import 'openzeppelin-solidity/contracts/token/ERC20/SafeERC20.sol';

import './AbstractDEX.sol';
import './SingletonHash.sol';
import './AbstractOracle.sol';

contract DEX is AbstractDEX, SingletonHash {
    constructor(
        ERC20   _collateral,
        uint256 _tradingBlocks,
        uint256 _minConfirmations
    ) public {
        collateral = _collateral;
        tradingBlocks = _tradingBlocks;
        minTransferConfirmations = _minConfirmations;
    }

    using SafeERC20 for ERC20;
    using ECDSA for bytes32;

    // TODO: restrict visibility
    mapping(uint256 => mapping(address => address[])) public transferConfirmations;

    // TODO: keep in mind that it could be user params
    function setOracles(AbstractOracle[] calldata _oracles) external {
        require(oracles.length == 0);
        oracles = _oracles;
        for (uint256 i = 0; i < _oracles.length; ++i)
            isTradeOracle[address(_oracles[i])] = true;
    }
    AbstractOracle[] public oracles;
    mapping(address => bool) public isTradeOracle;
    uint256 public minTransferConfirmations;

    modifier oraclesOnly(uint256 _tradeId) {
        // Check that sender is trade oracle
        require(isTradeOracle[msg.sender]);
        _;
    }

    modifier openTradeOnly(uint256 _tradeId) {
        // Check that trade isn't closed before
        require(trades[_tradeId].closeBlock == 0);
        _;
    }

    function openTrade(
        bytes calldata makerOrder,
        bytes calldata makerSignature,
        bytes calldata takerOrder,
        bytes calldata takerSignature
    ) external returns (
        uint256 tradeId
    ) {
        // Instantiate new trade
        tradeId = trades.length++;
        Trade storage trade = trades[tradeId];

        // Recover trader addresses
        singleton(keccak256(makerOrder));
        trade.maker = keccak256(makerOrder)
            .toEthSignedMessageHash()
            .recover(makerSignature);

        singleton(keccak256(takerOrder));
        trade.taker = keccak256(takerOrder)
            .toEthSignedMessageHash()
            .recover(takerSignature);

        // Open order at current block
        trade.openBlock = block.number;

        // Process orders
        trade.collateralValue = processOrder(tradeId, trade.maker, makerOrder);
        require(trade.collateralValue > 0);
        require(trade.collateralValue == processOrder(tradeId, trade.taker, takerOrder));

        // Order matching validation
        require(valueToSell[tradeId][trade.maker] == valueToBuy[tradeId][trade.taker]);
        require(valueToBuy[tradeId][trade.maker] == valueToSell[tradeId][trade.taker]);

        // Notify oracles to start transfer checking
        for (uint256 i = 0; i < oracles.length; ++i)
            oracles[i].checkTrade(tradeId);

        emit TradeOpened(tradeId);
    }

    function closeTrade(
        uint256 _tradeId
    ) external
      returns (
        bool success
    ) {
        Trade storage trade = trades[_tradeId];
        // Checko that trade isn't closed
        require(trade.openBlock > 0
            && trade.closeBlock == 0
            && trades[_tradeId].openBlock + tradingBlocks < block.number);

        uint256 takerConfirmations = transferConfirmations[_tradeId][trade.taker].length;
        address takerRefund = takerConfirmations >= minTransferConfirmations ? trade.taker : trade.maker;
        collateral.safeTransfer(takerRefund, trade.collateralValue);

        uint256 makerConfirmations = transferConfirmations[_tradeId][trade.maker].length;
        address makerRefund = makerConfirmations >= minTransferConfirmations ? trade.maker : trade.taker;
        collateral.safeTransfer(makerRefund, trade.collateralValue);

        trade.closeBlock = block.number;
        emit TradeClosed(_tradeId);
        success = true;
    }

    function confirmTransfer(
        uint256 _tradeId,
        address _trader
    ) external 
      oraclesOnly(_tradeId)
      openTradeOnly(_tradeId)
      returns (
        bool success
    ) {
        address[] storage transfer_confirmations
            = transferConfirmations[_tradeId][_trader];
        for (uint256 i = 0; i < transfer_confirmations.length; ++i)
            require(transfer_confirmations[i] != msg.sender);
        transfer_confirmations.push(msg.sender);

        if (transfer_confirmations.length >= minTransferConfirmations)
            emit TransferConfirmed(_tradeId, _trader, msg.sender);

        return true;
    }

    function processOrder(
        uint256 _tradeId,
        address _trader,
        bytes memory _order
    ) internal returns (
        uint256 collateralValue
    ) {
        bytes memory extra;
        uint256 deadline;

        (extra,
         valueToBuy[_tradeId][_trader],
         valueToSell[_tradeId][_trader],
         collateralValue,
         deadline)
            = abi.decode(_order, (bytes, uint256, uint256, uint256, uint256));

        // Order deadline check
        require(deadline > block.number);

        // Collateral transfer
        collateral.safeTransferFrom(_trader, address(this), collateralValue);

        // Store trader extra data
        extraData[_tradeId][_trader] = extra;
    }
}
