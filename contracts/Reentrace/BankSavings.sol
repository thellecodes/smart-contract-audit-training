// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract BankSavings {
    event Donated(address _who, uint _amount);
    event Withdraw(address _who, uint _amount);

    using SafeMath for uint256;
    mapping(address => uint) public balances;
    address public token; // contract token
    bool internal lock;

    constructor(address _token) {
        token = _token;
    }

    //donate
    function donate(address _token, uint _amount) public payable {
        uint balance = IERC20(_token).balanceOf(msg.sender);
        require(balance > _amount, "Insufficient balance");
        emit Donated(_token, _amount);
        balances[msg.sender] += _amount;
    }

    //check balance
    function balanceOf(address _who) public view returns (uint balance) {
        uint balance = IERC20(token).balanceOf(_who);
        return balance;
    }

    //FIXME: open to reentrance attack
    function withdraw(uint _amount) public {
        if (balances[msg.sender] >= _amount) {
            (bool result, ) = msg.sender.call{value: _amount}("");
            if (result) {
                _amount;
                emit Withdraw(msg.sender, _amount);
            }
            balances[msg.sender] -= _amount;
        }
    }

    //[x] withdraw function, safe from reentrace
    function withdrawSafe(uint _amount) public nonReentrant {
        if (balances[msg.sender] >= _amount) {
            balances[msg.sender] -= _amount;

            emit Withdraw(msg.sender, _amount);
            (bool result, ) = msg.sender.call{value: _amount}("");

            require(result);
        }
    }

    function getContractBalance() public view returns (uint256) {
        return balances[msg.sender];
    }

    // reentrance lock
    modifier nonReentrant() {
        require(!lock);
        lock = true;
        _;
        lock = false;
    }
}
