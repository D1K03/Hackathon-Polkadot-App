const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const Chat = await hre.ethers.getContractFactory("Chat");
  const chat = await Chat.deploy();

  console.log("Deploying contract...");
  await chat.waitForDeployment();
  const addr = await chat.getAddress();
  console.log("Chat contract deployed to:", addr);
}

main().catch((error) => {
  console.error("Error deploying contract:", error);
  process.exitCode = 1;
});
