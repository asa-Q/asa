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
      from: "0x0c4079C10953225DD8d215CE17c7efbD2fC16acD"
    },
    test: {
      host: "127.0.0.1",
//      port: 7545,
      port: 8545,
      network_id: "*"
    }
  }
  //
};
