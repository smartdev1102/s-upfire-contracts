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


// factory =>  0x587a39A679994B9E6BA1F6e29Eb0ebA20Df42abF
// generator =>  0x40275f985d891cd73E5b594faaEb01f99142F46C