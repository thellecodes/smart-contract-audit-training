import { ethers } from "hardhat";

async function main() {
  const [, ...accounts] = await ethers.getSigners();

  // erc20 token
  const ThelleToken = await ethers.getContractFactory("ThelleToken");
  const ThelleContract = await ThelleToken.deploy(1000000000);
  await ThelleContract.deployed();
  console.log("ThelleToken Address: ", ThelleContract.address);

  //bank savings contract
  const BankSavings = await ethers.getContractFactory("BankSavings");
  const BankSavingsContract = await BankSavings.deploy(ThelleContract.address);
  console.log("BankSavings Contract Address: ", BankSavingsContract.address);

  //bank savings reenetrancy contract
  const ReentrancyAttackOnBankSavings = await ethers.getContractFactory(
    "ReentrancyAttackOnBankSavings"
  );
  const ReentrancyAttackOnBankSavingsContract =
    await ReentrancyAttackOnBankSavings.deploy(BankSavingsContract.address);
  console.log(
    "ReentrancyAttackOnBankSavings Contract address",
    ReentrancyAttackOnBankSavingsContract.address
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
