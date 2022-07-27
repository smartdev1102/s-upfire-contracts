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


// factory =>  0x1EB659a683a27b5205626BBe596CfE0Ea999E315
// generator =>  0xBadE108Ee900883f5Fb9f4A1b54eAFCF6c9D3001
// reward token =>  0x2A84A252b129489Bc7834B483a4Ba370cA403F19