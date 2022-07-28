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

  // const Token = await ethers.getContractFactory("ERC20Mock");
  // const token = await Token.deploy(parseEther("1000000"));
  // await token.deployed();
  // console.log("reward token => ", token.address);
  
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});


// factory =>  0x025345Cd7637866516B7C71d7FCD08B7E9c60372
// generator =>  0x3E47Cd39b302B52c88d43DFdb6c8d8ebA3975B2E