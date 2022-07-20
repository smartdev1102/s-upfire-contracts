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

    const Farm = await ethers.getContractFactory("Farm");
    const farm = await Farm.deploy(mockToken.address, owner.address);
    return { lptoken, mockToken, farm, owner, user1, user2 };
  }

  describe("add pool", function () {
    it("Should send 5% fee to dev address", async function () {
      const { lptoken, mockToken, farm, owner, user1, user2 } = await loadFixture(deployFixture);
      await mockToken.transfer(user1.address, parseEther("1000"));
      const startTime = await time.latest();
      await mockToken.connect(user1).approve(farm.address, parseEther("1000"));
      await farm.connect(user1).add(
        100,
        lptoken.address,
        startTime,
        parseEther("1000"),
        false
      );
      const balance = await mockToken.balanceOf(owner.address);
      console.log(formatEther(balance))
      expect(formatEther(balance)).to.eq("50.0"); // 5%
    });
    it("Should send 4% fee to dev address when create pool with referral", async function () {
      const { lptoken, mockToken, farm, owner, user1, user2 } = await loadFixture(deployFixture);
      await mockToken.transfer(user1.address, parseEther("1000"));
      const startTime = await time.latest();
      await mockToken.connect(user1).approve(farm.address, parseEther("1000"));
      await farm.connect(user1).add(
        100,
        lptoken.address,
        startTime,
        parseEther("1000"),
        true
      );
      const balance = await mockToken.balanceOf(owner.address);
      console.log(formatEther(balance))
      expect(formatEther(balance)).to.eq("40.0"); // 5%
    });
    it("Should be allow to deposit", async function () {
      const { lptoken, mockToken, farm, owner, user1, user2 } = await loadFixture(deployFixture);
      await mockToken.transfer(user1.address, parseEther("1000"));
      const startTime = await time.latest();
      await mockToken.connect(user1).approve(farm.address, parseEther("1000"));
      await farm.connect(user1).add(
        100,
        lptoken.address,
        startTime,
        parseEther("1000"),
        false
      );
      const poolLength = await farm.poolLength();
      expect(poolLength).to.eq(1);
      const pool = await farm.poolInfo(0);
      expect(pool.lpToken).to.eq(lptoken.address);
      // deposit
      await lptoken.transfer(user2.address, parseEther("1000"));
      await lptoken.connect(user2).approve(farm.address, parseEther("1000"));
      
    });
  });
});
