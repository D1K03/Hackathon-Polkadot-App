// scripts/deploy.js
async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  // Replace 'Chat' with your contract name if different
  const Chat = await ethers.getContractFactory("Chat");
  const chat = await Chat.deploy();
  await chat.deployed();

  console.log("Chat contract deployed to:", chat.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
