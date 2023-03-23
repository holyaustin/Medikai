const { ether, network } = require("hardhat")
const { moveBlocks } = require("../utils/move-blocks")
const Hospitals = require("../initialHospitalData.json")

async function addHospitals() {
    const patientMedicalRecordSystem = await ethers.getContract("PatientMedicalRecordSystem")

    for (let i in Hospitals) {
        const hospital = Hospitals[i]
        console.log(hospital)
        const tx = await patientMedicalRecordSystem.addHospitalDetails(
            hospital.hospitalAddress,
            hospital.name,
            hospital.hospitalRegistrationId,
            hospital.email,
            hospital.phone
        )
        await tx.wait(1)
        console.log(`Hospital ${hospital.name} added to PatientMedicalRecordSystem`)
        if (network.config.chainId == 31337) {
            moveBlocks(2, (sleepAmount = 1000)) //1s
        }
    }
}

addHospitals()
    .then(() => process.exit(0))
    .catch((error) => {
        console.log(error)
        process.exit(1)
    })
