const ConvertLib = artifacts.require("ConvertLib");
const EZZC = artifacts.require("EZZC");

module.exports = function(deployer) {
  deployer.deploy(ConvertLib);
  deployer.link(ConvertLib, EZZC);
  deployer.deploy(EZZC);
};
