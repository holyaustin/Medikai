const { assert, expect } = require("chai")
const { network, deployments, getNamedAccounts, ethers } = require("hardhat")
const { developmentChains, CATEGORY, IPFS_HASH } = require("../../helper-hardhat-config")
const Patient = require("../../initialPatientInformation.json")
const Doctor = require("../../initialDoctorData.json")

const patient1 = Patient[0]
const doctor1 = Doctor[0]

!developmentChains.includes(network.name)
    ? describe.skip
    : describe("Patient Medical Record System Unit Tests", function () {
          let patientMedicalRecordSystem, patientMedicalRecordSystemContract
          before(async function () {
              accounts = await ethers.getSigners() // could also do with getNamedAccounts
              deployer = accounts[0]
              doctor = accounts[5] //this is the first doctor account
              await deployments.fixture(["all"])
              patientMedicalRecordSystemContract = await ethers.getContract(
                  "PatientMedicalRecordSystem"
              )
              patientMedicalRecordSystem = await patientMedicalRecordSystemContract.connect(
                  deployer
              )
          })

          describe("registerPatient", function () {
              it("should emit an event after registering a patient", async function () {
                  expect(
                      await patientMedicalRecordSystem.registerPatient(
                          patient1.patientAddress,
                          patient1.name,
                          patient1.profilePicture,
                          patient1.dob,
                          patient1.phoneNumber,
                          patient1.bloodGroup
                      )
                  ).to.emit("patientsDetailsModified")
              })
          })

          //doctor adds the patient diagnostic details
          describe("addPatientDetails", function () {
              it("reverts when a non doctor tries to add data", async function () {
                  await patientMedicalRecordSystem.registerPatient(
                      patient1.patientAddress,
                      patient1.name,
                      patient1.profilePicture,
                      patient1.dob,
                      patient1.phoneNumber,
                      patient1.bloodGroup
                  )

                  patientMedicalRecordSystemDoctor =
                      await patientMedicalRecordSystemContract.connect(doctor)
                  await expect(
                      patientMedicalRecordSystemDoctor.addPatientDetails(
                          patient1.patientAddress,
                          CATEGORY,
                          IPFS_HASH
                      )
                  ).to.be.revertedWith("PatientMedicalRecords__NotDoctor")
              })
          })
      })
