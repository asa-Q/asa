const Migrations = artifacts.require("Migrations");
const SushiToken = artifacts.require("SushiToken");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(SushiToken);
};
