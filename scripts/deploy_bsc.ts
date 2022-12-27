import { parseEther } from "ethers/lib/utils";
import { ethers } from "hardhat";

async function main() {
  const [owner] = await ethers.getSigners();
  // const Factory = await ethers.getContractFactory("Factory");
  // const factory = await Factory.deploy();
  // await factory.deployed();

  // console.log("factory => ",factory.address);

  // const Generator = await ethers.getContractFactory("FarmGenerator");
  // const generator = await Generator.deploy(factory.address,
  //   "0xB7926C0430Afb07AA7DEfDE6DA862aE0Bde767bc", "0xB7926C0430Afb07AA7DEfDE6DA862aE0Bde767bc"
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


// factory =>  0xfeaB072417019a9b2Dc1c6940c31845354a3d0E7
// generator =>  0xd5649a4a5AdbcD6a0b25972DD907761d5f4648e4
// reward token =>  0x0100e4D763bA57C0DCAa5E3D4cBb5A51f65e2846

