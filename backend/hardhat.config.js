require("@nomicfoundation/hardhat-ethers");
require("@nomicfoundation/hardhat-ignition-ethers");
const privateKey =
  "ffbdcaed1bc62153616847e0d3ccca02a2d3401864c7463e9c38adcdf4fb8f41";
module.exports = {
  solidity: "0.8.24",
  networks: {
    moonbase: {
      url: "https://rpc.api.moonbase.moonbeam.network",
      chainId: 1287,
      accounts: [privateKey],
    },
  },
};
