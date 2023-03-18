import truncatStr from "../utils/truncateString"
import timestampToDate from "../utils/timestampToDate"
import { useState } from "react"
import ListMedicalFiles from "./ListMedicalFiles"
import { Modal, Input, useNotification } from "web3uikit"
import NodeRSA from "node-rsa"

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export default function PatientProfile({
    name,
    patientAddress,
    dob,
    phoneNumber,
    bloodGroup,
    dateOfRegistration,
    //arrays of encrypted IPFS file metadatas.
    vaccinationHash,
    accidentHash,
    chronicHash,
    acuteHash,
}) {
    const dispatch = useNotification()
    const [privateKey, setPrivateKey] = useState("")
    const [showModal, setShowModal] = useState(false)
    const [showFiles, setShowFiles] = useState(false)
    const [haveVaccinationFile, setHaveVaccinationFile] = useState(
        vaccinationHash && Boolean(vaccinationHash.length)
    )
    const [haveChronicFile, setHaveChronicFile] = useState(
        chronicHash && Boolean(chronicHash.length)
    )
    const [haveAccidentFile, setHaveAccidentFile] = useState(
        accidentHash && Boolean(accidentHash.length)
    )
    const [haveAcuteFile, setHaveAcuteFile] = useState(
        acuteHash && Boolean(acuteHash.length)
    )
    const [iscorrectlyDecrypted, setIsCorrectlyDecrypted] = useState(true)
    const [showErrorModal, setShowErrorModal] = useState(!iscorrectlyDecrypted)

    const handleClick = () => {
        setShowModal(true)
    }

    const onClose = () => {
        setShowErrorModal(false)
        setShowFiles(false)
    }
    const decryptHash = (encryptedHash) => {
        // console.log(encryptedHash)
        const key_private = new NodeRSA(privateKey)
        const decryptedHash = key_private.decrypt(encryptedHash, "utf8")
        // console.log(decryptedHash)
        return decryptedHash
    }

    const [decryptedVaccinationHash, setDecryptedVaccinationHash] = useState([])
    const [decryptedChronicHash, setDecryptedChronicHash] = useState([])
    const [decryptedAccidentHash, setDecryptedAccidentHash] = useState([])
    const [decryptedAcuteHash, setDecryptedAcuteHash] = useState([])

    const handleOkPressed = () => {
        //decrypting the IPFS hashes and storing decrypted IPFS file metadatas in the same array
        // console.log("Encrypted vaccinationHash popo:", vaccinationHash)
        try {
            haveVaccinationFile &&
                setDecryptedVaccinationHash(
                    vaccinationHash.map((encryptedHash) => {
                        return decryptHash(encryptedHash)
                    })
                )

            haveAccidentFile &&
                setDecryptedAccidentHash(
                    accidentHash.map((encryptedHash) => {
                        return decryptHash(encryptedHash)
                    })
                )

            haveChronicFile &&
                setDecryptedChronicHash(
                    chronicHash.map((encryptedHash) => {
                        return decryptHash(encryptedHash)
                    })
                )
            haveAcuteFile &&
                setDecryptedAcuteHash(
                    acuteHash.map((encryptedHash) => {
                        return decryptHash(encryptedHash)
                    })
                )
            // console.log("decryptedVaccinationHash:", decryptedVaccinationHash)
        } catch (e) {
            console.log(e)
            setIsCorrectlyDecrypted(false)
            setShowErrorModal(true)
            setShowModal(false)
        }
        //If it has no files in any category
        if (
            !(
                haveAccidentFile ||
                haveChronicFile ||
                haveAcuteFile ||
                haveVaccinationFile
            )
        ) {
            dispatch({
                type: "warning",
                title: "No Files Found",
                message: "You don't have any medical file in the database yet!",
                position: "bottomL",
            })
            showModal && setShowModal(false)
            return
        } else {
            dispatch({
                type: "success",
                title: "File Decryption Process Over",
                position: "bottomL",
            })
            setShowFiles(true)
            setShowModal(false)
            console.log("Files Encryption was Successful")
        }
    }
    // console.log("Decrypted Vaccination Hash: ", decryptedVaccinationHash)

    return (
        <div>
            <div>
                <div>
                    <Modal
                        isVisible={showModal}
                        onCancel={() => {
                            setPrivateKey("")
                            setShowModal(false)
                        }}
                        onCloseButtonPressed={() => {
                            setPrivateKey("")
                            setShowModal(false)
                        }}
                        onOk={handleOkPressed}
                        isOkDisabled={!Boolean(privateKey)}
                    >
                        <div className="mt-b mb-8">
                            <div className="mb-5 mt-3">
                                <span className="font-semibold">
                                    Important:
                                </span>
                                Copy-Paste your Private Key from the text file
                                downloaded while registering to the system. We
                                will not store it and only use to decrypt the
                                IPFS hashes locally.
                            </div>
                            <Input
                                label="Enter your private key here"
                                name="Patient Private Key"
                                autoFocus={true}
                                type="password"
                                width="full"
                                onChange={(event) => {
                                    setPrivateKey(event.target.value)
                                }}
                                validation={{
                                    required: true,
                                }}
                            />
                        </div>
                    </Modal>
                </div>
                <div className="md:w-fit md:mx-auto w-full mx-auto bg-sky-200 bg-opacity-80 mt-10 p-5 rounded-lg hover:bg-opacity-100">
                    <div className="card p-4 hover">
                        <div className="mb-1">
                            <span>
                                <span className="font-sans md:text-xl font-medium hover:underline">
                                    Name
                                </span>
                                :{" "}
                                <span className="font-serif md:text-xl font-normal">
                                    {name}
                                </span>
                            </span>
                            <span className="badge badge-warning ml-5 md:p-2.5">
                                {bloodGroup}
                            </span>
                        </div>
                        <div className="mb-1">
                            <span className="font-sans md:text-xl font-medium hover:underline">
                                Patient Account Address
                            </span>
                            :{" "}
                            <a
                                className="badge ml-3 md:p-2 px-4"
                                title="view on etherscan"
                                target="_blank"
                                href={
                                    "https://goerli.etherscan.io/address/" +
                                    patientAddress
                                }
                            >
                                {truncatStr(patientAddress, 20)}
                            </a>
                        </div>
                        <div className="mb-1">
                            <span className="font-sans md:text-xl font-medium hover:underline">
                                Date of Birth
                            </span>
                            :{" "}
                            <a className="badge badge-success ml-3 md:p-2 px-4">
                                {timestampToDate(dob)}
                            </a>
                        </div>
                        <div className="mb-1">
                            <span className="font-sans md:text-xl font-medium hover:underline">
                                Date of Registration
                            </span>
                            :{" "}
                            <a className="badge badge-accent ml-3 md:p-2 px-4">
                                {timestampToDate(dateOfRegistration)}
                            </a>
                        </div>
                        {/* <div>
                            <span className="font-sans md:text-xl font-medium hover:underline">
                                Phone Number
                            </span>
                            :{" "}
                            <span className="badge badge-warning badge-accent">
                                {phoneNumber}
                            </span>
                        </div> */}
                    </div>
                </div>
                <div>
                    {!showFiles ? (
                        <div className="text-center">
                            <button
                                className="btn btn-primary btn-md mt-8"
                                onClick={handleClick}
                            >
                                View Medical Files
                            </button>
                        </div>
                    ) : iscorrectlyDecrypted ? (
                        <div>
                            <ListMedicalFiles
                                vaccinationHash={[...decryptedVaccinationHash]}
                                acuteHash={[...decryptedAcuteHash]}
                                accidentHash={[...decryptedAccidentHash]}
                                chronicHash={[...decryptedChronicHash]}
                            />
                        </div>
                    ) : (
                        <div>
                            <Modal
                                isVisible={showErrorModal}
                                okText="close"
                                onCancel={onClose}
                                onCloseButtonPressed={onClose}
                                onOk={onClose}
                                title="Decryption Failed"
                            >
                                <p
                                    style={{
                                        fontWeight: 600,
                                        marginRight: "1em",
                                        textAlign: "center",
                                    }}
                                >
                                    File Decryption Unsucccessful due to
                                    Incorrect Private Key
                                </p>
                            </Modal>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
