// SPDX-License-Identifier: UNLICENSED

pragma solidity 0.8.14;

import { BasicERC721PoolInvariants } from "../../invariants/ERC721Pool/BasicERC721PoolInvariants.t.sol";
import "@std/console.sol";

contract RegressionTestBasicERC721Pool is BasicERC721PoolInvariants { 

    function setUp() public override { 
        super.setUp();
    }

    function test_regression_out_of_gas() external {
        _basicERC721PoolHandler.drawDebt(6251, 2506, 0);
        _basicERC721PoolHandler.drawDebt(5442742850703661819442539517113510923065138686636336073122798635, 3, 0);

        invariant_total_interest_earned_I2();
    }

    function test_regression_evm_revert_1() external {
        _basicERC721PoolHandler.drawDebt(0, 29877144463, 0);
        _basicERC721PoolHandler.removeQuoteToken(0, 115792089237316195423570985008687907853269984665640564039457584007913129639934, 1206432074572207884421188737151329072317831713860321643282, 0);
    }

    function test_regression_evm_revert_2() external {
        _basicERC721PoolHandler.transferLps(76782784424641365703739404005502204389486434568092458354824862449636, 115792089237316195423570985008687907853269984665640564039457584007913129639932, 115792089237316195423570985008687907853269984665640564039457584007913129639934, 8035404803286, 0);
        _basicERC721PoolHandler.pledgeCollateral(342383554214549851552199917128005690776956832171674611333701203702390, 0, 0);
        _basicERC721PoolHandler.removeQuoteToken(12567859756068232972011072581, 63626342148664557735680537369075067784627403842721642546686472741089686440047, 8127527276777147088111960971, 0);
        _basicERC721PoolHandler.addQuoteToken(20779927945551108207926635157913063675776800121687779034981760002893853699, 57581400339686514759890039148521228145897186273404444222043163327979038812912, 74636668128306553654783413916389199708724482852687925110440797752935581131276, 0);
        _basicERC721PoolHandler.pledgeCollateral(1749, 60975514031505374609128672992631717582003685370683632591257473037951960167993, 0);
        _basicERC721PoolHandler.pledgeCollateral(25718032335942173737944995798726490502781258789511022074015153606363463, 1325044714694, 0);
        _basicERC721PoolHandler.addQuoteToken(234707990811923980957502397929, 291292446109648312501466920531792328617, 115792089237316195423570985008687907853269984665640564039457584007913129639932, 0);
        _basicERC721PoolHandler.repayDebt(10621200, 1157, 0);
    }

    function test_regression_evm_revert_3() external {
        _basicERC721PoolHandler.repayDebt(7033399587545693049772672666426104761848542813925583983822212786951755531265, 1108, 0);
        _basicERC721PoolHandler.repayDebt(0, 115792089237316195423570985008687907853269984665640564039457584007913129639935, 0);
        _basicERC721PoolHandler.removeQuoteToken(0, 134682577920393186680576557312616751188928702587427398297744881288955844683, 85980234897818314, 0);
        _basicERC721PoolHandler.removeCollateral(87753968394072371065317166720803, 15237002444774746392696, 4454566448443430136, 0);
        _basicERC721PoolHandler.pullCollateral(0, 1131722123054653932602913, 0);
        _basicERC721PoolHandler.pledgeCollateral(115792089237316195423570985008687907853269984665640564039457584007913129639935, 0, 0);
    }

}