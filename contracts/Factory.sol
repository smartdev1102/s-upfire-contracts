// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Factory is Ownable {
    using EnumerableSet for EnumerableSet.AddressSet;

    EnumerableSet.AddressSet private farms;

    function registerFarm(address _farm) external {
        farms.add(_farm);
    }

    function farmsLength() external view returns (uint256) {
        return farms.length();
    }

    function farmsAtIndex(uint256 _index) external view returns (address) {
        return farms.at(_index);
    }

    function farmIsRegistered(address _farm) external view returns (bool) {
        return farms.contains(_farm);
    }
}
