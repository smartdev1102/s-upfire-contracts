// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import "./IFactory.sol";
import "./Farm.sol";

contract FarmGenerator is Ownable {
    address public devaddr;
    uint256 public devfee;
    uint256 public referralfee;
    IFactory public factory;

    function updateDevaddr(address _devaddr) public onlyOwner {
        devaddr = _devaddr;
    }

    function updateDevfee(uint256 _devfee) public onlyOwner {
        devfee = _devfee;
    }

    function updateReferralfee(uint256 _referralfee) public onlyOwner {
        referralfee = _referralfee;
    }

    constructor(
        IFactory _factory,
        address _devaddr,
        uint256 _devfee,
        uint256 _referralfee
    ) {
        factory = _factory;
        devaddr = _devaddr;
        devfee = _devfee;
        referralfee = _referralfee;
    }

    function createFarm (
      address _rewardToken,
      uint256 _rewardPerBlock,
      uint256 _startBlock
    ) public {
      Farm newFarm = new Farm(
        IERC20(_rewardToken),
        _rewardPerBlock,
        _startBlock,
        devaddr,
        msg.sender,
        devfee,
        referralfee
      );
      factory.registerFarm(address(newFarm));
    }
}
