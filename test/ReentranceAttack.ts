import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";
import { Signer } from "ethers";
import { BankSavings, ThelleToken } from "../typechain";

let owner: Signer, launcher: Signer;

let thelleToken: ThelleToken;
let bankSavings: BankSavings;

async function deployEscrow() {
  // Deploy Escrow Contract
  const BankSavings = await ethers.getContractFactory("Escrow");
  bankSavings = await BankSavings.deploy(thelleToken.address, 1000000000);
}

async function donate() {
  await bankSavings.connect(owner).donate(thelleToken.address, 10);
}
