// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract Counter {
    int public count;

    constructor(int _count) {
        count = _count;
    }

    function incrementCounter() external {
        count -= 1;
    }

    function getCount() external view returns (int) {
        return count;
    }
}
