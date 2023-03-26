//This is the Dashboard of the hospital. This logs in the hospital and hospital can view their information.
//This is just a add-on / redundant page. Just entity was coming up so I made this new page.

import Head from "next/head"
import { useMoralis } from "react-moralis"
import networkMapping from "../constants/networkMapping.json"
import { useQuery } from "@apollo/client"
import { ConnectButton, Loading } from "web3uikit"
import Header from "../components/Header"
import HospitalWorkflow from "../components/HospitalWorkflow"
import { GET_ADDED_HOSPITALS } from "../constants/subgraphQueries"
import HospitalProfile from "../components/HospitalProfile"
import NotRegistered from "../components/NotRegistered"

export default function HospitalDashboard() {
    const { isWeb3Enabled, chainId: chainHexId, account } = useMoralis()
    const chainId = chainHexId ? parseInt(chainHexId).toString() : "31337"
    console.log(chainId)
    const patientMedicalRecordSystemAddress =
        networkMapping[chainId].PatientMedicalRecordSystem[-1]
    const {
        loading: fetchingAddedHospitals,
        error,
        data: addedHospitals,
    } = useQuery(GET_ADDED_HOSPITALS)

    // if (!fetchingAddedHospitals && addedHospitals) {
    //     console.log(addedHospitals)
    // }

    let hospitalProfileFound = false
    let hospitalAddresses
    if (!fetchingAddedHospitals && addedHospitals) {
        hospitalAddresses = addedHospitals.addedHospitals.map(
            (hospital) => hospital.hospitalAddress
        )
        if (hospitalAddresses.includes(account)) {
            hospitalProfileFound = true
        }
    }

    return (
        <div className="container mx-auto  overflow-x-hidden h-screen">
            <Head>
                <title>Medikai - Hospital Dashboard</title>
                <meta
                    name="description"
                    content="Medikai - Hospital Dashboard"
                />
                <link rel="icon" href="/logo.svg" />
            </Head>
            <Header />
            <div className="container">
                <div className="py-4 px-3 font-bold text-4xl ml-12">
                    Hospital Dashboard
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
                        fetchingAddedHospitals || !addedHospitals ? (
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
                        ) : hospitalProfileFound ? (
                            addedHospitals.addedHospitals.map((hospital) => {
                                hospitalAddresses.push(hospital.hospitalAddress)
                                if (hospital.hospitalAddress === account) {
                                    const {
                                        name,
                                        hospitalAddress,
                                        email,
                                        phoneNumber,
                                        hospitalRegistrationId,
                                        dateOfRegistration,
                                    } = hospital
                                    return (
                                        <div key={hospitalAddress}>
                                            <HospitalProfile
                                                key={hospitalAddress}
                                                name={name}
                                                hospitalAddress={
                                                    hospitalAddress
                                                }
                                                email={email}
                                                phoneNumber={phoneNumber}
                                                hospitalRegistrationId={
                                                    hospitalRegistrationId
                                                }
                                                dateOfRegistration={
                                                    dateOfRegistration
                                                }
                                            />
                                        </div>
                                    )
                                }
                            })
                        ) : (
                            <NotRegistered name="Hospital" />
                        )
                    ) : (
                        <div>
                            <HospitalWorkflow />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
