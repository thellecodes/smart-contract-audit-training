import { expect } from "chai";
import { Signer } from "ethers";
import { ethers } from "hardhat";
import { BankSavings, ThelleToken } from "../typechain";

let owner: Signer, launcher: Signer, restAccounts: Signer[], operator: Signer;

let thelleToken: ThelleToken;
let bankSavings: BankSavings;

//deploys savings contract
async function deploySavings() {
  const BankSavings = await ethers.getContractFactory("BankSavings");
  bankSavings = await BankSavings.deploy(thelleToken.address);
}

//donates to contract
async function donate(_who: Signer) {
  const result = await (
    await bankSavings.connect(_who).donate(thelleToken.address, 50)
  ).wait();

  const event = result.events?.find(({ topics }: any) =>
    topics.includes(ethers.utils.id("Donated(address,uint)"))
  )?.args;

  return event;
}

//gets the balance of an address
async function balanceOf(_who: Signer) {
  const result = await bankSavings.connect(_who).balanceOf(_who.getAddress());
  return result;
}

//withdraw for an address
async function withdrawUnSafe(amount: number) {
  const result = await (
    await bankSavings.connect(owner).withdraw(amount)
  ).wait();
  return result;
}

//contract balance
async function balanceOfContract(address: string) {
  const result = Number(await thelleToken.connect(owner).balanceOf(address));

  // console.log(result);
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
      const event = await donate(owner);
      expect(event?.token).to.not.be.null;
    });

    it("Should get balance of bankSavings", async () => {
      await balanceOfContract(bankSavings.address);
    });

    it("Should get balance of an address", async () => {
      const result = Number(await balanceOf(owner));
      expect(result).to.be.above(100, "Balance is (0)");
    });

    it("Should withdraw balance of address", async () => {
      await withdrawUnSafe(20);
    });
  });
});
