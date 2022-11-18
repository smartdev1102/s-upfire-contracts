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
    "0xc35DADB65012eC5796536bD9864eD8773aBc74C4",// swap factory on bsc test net
    "0xc35DADB65012eC5796536bD9864eD8773aBc74C4" 
  );
  await generator.deployed();
  console.log("generator => ", generator.address);

  await factory.adminAllowFarmGenerator(generator.address, true);

  const Token = await ethers.getContractFactory("ERC20Mock");
  const token = await Token.deploy(parseEther("1000000"));
  await token.deployed();
  console.log("reward token => ", token.address);

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


// bsc mainnet
// factory =>  0x63Abf57Bd3773901De3ec9FaF49D824B67d233CC
// generator =>  0xb463f85621cCAC9f7178eA72CAAA27941849f738

// pangolin
// factory =>  0xafdC15eD96544f4Dc7bB3997f723A3F333eEE994
// generator =>  0xfeaB072417019a9b2Dc1c6940c31845354a3d0E7

// tradeJoe
// factory =>  0x0100e4D763bA57C0DCAa5E3D4cBb5A51f65e2846
// generator =>  0x3fa9b82Dd7db611242b6B0C67EaC1bb580F2259e

// bsc mainnet
// pool factory =>  0x1a43abdbb2BDfC5ef3C5B9a92fFed566630C0a7D
// pool generator =>  0xc00ee850efA214742b548626c0Bc56FFebCa0032

// avalanche mainnet
// pool factory =>  0x5997c902700D4a35456ee6BEC69699E2F57486F1
// pool generator =>  0xAa33efd126a446a1F518880bBEA0Ce3a740f5C39

// bsc test net pool
// pool factory =>  0x8c600cAa998B007f3EA81046d5710d2D502edC0E
// pool generator =>  0x36f708Cd37f35e9517Be6F1F6D0f3b52b9898799