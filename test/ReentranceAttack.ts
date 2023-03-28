import { expect } from "chai";
import { Signer } from "ethers";
import { ethers } from "hardhat";
import { BankSavings, ThelleToken } from "../typechain";

let owner: Signer, launcher: Signer, restAccounts: Signer[], operator: Signer;

let thelleToken: ThelleToken;
let bankSavings: BankSavings;

async function deploySavings() {
  // Deploy Escrow Contract
  const BankSavings = await ethers.getContractFactory("BankSavings");
  bankSavings = await BankSavings.deploy(thelleToken.address);
}

async function donate() {
  const result = await (
    await bankSavings.connect(owner).donate(thelleToken.address, 50)
  ).wait();

  const event = result.events?.find(({ topics }) =>
    topics.includes(ethers.utils.id("Donated(address,uint)"))
  )?.args;

  return event;
}

async function balanceOf(_who: Signer) {
  const result = await bankSavings.connect(_who).balanceOf(_who.getAddress());

  return result;
}

describe("BankSavings", function () {
  this.beforeAll(async () => {
    [owner, operator, launcher, ...restAccounts] = await ethers.getSigners();

    // Deploy ThelleToken Contract
    const ThelleToken = await ethers.getContractFactory("ThelleToken");
    thelleToken = await ThelleToken.deploy(1000000000);
  });

  describe("deployment", () => {
    before(async () => {
      await deploySavings();
    });

    it("Should set the right token address", async () => {
      const result = await bankSavings.token();
      expect(result).to.equal(thelleToken.address);
    });

    it("Should allow sender to donate", async () => {
      const event = await donate();
      expect(event?.token).to.not.be.null;
    });

    it("Should get balance of an address", async () => {
      const result = Number(await balanceOf(operator));
      expect(result).to.be.above(0, "Balance is (0)");
    });
  });
});
