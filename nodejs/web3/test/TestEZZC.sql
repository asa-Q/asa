pragma solidity >=0.4.25 <0.7.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/EZZC.sol";

contract TestEZZC {

  function testInitialBalanceUsingDeployedContract() public {
    EZZC ezzc = EZZC(DeployedAddresses.EZZC());

    uint expected = 10000;

    Assert.equal(ezzc.getBalance(tx.origin), expected, "Owner should have 10000 MetaCoin initially");
  }

  function testInitialBalanceWithNewMetaCoin() public {
    EZZC ezzc = new EZZC();

    uint expected = 10000;

    Assert.equal(ezzc.getBalance(tx.origin), expected, "Owner should have 10000 MetaCoin initially");
  }

}
