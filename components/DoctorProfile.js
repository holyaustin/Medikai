import truncatStr from "../utils/truncateString"
import timestampToDate from "../utils/timestampToDate"
import { useState } from "react"
import AddPatientModal from "./AddPatientModal"

export default function DoctorProfile({
    name,
    doctorAddress,
    hospitalAddress,
    specialization,
    dateOfRegistration,
    doctorRegistrationId,
}) {
    const [showModal, setShowModal] = useState(false)

    const handleButtonClick = () => {
        // show the modal
        setShowModal(true)
    }

    // console.log(showModal)
    return (
        <div>
            <div>
                <AddPatientModal
                    isVisible={showModal}
                    onClose={() => {
                        setShowModal(false)
                    }}
                />
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
                                {specialization}
                            </span>
                        </div>
                        <div className="mb-1">
                            <span className="font-sans md:text-xl font-medium hover:underline">
                                Doctor Registration Id
                            </span>
                            :{" "}
                            <a className="badge badge-success ml-3 md:p-2 px-4">
                                {doctorRegistrationId}
                            </a>
                        </div>
                        <div className="mb-1">
                            <span className="font-sans md:text-xl font-medium hover:underline">
                                Doctor Account Address
                            </span>
                            :{" "}
                            <a
                                className="badge ml-3 md:p-2 px-4"
                                title="view on etherscan"
                                target="_blank"
                                href={
                                    "https://goerli.etherscan.io/address/" +
                                    doctorAddress
                                }
                            >
                                {truncatStr(doctorAddress, 25)}
                            </a>
                        </div>
                        <div className="mb-1">
                            <span className="font-sans md:text-xl font-medium hover:underline">
                                Hospital Account Address
                            </span>
                            :{" "}
                            <a
                                className="badge ml-3 md:p-2 px-4"
                                title="view on etherscan"
                                target="_blank"
                                href={
                                    "https://goerli.etherscan.io/address/" +
                                    hospitalAddress
                                }
                            >
                                {truncatStr(hospitalAddress, 20)}
                            </a>
                        </div>
                        <div>
                            <span className="font-sans md:text-xl font-medium hover:underline">
                                Registered on (system)
                            </span>
                            :{" "}
                            <span className="badge badge-accent">
                                {timestampToDate(dateOfRegistration)}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-center">
                <button
                    className="btn btn-primary mt-10 btn-md"
                    onClick={handleButtonClick}
                >
                    Add Patient Data
                </button>
            </div>
        </div>
    )
}
