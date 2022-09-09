import { parseEther } from "ethers/lib/utils";
import { ethers } from "hardhat";

async function main() {
  const [owner] = await ethers.getSigners();
  const Factory = await ethers.getContractFactory("Factory");
  const factory = await Factory.deploy();
  await factory.deployed();

  console.log("factory => ",factory.address);

  const Generator = await ethers.getContractFactory("FarmGenerator");
  const generator = await Generator.deploy(
    factory.address,
    "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f", // swap factory 
    "0x1F98431c8aD98523631AE4a59f267346ea31F984"  // swap factoryV3
  );
  await generator.deployed();
  console.log("generator => ", generator.address);

  await factory.adminAllowFarmGenerator(generator.address, true);

  // const Token = await ethers.getContractFactory("ERC20Mock");
  // const token = await Token.deploy(parseEther("1000000"));
  // await token.deployed();
  // console.log("reward token => ", token.address);
  
  // const Factory = await ethers.getContractFactory("PoolFactory");
  // const factory = await Factory.deploy();
  // await factory.deployed();

  // console.log("pool factory => ", factory.address);

  // const Generator = await ethers.getContractFactory("PoolGenerator");
  // const generator = await Generator.deploy(factory.address, owner.address);
  // await generator.deployed();
  // await factory.adminAllowPoolGenerator(generator.address, true);
  
  // console.log("pool generator => ", generator.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});


// factory =>  0x015C2Bd64B3338b024AC32f99e11C794d19E0374
// generator =>  0xcD848c4034049ccA50C6B7594A5F974425ab09a2