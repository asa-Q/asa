// SPDX-License-Identifier: MIT
//by QXP
pragma solidity >=0.4.25 <0.7.0;

import "./ConvertLib.sol";

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/token/ERC20/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/GSN/Context.sol";


// This is just a simple example of a coin-like contract.
// It is not standards compatible and cannot be expected to talk to other
// coin/token contracts. If you want to create a standards-compliant
// token, see: https://github.com/ConsenSys/Tokens. Cheers!

contract EZZC is ERC20{


	using SafeERC20 for IERC20;
	using Address for address;
	using SafeMath for uint256;
	IERC20 public token;

	mapping (address => uint) balances;

	event Transfer(address indexed _from, address indexed _to, uint256 _value);

   constructor () public ERC20("ezToken", "TEST") {
        _mint(msg.sender, 30000 * 10**18);
//       _setupDecimals(ERC20(_token).decimals());
//        token = IERC20(_token);
	balances[tx.origin] = 10000;
    }



	function sendCoin(address receiver, uint amount) public returns(bool sufficient) {
		if (balances[msg.sender] < amount) return false;
		balances[msg.sender] -= amount;
		balances[receiver] += amount;
		emit Transfer(msg.sender, receiver, amount);
		return true;
	}

	function getBalanceInEth(address addr) public view returns(uint){
		return ConvertLib.convert(getBalance(addr),2);
	}

	function getBalance(address addr) public view returns(uint) {
		return balances[addr];
	}
}
