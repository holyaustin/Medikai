import Head from "next/head"
import { useMoralis } from "react-moralis"
import { ConnectButton, Loading } from "web3uikit"
import Header from "../components/Header"
import DoctorWorkflow from "../components/DoctorWorkflow"
import { useQuery } from "@apollo/client"
import networkMapping from "../constants/networkMapping.json"
import { GET_ADDED_DOCTORS } from "../constants/subgraphQueries"
import DoctorProfile from "../components/DoctorProfile"
import NotRegistered from "../components/NotRegistered"

export default function DoctorDashboard() {
    const { isWeb3Enabled, chainId: chainHexId, account } = useMoralis()

    const chainId = chainHexId ? parseInt(chainHexId).toString() : "31337"
    // console.log(chainId)
    const patientMedicalRecordSystemAddress =
        networkMapping[chainId].PatientMedicalRecordSystem[0]
    const {
        loading: fetchingAddedDoctors,
        error,
        data: addedDoctors,
    } = useQuery(GET_ADDED_DOCTORS)

    let doctorProfileFound = false
    let doctorAddresses
    if (!fetchingAddedDoctors && addedDoctors) {
        doctorAddresses = addedDoctors.addedDoctors.map(
            (doctor) => doctor.doctorAddress
        )
        if (doctorAddresses.includes(account)) {
            doctorProfileFound = true
        }
    }

    return (
        <div className="container mx-auto overflow-x-hidden h-screen">
            <Head>
                <title>MediChain - Doctor Dashboard</title>
                <meta
                    name="description"
                    content="MediChain - Doctor Dashboard"
                />
                <link rel="icon" href="/logo.svg" />
            </Head>
            <Header />
            <div className="container">
                <div className="py-4 px-3 font-bold text-4xl ml-12">
                    Doctor Dashboard
                    {isWeb3Enabled ? (
                        <div className="badge badge-primary ml-4">
                            Web3 is Enabled
                        </div>
                    ) : (
                        <div className="badge badge-warning ml-4">
                            Web3 Not Enabled
                        </div>
                    )}
                </div>
                <div className="mx-auto ml-12">
                    <ConnectButton moralisAuth={false} />
                </div>

                <div className="ml-10 w-4/6">
                    {isWeb3Enabled ? (
                        fetchingAddedDoctors || !addedDoctors ? (
                            <div
                                style={{
                                    backgroundColor: "#ECECFE",
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
                        ) : doctorProfileFound ? (
                            addedDoctors.addedDoctors.map((doctor) => {
                                doctorAddresses.push(doctor.doctorAddress)
                                if (doctor.doctorAddress === account) {
                                    const {
                                        name,
                                        doctorAddress,
                                        dateOfRegistration,
                                        specialization,
                                        hospitalAddress,
                                        doctorRegistrationId,
                                    } = doctor
                                    return (
                                        <div key={doctorAddress}>
                                            <DoctorProfile
                                                key={doctorAddress}
                                                name={name}
                                                doctorAddress={doctorAddress}
                                                dateOfRegistration={
                                                    dateOfRegistration
                                                }
                                                specialization={specialization}
                                                hospitalAddress={
                                                    hospitalAddress
                                                }
                                                doctorRegistrationId={
                                                    doctorRegistrationId
                                                }
                                            />
                                        </div>
                                    )
                                }
                            })
                        ) : (
                            <NotRegistered name="Doctor" />
                        )
                    ) : (
                        <div>
                            <DoctorWorkflow />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

/* 1. registered doctors can view their details. 
                        
2. Registered doctors can add diagnostic tests and diagnosis details in a particular patient's record. For this Add a Button which opens a modal form.
*/
