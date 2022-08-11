import { parseEther } from "ethers/lib/utils";
import { ethers } from "hardhat";

async function main() {
  const Factory = await ethers.getContractFactory("Factory");
  const factory = await Factory.deploy();
  await factory.deployed();

  console.log("factory => ",factory.address);

  const Generator = await ethers.getContractFactory("FarmGenerator");
  const generator = await Generator.deploy(
    factory.address,
    "0x1005fffFE0E4154512FaDa53a68d75D15cE82120" // swap factory on bsc test net
  );
  await generator.deployed();
  console.log("generator => ", generator.address);

  await factory.adminAllowFarmGenerator(generator.address, true);

  const Token = await ethers.getContractFactory("ERC20Mock");
  const token = await Token.deploy(parseEther("1000000"));
  await token.deployed();
  console.log("reward token => ", token.address);
  
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});


// factory =>  0xfeaB072417019a9b2Dc1c6940c31845354a3d0E7
// generator =>  0xd5649a4a5AdbcD6a0b25972DD907761d5f4648e4
// reward token =>  0x0100e4D763bA57C0DCAa5E3D4cBb5A51f65e2846