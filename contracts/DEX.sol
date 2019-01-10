pragma solidity >=0.4.21 <0.6.0;

import 'openzeppelin-solidity/contracts/cryptography/ECDSA.sol';
import 'openzeppelin-solidity/contracts/token/ERC20/ERC20.sol';
import 'openzeppelin-solidity/contracts/token/ERC20/SafeERC20.sol';

import './AbstractDEX.sol';

contract DEX is AbstractDEX {
    struct Trade {
        bytes       maker_data;
        uint256     maker_value;
        uint256     maker_deadline;
        bytes       maker_signature;
        bytes       taker_data;
        uint256     taker_value;
        uint256     taker_deadline;
        bytes       taker_signature;
        uint256     collateral_value;
        address[]   oracles;
        uint256     min_oracles_count;
    }

    Trade[] trades;

    mapping(bytes32 => bool) usedHash;
    mapping(bytes32 => bool) confirmedHash;

    ERC20 public collateral;

    using SafeERC20 for ERC20;
    using ECDSA for bytes32;

    constructor(address _collateral) public {
        collateral = ERC20(_collateral);
    }

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
    ) {
        bytes32 makerHash = message_hash(
            _maker_data,
            _maker_value,
            _maker_deadline,
            _collateral_value,
            _oracles,
            _min_oracles_count
        );
        // Check that message isn't used before
        require(!usedHash[makerHash]);
        usedHash[makerHash] = true;

        bytes32 takerHash = message_hash(
            _taker_data,
            _taker_value,
            _taker_deadline,
            _collateral_value,
            _oracles,
            _min_oracles_count
        );
        // Check that message isn't used before
        require(!usedHash[takerHash]);
        usedHash[takerHash] = true;

        address maker = makerHash
            .toEthSignedMessageHash()
            .recover(_maker_signature);

        address taker = takerHash
            .toEthSignedMessageHash()
            .recover(_taker_signature);

        collateral.safeTransferFrom(maker, address(this), _collateral_value);
        collateral.safeTransferFrom(taker, address(this), _collateral_value);

        trade_id = trades.length;
        trades.push(Trade(
            _maker_data,
            _maker_value,
            _maker_deadline,
            _maker_signature,
            _taker_data,
            _taker_value,
            _taker_deadline,
            _taker_signature,
            _collateral_value,
            _oracles,
            _min_oracles_count
        ));

        emit TradeOpened(trade_id);
    }

    function close_trade(
        uint256 _trade_id
    ) external returns (
        bool success
    ) {
        // TODO
        success = true;
    }

    function cancel_order(
        bytes32 _message_hash,
        bytes calldata _signature
    ) external returns (
        bool success
    ) {
        address sender = _message_hash
            .toEthSignedMessageHash()
            .recover(_signature);
        require(sender == msg.sender);

        usedHash[_message_hash] = true;
        success = true;
    }

    function confirm_transfer(
        bytes32 _message_hash
    ) external returns (
        bool success
    ) {
        // TODO
        success = true;
    }

    function message_hash(
        bytes memory _data,
        uint256 _value,
        uint256 _deadline,
        uint256 _collateral_value,
        address[] memory _oracles,
        uint256 _min_oracles_count
    ) public pure returns (
        bytes32
    ) {
        return keccak256(abi.encodePacked(
            _data, _value, _deadline, _collateral_value, _oracles, _min_oracles_count
        ));
    }
}
