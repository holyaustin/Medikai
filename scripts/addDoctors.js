const { ether, network } = require("hardhat")
const { moveBlocks } = require("../utils/move-blocks")
const Doctors = require("../initialDoctorData.json")

async function addDoctors() {
    const patientMedicalRecordSystem = await ethers.getContract("PatientMedicalRecordSystem")

    for (let i in Doctors) {
        const doctor = Doctors[i]
        console.log(doctor)
        // console.log(
        //     doctor.name,
        //     doctor.doctorRegistrationId,
        //     doctor.doctorAddress,
        //     doctor.dateOfRegistration,
        //     doctor.specialization,
        //     doctor.hospitalAddress
        // )
        
        const tx = await patientMedicalRecordSystem.addDoctorDetails(
            doctor.doctorAddress,
            doctor.name,
            doctor.doctorRegistrationId,
            doctor.dateOfRegistration,
            doctor.specialization,
            doctor.hospitalAddress
        )
        await tx.wait(1)
        console.log(`Doctor ${doctor.name} added to PatientMedicalRecordSystem`)
        if (network.config.chainId == 31337) {
            moveBlocks(2, (sleepAmount = 1000)) //1s
        }
    }
}

addDoctors()
    .then(() => process.exit(0))
    .catch((error) => {
        console.log(error)
        process.exit(1)
    })

module.exports = {addDoctors}
