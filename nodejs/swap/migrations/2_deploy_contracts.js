const SushiToken = artifacts.require("SushiToken");
module.exports = function(deployer) {
deployer.deploy(SushiToken);
};
