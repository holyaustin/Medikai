import Head from "next/head"
import { useMoralis } from "react-moralis"
import { ConnectButton, Loading } from "web3uikit"
import Header from "../components/Header"
import PatientWorkflow from "../components/PatientWorkflow"
import { useQuery } from "@apollo/client"
import networkMapping from "../constants/networkMapping.json"
import { GET_ADDED_PATIENTS } from "../constants/subgraphQueries"
import PatientProfile from "../components/PatientProfile"
import NotRegisteredPatient from "../components/NotRegisteredPatient"

export default function PatientDashboard() {
    const { isWeb3Enabled, chainId: chainHexId, account } = useMoralis()
    console.log("chainHEX ID is",chainHexId)
    const chainId = chainHexId ? parseInt(chainHexId).toString() : "31337"
    console.log("chain ID is",chainId)
    const patientMedicalRecordSystemAddress =
        networkMapping[chainId].PatientMedicalRecordSystem[0]
        console.log("networkMapping is",patientMedicalRecordSystemAddress)
    const {
        loading: fetchingAddedPatients,
        error,
        data: addedPatients,
    } = useQuery(GET_ADDED_PATIENTS)
    console.log("Past sub graphy",chainId)
    let isRegistered = false
    let patientAddresses
    if (!fetchingAddedPatients && addedPatients) {
        patientAddresses = addedPatients.addedPatients.map(
            (patient) => patient.patientAddress
        )
        if (patientAddresses.includes(account)) {
            isRegistered = true
        }
    }

    return (
        <div className="container mx-auto overflow-x-hidden h-screen">
            <Head>
                <title>Medikia - Patient Dashboard</title>
                <meta
                    name="description"
                    content="Medikia - Patient Dashboard"
                />
                <link rel="icon" href="/images/logo.png" />
            </Head>
            <Header />
            <div className="container">
                <div className="mt-10 py-4 px-3 font-bold text-4xl ml-12 text-center">
                    Patient Dashboard
                    {isWeb3Enabled ? (
                        <div className="badge badge-primary ml-5 ">
                            Web3 is Enabled
                        </div>
                    ) : (
                        <div className="badge badge-warning ml-4">
                            Web3 Not Enabled
                        </div>
                    )}
                </div>
                <div className="mx-auto ml-52 p5 text-2xl">
                    <ConnectButton moralisAuth={false} />
                </div>

                <div className="ml-10 w-4/6">
                    {isWeb3Enabled ? (
                        fetchingAddedPatients || !addedPatients ? (
                            <div
                                style={{
                                    backgroundColor: "#FFC0CB",
                                    borderRadius: "6px",
                                    padding: "15px",
                                }}
                                className="ml-10 mt-5"
                            >
                                <Loading
                                    direction="right"
                                    fontSize={14}
                                    size={16}
                                    spinnerColor="rgba(91, 96, 222, 0.8)"
                                    spinnerType="wave"
                                    text="Loading Profile..."
                                />
                            </div>
                        ) : isRegistered ? (
                            addedPatients.addedPatients.map((patient) => {
                                patientAddresses.push(patient.patientAddress)
                                if (patient.patientAddress === account) {
                                    const {
                                        name,
                                        patientAddress,
                                        dateOfRegistration,
                                        dob,
                                        phoneNumber,
                                        bloodGroup,
                                        vaccinationHash,
                                        accidentHash,
                                        chronicHash,
                                        acuteHash,
                                    } = patient
                                    return (
                                        <div key={patientAddress}>
                                            <PatientProfile
                                                key={patientAddress}
                                                name={name}
                                                patientAddress={patientAddress}
                                                dateOfRegistration={
                                                    dateOfRegistration
                                                }
                                                dob={dob}
                                                phoneNumber={phoneNumber}
                                                bloodGroup={bloodGroup}
                                                vaccinationHash={
                                                    vaccinationHash
                                                }
                                                accidentHash={accidentHash}
                                                chronicHash={chronicHash}
                                                acuteHash={acuteHash}
                                            />
                                        </div>
                                    )
                                }
                            })
                        ) : (
                            <NotRegisteredPatient account={account} />
                        )
                    ) : (
                        <div>
                            <PatientWorkflow />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

/* 1. registered patients can view their details. 
                        
2. Registered patients can add diagnostic tests and diagnosis details in a particular patient's record. For this Add a Button which opens a modal form.
*/
