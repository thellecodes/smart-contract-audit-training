// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../src/Counter.sol";
import "src/Counter.sol";

contract CounterTest is Test {
    Counter counter;

    function setUp() external {
        counter = new Counter(10);
    }

    function testCount() public {
        int value = counter.getCount();
        assertEq(value, 10);
    }

    function testIncrement() public {
        counter.incrementCounter();
        int value = counter.getCount();
        assertEq(value, 11);
    }
}
