const { ether, network } = require("hardhat")
const { moveBlocks } = require("../utils/move-blocks")
const patientDetails = require("../addPatientDetails.json")

async function addPatientDetails() {
    const patientMedicalRecordSystem = await ethers.getContract("PatientMedicalRecordSystem")

    for (let i in patientDetails) {
        const patientDetail = patientDetails[i]
        console.log(patientDetail)

        const tx = await patientMedicalRecordSystem.addPatientDetails(
            patientDetail.patientAddress,
            patientDetail.category,
            patientDetail.IpfsHash, {
                gasLimit: 3e7
            }
        )
        await tx.wait(1)
        console.log(`Patient Details added to PatientMedicalRecordSystem`)

        if (network.config.chainId == 31337) {
            moveBlocks(2, (sleepAmount = 1000)) //1s
        }
    }
}

addPatientDetails()
    .then(() => process.exit(0))
    .catch((error) => {
        console.log(error)
        process.exit(1)
    })

module.exports = { addPatientDetails }
