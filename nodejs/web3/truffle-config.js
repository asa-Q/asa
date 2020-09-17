module.exports = {
  // Uncommenting the defaults below 
  // provides for an easier quick-start with Ganache.
  // You can also follow this format for other networks;
  // see <http://truffleframework.com/docs/advanced/configuration>
  // for more details on how to specify configuration options!
  //
  networks: {
    development: {
      host: "127.0.0.1",
//      port: 7545,
      port: 8545,
      network_id: "*",
//      from: "0xE8d5033A0Ab79FFB5d2697B54268C10424d1AD92"
    },
    test: {
      host: "127.0.0.1",
//      port: 7545,
      port: 8545,
      network_id: "*"
    }
  },

	 // Configure your compilers
  compilers: {
    solc: {
       version: "0.6.2",    // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      // settings: {          // See the solidity docs for advice about optimization and evmVersion
      //  optimizer: {
      //    enabled: false,
      //    runs: 200
      //  },
      //  evmVersion: "byzantium"
      // }
    },
  },

  //
};
