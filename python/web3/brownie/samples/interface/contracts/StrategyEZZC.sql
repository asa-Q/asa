// SPDX-License-Identifier: MIT
pragma solidity ^0.6.2;

/*

 A strategy must implement the following calls;

 - deposit()
 - withdraw(address) must exclude any tokens used in the yield - Controller role - withdraw should return to Controller
 - withdraw(uint) - Controller | Vault role - withdraw should always return to vault
 - withdrawAll() - Controller | Vault role - withdraw should always return to vault
 - balanceOf()

 Where possible, strategies must remain as immutable as possible, instead of updating variables, we update the contract by linking it in the controller

*/




import "../interfaces/Controller.sol";
import "../interfaces/Vault.sol";
import "../interfaces/Aave.sol";
import "lib/IERC20.sol";
import "lib/SafeMath.sol";
import "lib/Address.sol";
import "lib/SafeERC20.sol";



contract StrategyEZZC{

}
