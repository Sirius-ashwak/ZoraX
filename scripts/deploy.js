const { ethers } = require("hardhat");

async function main() {
  console.log("Deploying CredVault contract...");

  const CredVault = await ethers.getContractFactory("CredVault");
  const credVault = await CredVault.deploy();

  await credVault.deployed();

  console.log("CredVault deployed to:", credVault.address);
  
  // Verify contract on Etherscan
  if (network.name !== "hardhat") {
    console.log("Waiting for block confirmations...");
    await credVault.deployTransaction.wait(6);
    
    console.log("Verifying contract...");
    try {
      await hre.run("verify:verify", {
        address: credVault.address,
        constructorArguments: [],
      });
    } catch (e) {
      console.log("Verification failed:", e.message);
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });