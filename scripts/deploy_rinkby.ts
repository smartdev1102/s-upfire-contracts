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


// factory =>  0xd1FDf8F8aB2B0D89b4f71435D2BC274F4D2Cd374
// generator =>  0x2D23d44d1bD7566186F72A200bBFC4a22B20539A

// pool factory =>  0x4D76B13CE7b28F26011cE4182484c9718337F9c6
// pool generator =>  0x709839ABA3a71a3938675dE92B93f65bbD32d0c5

// factory =>  0xeD4ebC3BE63b2b9ec83A7ba79F1dA16936E4A2a2
// generator =>  0xC0aa3BfFA08A4b51108c714fd75Bf4d2ff758b50