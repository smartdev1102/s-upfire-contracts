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
    "0xc35DADB65012eC5796536bD9864eD8773aBc74C4" // swap factory on bsc test net
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


// factory =>  0x666Abb0d4750E5325d887186e3A9DF8df8A86Ca1
// generator =>  0x2E725ECc8adC90b54E656769d7fD8Be652d1108d
// reward token =>  0x4Db27e5429438f190d8b98E1a167F4266Fe42dc7