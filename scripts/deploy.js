const hre = require("hardhat");
const fs = require('fs');

async function main() {
  const [deployer] = await ethers.getSigners();
  
  const Medikai = await hre.ethers.getContractFactory("Medikai");
  const medikai = await Medikai.deploy();
  console.log(
    "Deploying contracts with the account:",
    deployer.address
    );
    console.log("Account balance:", (await deployer.getBalance()).toString());
    
  await medikai.deployed();
  console.log("medikai deployed to:", medikai.address);

  fs.writeFileSync('./config.js', `
  export const medikaiAddress = "${medikai.address}"
  `)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
