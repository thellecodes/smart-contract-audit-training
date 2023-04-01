import { expect } from "chai";
import { Signer } from "ethers";
import { ethers } from "hardhat";
import {
  ReentrancyAttackOnBankSavings,
  BankSavings,
  ThelleToken,
} from "../typechain";

let owner: Signer, launcher: Signer, restAccounts: Signer[], operator: Signer;
let reentrancyHack: ReentrancyAttackOnBankSavings;
let bankSavings: BankSavings;
let thelleToken: ThelleToken;

// deploys savings contract
async function deploySavings() {
  const BankSavings = await ethers.getContractFactory("BankSavings");
  bankSavings = await BankSavings.deploy(thelleToken.address);
}

//deploys thelle token
async function deployThelleToken() {
  const ThelleToken = await ethers.getContractFactory("ThelleToken");
  thelleToken = await ThelleToken.deploy(1000000000);
}

async function transferSomeTokensToHackContract(_amount: number, _who: Signer) {
  const result = await thelleToken
    .connect(_who)
    .transfer(reentrancyHack.address, _amount);
}

async function getBalance() {
  const result = Number(
    await thelleToken.connect(owner).balanceOf(owner.getAddress())
  );
  return result;
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
describe("ReentrancyAttackOnBankSavings", function () {
  this.beforeAll(async () => {
    [owner, operator, launcher, ...restAccounts] = await ethers.getSigners();

    await deployThelleToken();
    await deploySavings();

    reentrancyHack = await ethers.getContractAt(
      "ReentrancyAttackOnBankSavings",
      bankSavings.address
    );
  });

  describe("Bank Savings hack", () => {
    it("Should check thelle token total supply", async () => {
      const result = await getBalance();
      expect(result).to.equal(1000000000);
    });

    it("Should transfer thelle token to Reentrancy Contract", async () => {
      const result = await transferSomeTokensToHackContract(1000, owner);
    });

    //TODO: multiple donations

    //TODO: checks banksavings balance

    //TODO: attacks the contract

    //TODO: check bank savings balance

    //TODO: check Reentrancy contract balance

    it("Should attack bank savings", async () => {});
  });
});
