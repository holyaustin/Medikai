import Head from "next/head"
import { useMoralis, useWeb3Contract } from "react-moralis"
import { ConnectButton, useNotification, Modal, Input } from "web3uikit"
import Header from "../components/Header"
import OwnerWorkflow from "../components/OwnerWorkflow"
import { useState } from "react"
import PatientMedicalRecordSystemAbi from "../constants/PatientMedicalRecordSystem.json"
import networkMapping from "../constants/networkMapping.json"
import dateInUnix from "../utils/dateInUnix"

export default function OwnerDashboard() {
    const dispatch = useNotification()
    const { runContractFunction } = useWeb3Contract()
    const { isWeb3Enabled, chainId: chainHexId, account } = useMoralis()
    const [isOwner, setIsOwner] = useState(false)
    const [showAddHospitalModal, setShowAddHospitalModal] = useState(false)
    const [showAddDoctorModal, setShowAddDoctorModal] = useState(false)
    const [cancelDisabled, setCancelDisabled] = useState(false)
    const [okDisabled, setOkDisabled] = useState(false)

    const [doctorAddressToAddTo, setDoctorAddressToAddTo] = useState("")
    const [doctorName, setDoctorName] = useState("")
    const [doctorRegistrationId, setDoctorRegistrationId] = useState("")
    const [doctorSpecialization, setDoctorSpecialization] = useState("")
    const [doctorHospitalAddress, setDoctorHospitalAddress] = useState("")

    const [hospitalAddressToAddTo, setHospitalAddressToAddTo] = useState("")
    const [hospitalName, setHospitalName] = useState("")
    const [hospitalRegistrationId, setHospitalRegistrationId] = useState("")
    const [hospitalEmail, setHospitalEmail] = useState("")
    const [hospitalPhoneNumber, setHospitalPhoneNumber] = useState("")

    const chainId = chainHexId ? parseInt(chainHexId).toString() : "31337"
    const medicalRecordSystemAddress =
        networkMapping[chainId].PatientMedicalRecordSystem[0]
    // const marketplaceAddress = networkMapping[chainId].NftMarketplace[0]

    // const {
    //     loading: fetchingListedNfts,
    //     data: listedNfts,
    //     error,
    // } = useQuery(GET_ACTIVE_ITEMS)

    // if (listedNfts) {
    //     console.log(listedNfts)
    // } else {
    //     console.log("listed NFT is empty")
    // }

    const { runContractFunction: getOwner } = useWeb3Contract({
        abi: PatientMedicalRecordSystemAbi,
        contractAddress: medicalRecordSystemAddress,
        functionName: "getOwner",
        params: {},
    })

    const handleVerificationClick = async () => {
        const contractOwner = await getOwner()
        // console.log(contractOwner)
        // console.log(account)
        // console.log(contractOwner === account)
        if (
            contractOwner.toString().toLowerCase() ===
            account.toString().toLowerCase()
        ) {
            dispatch({
                type: "success",
                title: "Successfully Verified",
                message:
                    "Ownership Successfully Verified. You can now perform following functions",
                position: "bottomL",
            })
            setIsOwner(true)
        } else {
            dispatch({
                type: "error",
                title: "Verification Failed",
                message: `As per our records ${contractOwner} is the owner of this smart contract.`,
                position: "bottomL",
                isClosing: false,
            })
        }
    }
    const onCloseDoctorModal = () => {
        setShowAddDoctorModal(false)
    }
    const onCloseHospitalModal = () => {
        setShowAddHospitalModal(false)
    }

    const handleAddDoctorClick = async () => {
        // console.log("Add Doctor Clicked")
        setShowAddDoctorModal(true)
    }

    const handleAddHospitalClick = async () => {
        // console.log("Add Hospital Clicked")
        setShowAddHospitalModal(true)
    }

    //Add Doctor

    const handleAddDoctorSuccess = async (tx) => {
        await tx.wait(1)
        dispatch({
            type: "success",
            title: "Transaction Successful",
            message:
                "Doctor Details Successfully Added. You can now add more doctors",
            position: "bottomL",
        })
        setShowAddDoctorModal(false)
        onCloseDoctorModal && onCloseDoctorModal() //closing the modal on success
    }

    const initiateAddDoctorTransaction = async () => {
        console.log("Initiate Add Doctor Transaction")
        setCancelDisabled(true)
        setOkDisabled(true)

        const addDoctorDetailsOptions = {
            abi: PatientMedicalRecordSystemAbi,
            contractAddress: medicalRecordSystemAddress,
            functionName: "addDoctorDetails",
            params: {
                //parameters of this function
                _doctorAddress: doctorAddressToAddTo,
                _name: doctorName,
                _doctorRegistrationId: doctorRegistrationId,
                _dateOfRegistration: dateInUnix(new Date()),
                _specialization: doctorSpecialization,
                _hospitalAddress: doctorHospitalAddress,
            },
        }

        await runContractFunction({
            params: addDoctorDetailsOptions,
            onError: (error) => {
                console.log(
                    "Error while calling registerPatient function",
                    error
                )
            },
            onSuccess: handleAddDoctorSuccess,
        })
        setCancelDisabled(false)
        setOkDisabled(false)
    }

    //Add Hospital
    const handleAddHospitalSuccess = async (tx) => {
        await tx.wait(1)
        dispatch({
            type: "success",
            title: "Transaction Successful",
            message:
                "Hospital Details Successfully Added. You can now add more hospitals",
            position: "bottomL",
        })
        setShowAddHospitalModal(false)
        onCloseHospitalModal && onCloseHospitalModal() //closing the modal on success
    }

    const initiateAddHospitalTransaction = async () => {
        console.log("Initiate Add Hospital Transaction")
        setCancelDisabled(true)
        setOkDisabled(true)

        const addHospitalDetailsOptions = {
            abi: PatientMedicalRecordSystemAbi,
            contractAddress: medicalRecordSystemAddress,
            functionName: "addHospitalDetails",
            params: {
                //parameters of this function
                _hospitalAddress: hospitalAddressToAddTo,
                _name: hospitalName,
                _hospitalRegistrationId: hospitalRegistrationId,
                _email: hospitalEmail,
                _phoneNumber: hospitalPhoneNumber,
            },
        }

        await runContractFunction({
            params: addHospitalDetailsOptions,
            onError: (error) => {
                console.log(
                    "Error while calling addHospitalDetails function: ",
                    error
                )
            },
            onSuccess: handleAddHospitalSuccess,
        })
        setCancelDisabled(false)
        setOkDisabled(false)
    }

    return (
        <div className="container mx-auto h-screen overflow-x-hidden">
            <Head>
                <title>MediChain - Owner Dashboard</title>
                <meta
                    name="description"
                    content="MediChain - Owner Dashboard"
                />
                <link rel="icon" href="/logo.svg" />
            </Head>
            <Header />
            <div className="container">
                <div>
                    <Modal
                        isVisible={showAddDoctorModal}
                        onCancel={onCloseDoctorModal}
                        onCloseButtonPressed={onCloseDoctorModal}
                        onOk={initiateAddDoctorTransaction}
                        isCancelDisabled={cancelDisabled}
                        isOkDisabled={okDisabled}
                        width="63vw"
                    >
                        <div className="mb-5">
                            <Input
                                label="Enter Doctor's account address"
                                name="Doctor Account Address"
                                type="text"
                                onChange={(event) => {
                                    setDoctorAddressToAddTo(event.target.value)
                                }}
                                width="full"
                                validation={{
                                    required: true,
                                }}
                            />
                        </div>
                        <div className="mb-5">
                            <Input
                                label="Enter Doctor's name"
                                name="Doctor Name"
                                type="text"
                                onChange={(event) => {
                                    setDoctorName(event.target.value)
                                }}
                                width="full"
                                validation={{
                                    required: true,
                                }}
                            />
                        </div>
                        <div className="mb-5">
                            <Input
                                label="Enter Doctor's Registration Id"
                                name="Doctor Registration Id"
                                type="text"
                                onChange={(event) => {
                                    setDoctorRegistrationId(event.target.value)
                                }}
                                width="full"
                                validation={{
                                    required: true,
                                }}
                            />
                        </div>
                        <div className="mb-5">
                            <Input
                                label="Enter Doctor's Specialization"
                                name="Doctor Specialization"
                                type="text"
                                onChange={(event) => {
                                    setDoctorSpecialization(event.target.value)
                                }}
                                width="full"
                                validation={{
                                    required: true,
                                }}
                            />
                        </div>
                        <div className="mb-5">
                            <Input
                                label="Enter Doctor's Hospital Account Address"
                                name="Doctor Hospital Address"
                                type="text"
                                onChange={(event) => {
                                    setDoctorHospitalAddress(event.target.value)
                                }}
                                width="full"
                                validation={{
                                    required: true,
                                }}
                            />
                        </div>
                    </Modal>

                    <Modal
                        isVisible={showAddHospitalModal}
                        onCancel={onCloseHospitalModal}
                        onCloseButtonPressed={onCloseHospitalModal}
                        onOk={initiateAddHospitalTransaction}
                        isCancelDisabled={cancelDisabled}
                        isOkDisabled={okDisabled}
                        width="63vw"
                    >
                        <div className="mb-5">
                            <Input
                                label="Enter Hospital's account address"
                                name="Hospital Account Address"
                                type="text"
                                onChange={(event) => {
                                    setHospitalAddressToAddTo(
                                        event.target.value
                                    )
                                }}
                                width="full"
                                validation={{
                                    required: true,
                                }}
                            />
                        </div>
                        <div className="mb-5">
                            <Input
                                label="Enter Hospital's name"
                                name="Hospital Name"
                                type="text"
                                onChange={(event) => {
                                    setHospitalName(event.target.value)
                                }}
                                width="full"
                                validation={{
                                    required: true,
                                }}
                            />
                        </div>
                        <div className="mb-5">
                            <Input
                                label="Enter Hospital's Registration Id"
                                name="Hospital Registration Id"
                                type="text"
                                onChange={(event) => {
                                    setHospitalRegistrationId(
                                        event.target.value
                                    )
                                }}
                                width="full"
                                validation={{
                                    required: true,
                                }}
                            />
                        </div>
                        <div className="mb-5">
                            <Input
                                label="Enter Hospital's Email"
                                name="Hospital Email"
                                type="text"
                                onChange={(event) => {
                                    setHospitalEmail(event.target.value)
                                }}
                                width="full"
                                validation={{
                                    required: true,
                                }}
                            />
                        </div>
                        <div className="mb-5">
                            <Input
                                label="Enter Hospital's Phone Number"
                                name="Hospital Phone Number"
                                type="text"
                                onChange={(event) => {
                                    setHospitalPhoneNumber(event.target.value)
                                }}
                                width="full"
                                validation={{
                                    required: true,
                                }}
                            />
                        </div>
                    </Modal>
                    <div className="py-4 px-3 font-bold text-4xl ml-12">
                        Owner Dashboard
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
                    <div className="mx-auto ml-12 w-3/4">
                        {isWeb3Enabled ? (
                            isOwner ? (
                                <div className="mt-16 text-center">
                                    <button
                                        className="btn btn-primary mr-5"
                                        onClick={handleAddDoctorClick}
                                    >
                                        Add a Doctor
                                    </button>
                                    <button
                                        className="btn btn-secondary mr-5"
                                        onClick={handleAddHospitalClick}
                                    >
                                        Add a Hospital
                                    </button>
                                </div>
                            ) : (
                                <div className="text-center mt-16">
                                    <button
                                        className="btn mr-5"
                                        onClick={handleVerificationClick}
                                    >
                                        Verify Ownership
                                    </button>
                                    <button className="btn">
                                        <a
                                            href={`https://goerli.etherscan.io/address/${medicalRecordSystemAddress}`}
                                            target="_blank"
                                        >
                                            View on Etherscan
                                        </a>
                                    </button>
                                </div>
                            )
                        ) : (
                            <div>
                                <OwnerWorkflow />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

/* 
                        1. Possibly show the list of all the doctors registered in the system. (show the list of details of all the doctors)
                        2. Possibly show the list of all the hospitals registered in the system. (show the list of details of all the hospitals)
                          */
