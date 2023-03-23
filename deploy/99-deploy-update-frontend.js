const { ethers, network } = require("hardhat")
const fs = require("fs")

const frontEndContractsFile =
    "../summer-project-nextjs/constants/networkMapping.json"
const frontEndAbiLocation = "../summer-project-nextjs/constants/"

module.exports = async function () {
    if (process.env.UPDATE_FRONT_END == "true") {
        console.log("Updating frontend...")
        await updateContractAddresses()
        await updateAbi()
    }
}

async function updateAbi() {
    const patientMedicalRecordSystem = await ethers.getContract("PatientMedicalRecordSystem")
    fs.writeFileSync(
        `${frontEndAbiLocation}PatientMedicalRecordSystem.json`,
        patientMedicalRecordSystem.interface.format(ethers.utils.FormatTypes.json)
    )
}

async function updateContractAddresses() {
    const patientMedicalRecordSystem = await ethers.getContract("PatientMedicalRecordSystem")
    const chainId = network.config.chainId
    const contractAddress = JSON.parse(
        fs.readFileSync(frontEndContractsFile, "utf8")
    )
    if (chainId in contractAddress) {
        if (
            !contractAddress[chainId]["PatientMedicalRecordSystem"].includes(
                patientMedicalRecordSystem.address
            )
        ) {
            contractAddress[chainId]["PatientMedicalRecordSystem"].push(
                patientMedicalRecordSystem.address
            )
        }
    } else {
        contractAddress[chainId] = { PatientMedicalRecordSystem: [patientMedicalRecordSystem.address] }
    }
    fs.writeFileSync(frontEndContractsFile, JSON.stringify(contractAddress))
}

module.exports.tags = ["all", "frontend"]
