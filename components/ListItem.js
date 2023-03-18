//Here we make a call to the URI and fetch data and display each data as a card.

import useSWR from "swr"
import truncatStr from "../utils/truncateString"
import { Loading, Modal } from "web3uikit"
import QRCODE from "qrcode"
import { useState } from "react"

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function ListItem({ metadataURI }) {
    const [visible, setVisible] = useState(false)
    const [source, setSource] = useState("")

    //Here fetching the metadata
    // console.log("Metadata URI from the ListItem component", metadataURI)
    const { data, error } = useSWR(
        `https://ipfs.io/ipfs/${metadataURI}`,
        fetcher
    )

    if (error) {
        console.log("Error while fetching file metadata: ", error)
        return <div>Failed to Load...Reloading the page might help.</div>
    }

    if (!data) {
        return (
            <div>
                <div
                    style={{
                        backgroundColor: "#ECECFC",
                        borderRadius: "8px",
                        padding: "20px",
                    }}
                >
                    <Loading size={40} spinnerColor="#2E7DAF" />
                </div>
            </div>
        )
    }

    if (data) {
        const onClose = () => {
            setVisible(false)
        }

        const handleQRCode = () => {
            QRCODE.toDataURL(`http://ipfs.io/ipfs/${data.fileIpfsHash}`).then(
                (response) => {
                    setSource(response)
                }
            )
            setVisible(true)
        }
        // console.log(data)
        return (
            <div>
                <div className="mt-2 mb-3">
                    <div className="card w-3/4 bg-info text-primary-content mx-auto">
                        <div className="card-body">
                            <h2 className="card-title" title="file name">
                                <span className="hover:underline text-sm md:text-lg text-zinc-900">
                                    {data.name}
                                </span>
                            </h2>
                            <p>
                                <span className="font-semibold hover:underline  text-zinc-900">
                                    Date of Upload:
                                </span>{" "}
                                {data.dateOfUpload.slice(0, 10)}
                            </p>
                            <p>
                                <span className="font-semibold hover:underline text-zinc-900">
                                    File URI:
                                </span>{" "}
                                <span className="hidden md:inline-block badge ml-4">
                                    {truncatStr(data.fileIpfsHash, 40)}
                                </span>
                                <span className="inline-block md:hidden badge ml-4">
                                    {truncatStr(data.fileIpfsHash, 15)}
                                </span>
                            </p>
                            {data.doctorAddress ? (
                                <p>
                                    <span className="font-semibold hover:underline  text-zinc-900">
                                        Doctor Address:
                                    </span>
                                    <a
                                        className="inline-block badge pb-3 ml-4 badge-warning"
                                        href={`https://goerli.etherscan.io/address/${data.doctorAddress}`}
                                        target="_blank"
                                    >
                                        {data.doctorAddress}
                                    </a>
                                    <a
                                        className="inline-block md:hidden badge ml-4 badge-warning"
                                        href={`https://goerli.etherscan.io/address/${data.doctorAddress}`}
                                        target="_blank"
                                    >
                                        {truncatStr(data.doctorAddress, 15)}
                                    </a>
                                </p>
                            ) : (
                                <></>
                            )}
                            <div className="card-actions justify-around mt-3">
                                <button className="btn btn-primary btn-sm">
                                    <a
                                        href={`https://ipfs.io/ipfs/${data.fileIpfsHash}`}
                                        target="_blank"
                                    >
                                        View File
                                    </a>
                                </button>
                                <button
                                    className="btn btn-secondary btn-sm"
                                    onClick={handleQRCode}
                                >
                                    Show QR Code
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <Modal
                        okText="Done"
                        onCancel={onClose}
                        onCloseButtonPressed={onClose}
                        onOk={onClose}
                        title="Scan QR Code to View File"
                        isVisible={visible}
                        width="50vw"
                    >
                        <p
                            style={{
                                fontWeight: 600,
                                marginRight: "1em",
                                textAlign: "center",
                            }}
                        >
                            <div className="md:ml-48">
                                <img src={source} alt="QR Code" />
                            </div>
                        </p>
                    </Modal>
                </div>
            </div>
        )
    }
}
