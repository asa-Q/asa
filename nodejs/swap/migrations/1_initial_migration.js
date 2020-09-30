const Migrations = artifacts.require("Migrations");
const SushiToken = artifacts.require("SushiToken");
const Timelock = artifacts.require("Timelock");
//const ethers = artifacts.require("ethers");
//const MockERC20 = artifacts.require("MockERC20");
const MasterChef = artifacts.require("MasterChef");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(SushiToken);
// deployer.deploy(Timelock);
//  deployer.deploy(ethers);
//  deployer.deploy(MockERC20);
//  deployer.deploy(MasterChef);
};
