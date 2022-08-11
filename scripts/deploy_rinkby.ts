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
    "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f" // swap factory on bsc test net
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


// factory =>  0xca1d2a55663d523ccA5EfF676DF77c2678feDae8
// generator =>  0xd20612Fb104949a44618253f03C6eebA9c8D154c
// reward token =>  0xBd83855cfADe70EDA1f93080c32387d93Dc39BE1