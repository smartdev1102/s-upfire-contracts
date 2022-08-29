import { parseEther } from "ethers/lib/utils";
import { ethers } from "hardhat";

async function main() {
  const [owner] = await ethers.getSigners();
  // const Factory = await ethers.getContractFactory("Factory");
  // const factory = await Factory.deploy();
  // await factory.deployed();

  // console.log("factory => ",factory.address);

  // const Generator = await ethers.getContractFactory("FarmGenerator");
  // const generator = await Generator.deploy(
  //   factory.address,
  //   "0xc35DADB65012eC5796536bD9864eD8773aBc74C4" // swap factory on bsc test net
  // );
  // await generator.deployed();
  // console.log("generator => ", generator.address);

  // await factory.adminAllowFarmGenerator(generator.address, true);

  // const Token = await ethers.getContractFactory("ERC20Mock");
  // const token = await Token.deploy(parseEther("1000000"));
  // await token.deployed();
  // console.log("reward token => ", token.address);

  const Factory = await ethers.getContractFactory("PoolFactory");
  const factory = await Factory.deploy();
  await factory.deployed();

  console.log("pool factory => ", factory.address);

  const Generator = await ethers.getContractFactory("PoolGenerator");
  const generator = await Generator.deploy(factory.address, owner.address);
  await generator.deployed();
  await factory.adminAllowPoolGenerator(generator.address, true);
  
  console.log("pool generator => ", generator.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});



// factory =>  0xDb9ADc1D6ED67B3f599c7706478342bCF2577411
// generator =>  0xddf3b2233ba2B667c2f68eE9D863Ab288C6838d6

// pool factory =>  0x13BcEA47E3B4F3Ca1AB540f623B4921b9836b9d4
// pool generator =>  0xF7ab35F09d1b2B565491f93F5e41e78c10c0F325