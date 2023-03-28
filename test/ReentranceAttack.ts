import { expect } from "chai";
import { Signer } from "ethers";
import { ethers } from "hardhat";
import { BankSavings, ThelleToken } from "../typechain";
// const ethers = require("ethers");

let owner: Signer, launcher: Signer, restAccounts: Signer[];

let thelleToken: ThelleToken;
let bankSavings: BankSavings;

async function deploySavings() {
  // Deploy Escrow Contract
  const BankSavings = await ethers.getContractFactory("BankSavings");
  bankSavings = await BankSavings.deploy(thelleToken.address);
}

async function donate() {
  await bankSavings.connect(owner).donate(thelleToken.address, 10);
}

describe("BankSavings", function () {
  this.beforeAll(async () => {
    [owner, launcher, ...restAccounts] = await ethers.getSigners();

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
  });
});
