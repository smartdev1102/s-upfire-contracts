// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract LPToken is ERC20 {
    constructor(uint256 _totalSupply) ERC20("LPToken", "LTK") {
        _mint(msg.sender, _totalSupply);
    }
}