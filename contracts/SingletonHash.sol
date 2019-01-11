pragma solidity >=0.4.21 <0.6.0;

contract SingletonHash {
    event HashConsumed(bytes32 indexed hash);

    /**
     * @dev Used hash accounting
     */
    mapping(bytes32 => bool) public is_hash_consumed;

    /**
     * @dev Parameter can be used only once
     * @param _hash Single usage hash
     */
    function singleton_hash(bytes32 _hash) internal {
        require(!is_hash_consumed[_hash]);
        is_hash_consumed[_hash] = true;
        emit HashConsumed(_hash);
    }
}
