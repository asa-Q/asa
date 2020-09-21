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
import "./lib/IERC20.sol";
import "./lib/SafeMath.sol";
import "./lib/Address.sol";
import "./lib/SafeERC20.sol";



contract StrategyEZZC{

    using SafeERC20 for IERC20;
    using Address for address;
    using SafeMath for uint256;

    address constant public want = address(0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48);
    address constant public vault = address(0x597aD1e0c13Bfe8025993D9e79C69E1c0233522e);

    address public constant aave = address(0x24a42fD28C976A61Df5D00D0599C34c4f90748c8);

    address public governance;
    address public controller;

    constructor(address _controller) public {
        governance = msg.sender;
        controller = _controller;
    }

    function deposit() external {
        uint _balance = IERC20(want).balanceOf(address(this));
        if (_balance > 0) {
            IERC20(want).safeApprove(address(vault), 0);
            IERC20(want).safeApprove(address(vault), _balance);
            Vault(vault).deposit(_balance);
        }
    }

    function getAave() public view returns (address) {
        return LendingPoolAddressesProvider(aave).getLendingPool();
    }

    function getName() external pure returns (string memory) {
        return "StrategyEZZC";
    }






}
