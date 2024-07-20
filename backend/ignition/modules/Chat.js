const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("ChatModule", (m) => {
  const deployer = m.getAccount(0);
  const chat = m.contract("Chat", [], {
    from: deployer,
  });
  return { chat };
});
