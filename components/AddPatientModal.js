import { useState } from "react"
import { useMoralis, useWeb3Contract } from "react-moralis"
import { Modal, Input, Select, useNotification } from "web3uikit"
import networkMapping from "../constants/networkMapping.json"
import PatientMedicalRecordSystemAbi from "../constants/PatientMedicalRecordSystem.json"
import { GET_PUBLIC_KEYS } from "../constants/subgraphQueries"
import { useQuery } from "@apollo/client"
import NodeRSA from "node-rsa"
import * as IPFS from "ipfs-core"


export default function AddPatientModal({ isVisible, onClose }) {
    const dispatch = useNotification()
    const { runContractFunction } = useWeb3Contract()
    const [patientAddressToAddTo, setPatientAddressToAddTo] = useState("")
    const [category, setCategory] = useState(3)
    const [file, setFile] = useState(null)
    const [fileName, setFileName] = useState("")
    const [cancelDisabled, setCancelDisabled] = useState(false)
    const [okDisabled, setOkDisabled] = useState(false)

    const { chainId: chainHexId, account } = useMoralis()
    // console.log(chainId)
    const chainId = chainHexId ? parseInt(chainHexId).toString() : "31337"
    const medicalRecordSystemAddress =
        networkMapping[chainId].PatientMedicalRecordSystem[0]

    // console.log(medicalRecordSystemAddress)
    const {
        loading: fetchingAddedPublicKeys,
        error,
        data: addedPublicKeys,
    } = useQuery(GET_PUBLIC_KEYS)

    const handleAddedPatientDetailsSuccess = async (tx) => {
        await tx.wait(1)
        dispatch({
            type: "success",
            title: "Transaction Successful",
            message:
                "Patient Report added Successfully to the blockchain network",
            position: "bottomL",
        })
        onClose && onClose() //closing the modal on success
    }

    const convertCategoryToInt = (category) => {
        if (category === "vaccination") {
            return 0
        } else if (category === "accidental") {
            return 1
        } else if (category === "chronic") {
            return 2
        } else if (category === "acute") {
            return 3
        } else {
            return 3 //by default it is trefated as acute.
        }
    }

    const initiateAddPatientDetailsTransaction = async () => {
        //Getting the parameters for the transaction
        //we have patientAddress, category and file.
        //we need to encrypt the file and upload the encrypted file to ipfs and get the hash.

        setOkDisabled(true)
        setCancelDisabled(true)

        // console.log("inside function patient Publick key:", addedPublicKeys)
        let patientPublicKey
        if (!fetchingAddedPublicKeys && addedPublicKeys) {
            for (let item of addedPublicKeys.addedPublicKeys) {
                if (
                    item.patientAddress.toString().toLowerCase() ==
                    patientAddressToAddTo.toString().toLocaleLowerCase()
                ) {
                    patientPublicKey = item.publicKey
                }
            } //handle the case where the addresses doesnot match
        }
        // console.log('inside function : ', patientPublicKey)
        // console.log(category)

        //uploading file to ipfs
        let fileIpfsHash
        try {
            const client = await IPFS.create({repo: 'ok' + Math.random()})
            const {cid} = (await client.add(file))
            fileIpfsHash = cid.toString()
        } catch (e) {
            console.log("IPFS Upload Error", e)
        }

        const fileMetadata = {
            name: fileName,
            dateOfUpload: new Date(),
            fileIpfsHash: fileIpfsHash,
            doctorAddress: account,
        }

        // console.log("fileMetadata", fileMetadata)

        //uploading the fileMetadata to IPFS
        let IpfsHash
        try {
            const client = await IPFS.create({repo: 'ok' + Math.random()})
            const {cid} = (await client.add(JSON.stringify(fileMetadata)))
            IpfsHash = cid.toString()

        } catch (e) {
            console.log(e)
        }

        // console.log("fileMetadata Hash: ", IpfsHash)     ///-------------
        // console.log("Link: ", `ipfs.infura.io/ipfs/${IpfsHash}`)

        //encrypting the fileMetadata using the public key of the patient
        // console.log("patientPublicKey: ", patientPublicKey)   ///---------
        const publicKeyPatient = new NodeRSA(patientPublicKey)
        const encryptedIpfsHash = publicKeyPatient.encrypt(IpfsHash, "base64")

        console.log("encrypted IPFS hash: ", encryptedIpfsHash)

        dispatch({
            type: "success",
            title: "IPFS Upload Successful!",
            message:
                "Patient Medical Report Added to IPFS network successfully!",
            position: "bottomL",
        })

        // console.log(patientAddressToAddTo)
        // console.log(category)
        // console.log(encryptedIpfsHash)

        const addPatientDetailsOptions = {
            abi: PatientMedicalRecordSystemAbi,
            contractAddress: medicalRecordSystemAddress,
            functionName: "addPatientDetails",
            params: {
                _patientAddress: patientAddressToAddTo, //Input by the doctor
                _category: category.toString(), //This will be chosen by the doctor
                _IpfsHash: encryptedIpfsHash, //This will be the encrypted IpfsHash of the file Metadata of the file uploaded by the doctor.
                options: { gasLimit: 3e6 },
            },
        }

        // //Actually calling the function. [This is where the transaction initiation actually begins].

        await runContractFunction({
            params: addPatientDetailsOptions,
            onError: (error) => {
                console.log(
                    "Error while calling addPatientDetails function: ",
                    error
                )
            },
            onSuccess: handleAddedPatientDetailsSuccess,
        })

        setOkDisabled(false)
        setCancelDisabled(false)
    }

    // console.log('public keys:', fetchingAddedPublicKeys? "null" : addedPublicKeys.addedPublicKeys[0].publicKey)

    return (
        <Modal
            isVisible={isVisible}
            onCancel={onClose}
            onCloseButtonPressed={onClose}
            onOk={initiateAddPatientDetailsTransaction}
            isCancelDisabled={cancelDisabled}
            isOkDisabled={okDisabled}
        >
            <div className="mb-5">
                <Input
                    label="Enter Patient's account address"
                    name="Patient Account Address"
                    type="text"
                    onChange={(event) => {
                        setPatientAddressToAddTo(event.target.value)
                    }}
                />
            </div>

            <div className="gap-2">
                <Select
                    label="Choose Category"
                    onChange={(option) => {
                        setCategory(convertCategoryToInt(option.id))
                    }}
                    options={[
                        {
                            id: "vaccination",
                            label: "Vaccination",
                        },
                        {
                            id: "accidental",
                            label: "Accidental",
                        },
                        {
                            id: "chronic",
                            label: "Chronic",
                        },
                        {
                            id: "acute",
                            label: "Acute",
                        },
                    ]}
                    validation={{
                        required: true,
                    }}
                />
            </div>

            <div className="mt-3 mb-3">
                <label
                    className="block mb-2 text-md text-gray-600 dark:text-gray-300 font-semibold ml-1"
                    htmlFor="file_input"
                >
                    Upload file
                </label>

                <input
                    className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    aria-describedby="file_input_help"
                    id="file_input"
                    type="file"
                    onChange={(event) => {
                        setFile(event.target.files[0])
                    }}
                />
                <p
                    className="mt-1 text-sm text-gray-500 dark:text-gray-300"
                    id="file_input_help"
                >
                    Upload the Patient Report to be encrypted and stored on the
                    blockchain.
                </p>
                <div className="mt-5 mb-5">
                    <Input
                        label="Enter the file name"
                        name="File Name"
                        type="text"
                        onChange={(event) => {
                            setFileName(event.target.value)
                        }}
                    />
                </div>
            </div>
        </Modal>
    )
}
