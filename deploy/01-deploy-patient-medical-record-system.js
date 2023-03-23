const { network } = require("hardhat")
const { developmentChains, VERIFICATION_BLOCK_CONFIRMATIONS} = require("../helper-hardhat-config")
const { verify } = require("../util/verify")

module.exports = async function ({ getNamedAccounts, deployments }) {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const waitBlockConfirmations = developmentChains.includes(network.name)
        ? 1
        : VERIFICATION_BLOCK_CONFIRMATIONS
    console.log(`The block confirmations required is: ${waitBlockConfirmations}`)
    log("----------------------------------------")
    const patientMedicalRecordSystem = await deploy("PatientMedicalRecordSystem", {
        from: deployer,
        args: [],
        log: true,
        waitConfirmations: waitBlockConfirmations,
    })
    log("----------------------------------------")
    log(`PatientMedicalRecordSystem contract deployed at: ${patientMedicalRecordSystem.address}`)

    //verifying the contract
    //verifying the contract on goerli.etherscan.io
    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        log("verifying...")
        await verify(patientMedicalRecordSystem.address, [])
        log("Contract Verified on Etherscan...")
    }
}

module.exports.tags = ["all", "patientMedicalRecordSystem", "main"]
