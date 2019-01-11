pragma solidity >=0.4.21 <0.6.0;

import 'openzeppelin-solidity/contracts/cryptography/ECDSA.sol';
import 'openzeppelin-solidity/contracts/token/ERC20/ERC20.sol';
import 'openzeppelin-solidity/contracts/token/ERC20/SafeERC20.sol';

import './SingletonHash.sol';
import './AbstractDEX.sol';

contract DEX is AbstractDEX, SingletonHash {
    struct Trade {
        // Trade params
        address   maker;
        address   taker;
        uint256   collateral_value;
        uint256   min_transfer_confirmation;
        // Trade state
        uint256   open_block;
        uint256   close_block;
        address[] taker_transfer_confirmations;
        address[] maker_transfer_confirmations;
    }

    mapping(address => uint256) public trade_of;

    Trade[] public trades;

    ERC20 public collateral;

    using SafeERC20 for ERC20;
    using ECDSA for bytes32;

    constructor(address _collateral) public {
        collateral = ERC20(_collateral);
    }

    function open_trade(
        bytes     calldata _maker_data,
        uint256            _maker_deadline,
        bytes     calldata _maker_signature,
        bytes     calldata _taker_data,
        uint256            _taker_deadline,
        bytes     calldata _taker_signature,
        uint256            _collateral_value,
        address[] calldata _oracles,
        uint256            _min_transfer_confirmations
    ) external returns (
        uint256 trade_id
    ) {
        // Params safety check
        require(_maker_data.length > 0);
        require(_taker_data.length > 0);
        require(_min_transfer_confirmations > 0);
        require(_oracles.length >= _min_transfer_confirmations);

        // Message deadline check
        require(_maker_deadline > block.number);
        require(_taker_deadline > block.number);

        bytes32 maker_hash = message_hash(
            _maker_data,
            _maker_deadline,
            _collateral_value,
            _oracles,
            _min_oracles_count
        );
        // Check that message isn't used before
        singleton_hash(maker_hash);

        bytes32 taker_hash = message_hash(
            _taker_data,
            _taker_deadline,
            _collateral_value,
            _oracles,
            _min_oracles_count
        );
        // Check that message isn't used before
        singleton_hash(taker_hash);

        address maker = maker_hash
            .toEthSignedMessageHash()
            .recover(_maker_signature);

        address taker = taker_hash
            .toEthSignedMessageHash()
            .recover(_taker_signature);

        collateral.safeTransferFrom(maker, address(this), _collateral_value);
        collateral.safeTransferFrom(taker, address(this), _collateral_value);

        trade_id = trades.length;

        // Store oracles of trade
        for (uint256 i = 0; i < _oracles.length; ++i)
            tradeOf[_oracles[i]] = trade_id;

        // Push trade state on chain
        trades.push(Trade(
            maker,
            taker,
            _collateral_value,
            _min_transfer_confirmations,
            block.number,
            0,
            [],
            []
        ));

        emit TradeOpened(trade_id, _maker_data, _taker_data);
    }

    function close_trade(
        uint256 _trade_id
    ) external returns (
        bool success
    ) {
        // TODO
        success = true;
    }

    function confirm_transfer(
        address _trader
    ) external returns (
        bool success
    ) {
        // Check that sender is trade oracle
        uint256 id = tradeOf[msg.sender];
        require(id > 0);

        Trade storage trade = tradeOf[id];
        require(trade.close_block == 0);

        address[] storage transfer_confirmations;
        if (trader == trade.maker) {
            transfer_confirmations = trade.maker_transfer_confirmations;
        } else if (trader == trade.taker) {
            transfer_confirmations = trade.taker_transfer_confirmations;
        } else {
            revert();
        }

        //
        for (uint256 i = 0; i < trade.maker_transfer_confirmations.length; ++i) {
        }
        trade.maker_transfer_confirmations.push(msg.sender);

        success = true;
    }

    function message_hash(
        bytes     memory _data,
        uint256          _deadline,
        uint256          _collateral_value,
        address[] memory _oracles,
        uint256          _min_transfer_confirmations
    ) public pure returns (
        bytes32
    ) {
        return keccak256(abi.encodePacked(
            _data,
            _deadline,
            _collateral_value,
            _oracles,
            _min_transfer_confirmations
        ));
    }
}
