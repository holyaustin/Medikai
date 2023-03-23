const hre = require("hardhat");
const fs = require('fs');

async function main() {
  const Medikai = await hre.ethers.getContractFactory("Medikai");
  const medikai = await Medikai.deploy();
  console.log("Deploying smart Contract ...");
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
