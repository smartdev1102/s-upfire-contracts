import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";
import { formatEther, parseEther } from 'ethers/lib/utils';
import { constants } from "ethers";

describe("Farm", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshopt in every test.
  async function deployFixture() {
    const [owner, user1, user2] = await ethers.getSigners();
    const LPToken = await ethers.getContractFactory("LPToken");
    const lptoken = await LPToken.deploy(parseEther("1000"));

    const MockToken = await ethers.getContractFactory("ERC20Mock");
    const mockToken = await MockToken.deploy(parseEther("1000"));

    const Factory = await ethers.getContractFactory("Factory");
    const factory = await Factory.deploy();

    const Generator = await ethers.getContractFactory("FarmGenerator");
    const generator = await Generator.deploy(factory.address, "");
    return { lptoken, mockToken, factory, generator, owner, user1, user2 };
  }

  describe("add pool", function () {
    it("Should send 5% fee to dev address", async function () {
      const { lptoken, mockToken, generator, owner, user1, user2 } = await loadFixture(deployFixture);
      
    });
    
  });
});
