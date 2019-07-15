/**
 * @title Interface of exchange smart contract.
 */

pragma solidity >= 0.5.0;

import '../misc/Set.sol';

interface IExchange {
    /**
     * @dev New market params added to registry.
     */
    event NewMarket(bytes32 indexed id);

    /**
     * @dev Trade start state notification. 
     */
    event TradeStart(uint256 indexed id);

    /**
     * @dev Trade partial state notification. 
     */
    event TradePartial(uint256 indexed id);

    /**
     * @dev Trade finish state notification. 
     */
    event TradeFinish(uint256 indexed id);

    /**
     * @dev Notify for every transfer taker confirmation from oracle. 
     */
    event TakerTransferConfirmation(
        uint256 indexed id,
        address indexed oracle
    );

    /**
     * @dev Notify for every confirmed taker transfers. 
     */
    event TakerTransferConfirmed(uint256 indexed id);

    /**
     * @dev Notify for every maker transfer confirmation from oracle. 
     */
    event MakerTransferConfirmation(
        uint256 indexed id,
        address indexed oracle
    );

    /**
     * @dev Notify for every confirmed maker transfers. 
     */
    event MakerTransferConfirmed(uint256 indexed id);

    enum TradeState {
        Start,
        Partial,
        Release,
        Penalty,
        Finish
    }

    struct Trade {
        // Market id: sha3(timeouts, oracles, min confirmations) 
        bytes32 market;

        // Deal id: sha3(makret id, sell value, buy value)
        bytes32 deal;

        // Collateral params
        address maker;
        address taker;
        uint256 collateral;

        // Trade oracles
        Set.Address makerTransferConfirmations;
        Set.Address takerTransferConfirmations;

        // Trade state
        TradeState state;
        uint256 startBlock;
        uint256 partialBlock;
        uint256 finishBlock;

        // Trade extra params (used by oracle to check trade off-chain)
        bytes makerExtra;
        bytes takerExtra;
    }

    struct Market {
        // Timeout params
        uint256 makerTimeout;
        uint256 takerTimeout;

        // Trade oracles
        Set.Address oracles;
        uint256 minimalConfirmations;
    }

    /**
     * @dev Get trade summary.
     * @param _id Trade identifier.
     * @return Trade params.
     */
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
    );

    /**
     * @dev Get market summary.
     * @param _id Market identifier.
     * @return Market params.
     */
    function getMarket(
        bytes32 _id
    ) external view returns (
        uint256 makerTimeout,
        uint256 takerTimeout,
        address[] memory oracles,
        uint256 minimalConfirmations
    );

    /**
     * @dev Add new market descriptor.
     * @param _makerTimeout Maker timeout in blocks.
     * @param _takerTimeout Taker timeout in blocks.
     * @param _oracles Trade oracle list.
     * @param _minimalConfirmations Minimal confirmation for trade.
     * @return Market id.
     */
    function newMarket(
        uint256 _makerTimeout,
        uint256 _takerTimeout,
        address[] calldata _oracles,
        uint256 _minimalConfirmations
    ) external returns (
        bytes32 id
    );

    /**
     * @dev Start trade by matching two orders.
     * @param _makerOrder ABI-encoded maker order
     * @param _makerSignature Ethereum signature of maker order
     * @param _takerOrder ABI-encoded taker order
     * @param _takerSignature Ethereum signature of taker order
     * @return started trade identifier
     * @notice orders should not be used befor
     */
    function startTrade(
        bytes calldata _makerOrder,
        bytes calldata _makerSignature,
        bytes calldata _takerOrder,
        bytes calldata _takerSignature
    ) external returns (
        uint256 id
    );

    /**
     * @dev Confirm transfer for a trade.
     * @param _makers list trade id with maker transfer confirmed
     * @param _takers list trade id with maker transfer confirmed
     * @notice for trade oracles call only
     */
    function confirmTransfer(
        uint256[] calldata _makers,
        uint256[] calldata _takers
    ) external returns (
        bool success
    );

    /**
     * @dev Finish trade and pay refund when transfer isn't confirmed.
     * @param _id trade identifier
     * @return true when success closed
     */
    function finishTrade(
        uint256 _id
    ) external returns (
        bool success
    );
}
