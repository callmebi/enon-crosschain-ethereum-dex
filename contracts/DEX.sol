pragma solidity >=0.5.0 <0.6.0;

import 'openzeppelin-solidity/contracts/cryptography/ECDSA.sol';
import 'openzeppelin-solidity/contracts/token/ERC20/ERC20.sol';
import 'openzeppelin-solidity/contracts/token/ERC20/SafeERC20.sol';

import './SingletonHash.sol';
import './AbstractDEX.sol';
import './AbstractOracle.sol';

contract DEX is AbstractDEX, SingletonHash {
    constructor(
        address          _collateral,
        uint256          _tradingBlocks,
        uint256          _minConfirmations,
        address[] memory _oracles
    ) public {
        collateral = ERC20(_collateral);
        tradingBlocks = _tradingBlocks;
        minTransferConfirmations = _minConfirmations;
        oracles = _oracles;
        for (uint256 i = 0; i < _oracles.length; ++i)
            isTradeOracle[_oracles[i]] = true;
    }

    using SafeERC20 for ERC20;
    using ECDSA for bytes32;

    struct Trade {
        // Trade params
        address      maker;
        address      taker;
        uint256      collateralValue;
        // Trade state
        uint256      openBlock;
        uint256      closeBlock;
    }

    /// Transacton data of a trader
    mapping(uint256 => mapping(address => bytes)) public tradeDataOf;

    // TODO: restrict visibility
    mapping(uint256 => mapping(address => address[])) public transferConfirmations;

    // TODO: restrict visibility
    Trade[] public trades;

    ERC20 public collateral;

    uint256 public tradingBlocks;

    // TODO: keep in mind that it could be user params
    address[] public oracles;
    mapping(address => bool) public isTradeOracle;
    uint256 public minTransferConfirmations;

    modifier oraclesOnly(uint256 _tradeId) {
        // Check that sender is trade oracle
        require(isTradeOracle[msg.sender]);
        _;
    }

    function openTrade(
        bytes     calldata _makerData,
        uint256            _makerDeadline,
        bytes     calldata _makerSignature,
        bytes     calldata _takerData,
        uint256            _takerDeadline,
        bytes     calldata _takerSignature,
        uint256            _collateralValue
    ) external returns (
        uint256 tradeId
    ) {
        // Params safety check
        require(_makerData.length > 0);
        require(_takerData.length > 0);

        // Message deadline check
        require(_makerDeadline > block.number);
        require(_takerDeadline > block.number);

        address maker = tradeSecurity(
            _makerData,
            _makerDeadline,
            _makerSignature,
            _collateralValue
        );

        address taker = tradeSecurity(
            _takerData,
            _takerDeadline,
            _takerSignature,
            _collateralValue
        );

        tradeId = trades.length;

        // Push trade state on chain
        trades.push(Trade(
            maker,
            taker,
            _collateralValue,
            block.number,
            0
        ));

        // Store traders data on chain for oracles requests
        tradeDataOf[tradeId][taker] = _takerData;
        tradeDataOf[tradeId][maker] = _makerData;

        for (uint256 i = 0; i < oracles.length; ++i)
            AbstractOracle(oracles[i]).checkTrade(address(this), tradeId);

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
      returns (
        bool success
    ) {
        // Check that trade isn't closed before
        require(trades[_tradeId].closeBlock == 0);

        address[] storage transfer_confirmations
            = transferConfirmations[_tradeId][_trader];
        for (uint256 i = 0; i < transfer_confirmations.length; ++i)
            require(transfer_confirmations[i] != msg.sender);
        transfer_confirmations.push(msg.sender);
        success = true;
    }

    function tradeSecurity(
        bytes     memory _data,
        uint256         _deadline,
        bytes     memory _signature,
        uint256         _collateralValue
    ) internal returns (
        address trader
    ) {
        trader = singleton(keccak256(abi.encodePacked(
            _data,
            _deadline,
            _collateralValue
        )))
            .toEthSignedMessageHash()
            .recover(_signature);

        collateral.safeTransferFrom(trader, address(this), _collateralValue);
    }
}
