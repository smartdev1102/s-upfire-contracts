// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

interface IFactory {
    function registerFarm(address _farm) external;

    function farmsLength() external view returns (uint256);

    function farmsAtIndex(uint256 _index) external view returns (address);

    function farmIsRegistered(address _farm) external view returns (bool);
}
