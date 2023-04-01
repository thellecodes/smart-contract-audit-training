// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

interface IReentrancyAttackOnBankSavings {
    function donate(address) external payable;

    function withdraw(uint256) external;
}
