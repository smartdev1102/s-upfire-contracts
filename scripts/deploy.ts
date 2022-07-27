import { parseEther } from "ethers/lib/utils";
import { ethers } from "hardhat";

async function main() {
  const Factory = await ethers.getContractFactory("Factory");
  const factory = await Factory.deploy();
  await factory.deployed();

  console.log("factory => ",factory.address);
  const [owner] = await ethers.getSigners();
  const Generator = await ethers.getContractFactory("FarmGenerator");
  const generator = await Generator.deploy(
    factory.address,
    owner.address,
    10,
    10
  );
  await generator.deployed();
  console.log("generator => ", generator.address);

  const LPToken = await ethers.getContractFactory("LPToken");
  const lptoken = await LPToken.deploy(parseEther("1000000"));
  await lptoken.deployed();
  console.log("lptoken => ", lptoken.address);

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


// factory =>  0xE34988e37F58966CcBf8D80CcB33278926E3Bac7
// generator =>  0x1b3B9Bb55662cc56fAf600eABcd1649f54559d34
// lptoken =>  0x7c7fea6F156ca519f71F5e59E8b2f7f2bbF18290
// reward token =>  0x85ac1abD25886b4F8779BF31490083C96BBafDa8