/**
 * @title Exchange smart contract.
 */

pragma solidity >= 0.5.0;

import 'openzeppelin-solidity/contracts/cryptography/ECDSA.sol';
import 'openzeppelin-solidity/contracts/token/ERC20/ERC20.sol';
import 'openzeppelin-solidity/contracts/token/ERC20/SafeERC20.sol';

import './interface/IExchange.sol';
import './interface/IOracle.sol';
import './misc/SingletonHash.sol';
import './misc/Set.sol';

contract Exchange is IExchange, SingletonHash {
    constructor(ERC20 _collateral) public {
        token = _collateral;
    }

    string constant private ERROR_TRADE_DOESNT_EXIT = "Trade doesn't exist";
    string constant private ERROR_TRADE_ALREADY_FINISH = "Trade already finish";
    string constant private ERROR_ORACLE_ONLY = "This method is for trade oracle only";
    string constant private ERROR_INVALID_STATE = "Call method in invalid trade state";
    string constant private ERROR_DOUBLE_VOTE = "Oracle can vote for trade only once"; 

    using SafeERC20 for ERC20;
    using ECDSA for bytes32;
    using Set for Set.Address;

    ERC20 public token;
    Trade[] private trades;
    mapping(bytes32 => Market) private markets;

    modifier oracleOnly(uint256 _id) {
        require(markets[trades[_id].market].oracles.contains(msg.sender), ERROR_ORACLE_ONLY);
        _;
    }

    modifier stateOnly(uint256 _id, TradeState _state) {
        require(trades[_id].state == _state, ERROR_INVALID_STATE);
        _;
    }

    modifier timedTransaction(uint256 _id) {
        Trade storage trade = trades[_id];

        // Start/finish checks
        require(trade.startBlock != 0, ERROR_TRADE_DOESNT_EXIT);
        require(trade.finishBlock == 0, ERROR_TRADE_ALREADY_FINISH);

        // Check for taker timeout
        if (trade.state == TradeState.Start
            && trade.startBlock + markets[trade.market].takerTimeout < block.number)
            _release(_id);

        // Check for maker timeout
        if (trade.state == TradeState.Partial
            && trade.partialBlock + markets[trade.market].makerTimeout < block.number)
                _penalty(_id);

        _;

        // Make release when needed
        if (trade.state == TradeState.Release)
            _release(_id);
    }

    function getTrade(
        uint256 _id
    ) external view returns (
        bytes32 market,
        bytes32 deal,
        address maker,
        address taker,
        uint256 collateral,
        uint256 makerTransferConfirmations,
        uint256 takerTransferConfirmations,
        uint256 startBlock,
        uint256 partialBlock,
        uint256 finishBlock,
        bytes memory makerExtra,
        bytes memory takerExtra
    ) {
        Trade storage trade = trades[_id];
        market = trade.market;
        deal = trade.deal;
        maker = trade.maker;
        taker = trade.taker;
        collateral = trade.collateral;
        makerTransferConfirmations = trade.makerTransferConfirmations.size();
        takerTransferConfirmations = trade.takerTransferConfirmations.size();
        startBlock = trade.startBlock;
        partialBlock = trade.partialBlock;
        finishBlock = trade.finishBlock;
        makerExtra = trade.makerExtra;
        takerExtra = trade.takerExtra;
    }

    function getMarket(
        bytes32 _id
    ) external view returns (
        uint256 makerTimeout,
        uint256 takerTimeout,
        address[] memory oracles,
        uint256 minimalConfirmations
    ) {
        Market storage market = markets[_id];

        makerTimeout = market.makerTimeout;
        takerTimeout = market.takerTimeout;
        minimalConfirmations = market.minimalConfirmations;

        for (uint256 i = 0; i < market.oracles.size(); ++i)
            oracles[i] = market.oracles.at(i);
    }

    function addMarket(
        uint256 _makerTimeout,
        uint256 _takerTimeout,
        address[] calldata _oracles,
        uint256 _minimalConfirmations
    ) external returns (
        bytes32 id 
    ) {
        id = keccak256(abi.encodePacked(
            _makerTimeout,
            _takerTimeout,
            _oracles,
            _minimalConfirmations
        ));

        Market storage market = markets[id];
        market.makerTimeout = _makerTimeout;
        market.takerTimeout = _takerTimeout;
        market.minimalConfirmations = _minimalConfirmations;

        for (uint256 i = 0; i < _oracles.length; ++i)
            market.oracles.insert(_oracles[i]);
    }

    function startTrade(
        bytes calldata makerOrder,
        bytes calldata makerSignature,
        bytes calldata takerOrder,
        bytes calldata takerSignature
    ) external returns (
        uint256 id
    ) {
        // Start new trade
        id = trades.length++;
        Trade storage trade = trades[id];

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
        trade.startBlock = block.number;
        trade.state = TradeState.Start;

        // Process orders
        require(processMakerOrder(id, makerOrder));
        require(processTakerOrder(id, takerOrder));

        // Notify oracles to start transfer checking
        Set.Address storage oracles = markets[trade.market].oracles;
        require(oracles.size() > 0);
        for (uint256 i = 0; i < oracles.size(); ++i)
            require(IOracle(oracles.at(i)).checkTrade(address(this), id));

        emit TradeStart(id);
    }

    function confirmTakerTransfer(
        uint256 _id
    ) external
      oracleOnly(_id)
      timedTransaction(_id)
      stateOnly(_id, TradeState.Start)
      returns (
        bool success
    ) {
        Trade storage trade = trades[_id];
        require(trade.takerTransferConfirmations.insert(msg.sender), ERROR_DOUBLE_VOTE);
        emit TakerTransferConfirmation(_id, msg.sender);

        if (trade.takerTransferConfirmations.size() >= markets[trade.market].minimalConfirmations) {
            trade.partialBlock = block.number;
            trade.state = TradeState.Partial;
            emit TakerTransferConfirmed(_id);
        }

        success = true;
    }

    function confirmMakerTransfer(
        uint256 _id
    ) external
      oracleOnly(_id)
      timedTransaction(_id)
      stateOnly(_id, TradeState.Partial)
      returns (
        bool success
    ) {
        Trade storage trade = trades[_id];
        require(trade.makerTransferConfirmations.insert(msg.sender), ERROR_DOUBLE_VOTE);
        emit MakerTransferConfirmation(_id, msg.sender);

        if (trade.makerTransferConfirmations.size() >= markets[trade.market].minimalConfirmations) {
            trade.partialBlock = block.number;
            trade.state = TradeState.Release;
            emit MakerTransferConfirmed(_id);
        }

        success = true;
    }

    function finishTrade(
        uint256 _id
    ) external
      timedTransaction(_id)
      stateOnly(_id, TradeState.Finish)
      returns (
        bool success
    ) {
        success = true;
    }

    function _penalty(
        uint256 _id
    ) internal {
        token.safeTransfer(trades[_id].taker, trades[_id].collateral);
        _finish(_id);
    }

    function _release(
        uint256 _id
    ) internal {
        token.safeTransfer(trades[_id].maker, trades[_id].collateral);
        _finish(_id);
    }

    function _finish(
        uint256 _id
    ) internal {
        trades[_id].finishBlock = block.number;
        trades[_id].state = TradeState.Finish;
        emit TradeFinish(_id);
    }

    function processMakerOrder(
        uint256 _id,
        bytes memory _order
    ) internal returns (
        bool success
    ) {
        uint256 deadline;
        Trade storage trade = trades[_id];

        (trade.market,
         trade.deal,
         trade.collateral,
         deadline,
         trade.makerExtra)
            = abi.decode(_order, (bytes32, bytes32, uint256, uint256, bytes));

        // Order deadline check
        require(deadline > block.number);

        // Collateral transfer
        token.safeTransferFrom(trade.maker, address(this), trade.collateral);

        success = true;
    }

    function processTakerOrder(
        uint256 _id,
        bytes memory _order
    ) internal returns (
        bool success
    ) {
        uint256 deadline;
        bytes32 market;
        bytes32 deal;

        (market,
         deal,
         deadline,
         trades[_id].takerExtra)
            = abi.decode(_order, (bytes32, bytes32, uint256, bytes));

        // Order deadline check
        require(deadline > block.number);

        // Check for market & deal
        require(trades[_id].market == market && trades[_id].deal == deal);

        success = true;
    }
}
