import { expect } from "chai";
import { Signer } from "ethers";
import { ethers } from "hardhat";
import {
  ReentrancyAttackOnBankSavings,
  BankSavings,
  ThelleToken,
  ERC20,
} from "../typechain";

let owner: Signer, launcher: Signer, restAccounts: Signer[], operator: Signer;
let reentrancyHack: ReentrancyAttackOnBankSavings;
let bankSavings: BankSavings;
let thelleToken: ThelleToken;
let ierc20: ERC20;

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
    it("Should check deployer balance", async () => {
      const result = await getBalance();
      expect(result).to.equal(1000000000);
    });

    it("should donate and attack", async () => {
      const _amount = 6000;

      //transfer some thelleTokens to operator
      await thelleToken.connect(owner).transfer(operator.getAddress(), _amount);

      //donate to contract
      await bankSavings.connect(owner).donate(thelleToken.address, _amount);

      //transfer to reentrant contract
      await thelleToken
        .connect(owner)
        .transfer(reentrancyHack.address, _amount);

      //confirm deposit
      const firstResult = await thelleToken.balanceOf(reentrancyHack.address);
      expect(firstResult).to.equal(_amount);

      // check bankSavings balance
      const secondResult = await thelleToken.balanceOf(bankSavings.address);
      expect(secondResult).to.equal(_amount);

      //attack the contract
      // await reentrancyHack.connect(operator).attack();

      //check operator balance
      const thirdResult = Number(
        await thelleToken.balanceOf(operator.getAddress())
      );
      expect(thirdResult).to.equal(6000);
    });
  });
});
