/**
 * @title Library for single value data collection. 
 */

pragma solidity >= 0.5.0;

library Set {
    struct Address {
        mapping(address => bool) flags;
        address[] data;
    }

    function at(
        Address storage self,
        uint256 _ix
    ) internal view returns (address) {
        require(_ix < self.data.length);
        return self.data[_ix];
    }

    function size(
        Address storage self
    ) internal view returns (uint256) {
        return self.data.length;
    }

    function contains(
        Address storage self,
        address _value
    ) internal view returns (bool) {
        return self.flags[_value];
    }

    function insert(
        Address storage self,
        address _value
    ) internal returns (bool) {
        if (!self.flags[_value]) {
            self.flags[_value] = true;
            self.data.push(_value);
            return true;
        } 
        return false;
    }

}
