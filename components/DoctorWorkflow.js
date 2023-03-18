//This is a component representing the workflow of Doctor in the system.
//This explains how Doctor can interact with the system.

export default function PatientWorkflow() {
    return (
        <section className="text-gray-600 body-font">
            <div className="container px-5 py-24 mx-auto">
                <div className="flex items-center lg:w-3/5 mx-auto border-b pb-10 mb-10 border-gray-200 sm:flex-row flex-col">
                    <div className="sm:w-32 sm:h-32 h-20 w-20 sm:mr-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 flex-shrink-0">
                        <svg
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            className="sm:w-16 sm:h-16 w-10 h-10"
                            viewBox="0 0 24 24"
                        >
                            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                    </div>
                    <div className="flex-grow sm:text-left text-center mt-6 sm:mt-0">
                        <h2 className="text-gray-900 text-lg title-font font-medium mb-2">
                            View Details
                        </h2>
                        <p className="leading-relaxed text-base">
                            Each doctor registered in the system by the "Owner"
                            can view his/her details. These details are
                            basically the profile information of the doctor.
                        </p>
                    </div>
                </div>
                <div className="flex items-center lg:w-3/5 mx-auto sm:flex-row flex-col">
                    <div className="sm:w-32 sm:h-32 h-20 w-20 sm:mr-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 flex-shrink-0">
                        <svg
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            className="sm:w-16 sm:h-16 w-10 h-10"
                            viewBox="0 0 24 24"
                        >
                            <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                        </svg>
                    </div>
                    <div className="flex-grow sm:text-left text-center mt-6 sm:mt-0">
                        <h2 className="text-gray-900 text-lg title-font font-medium mb-2">
                            Add Patient's Medical Records
                        </h2>
                        <p className="leading-relaxed text-base">
                            A registered doctor can add medical records of a
                            patient to the blockchain through this system. This
                            will be immutable record in the form of transaction
                            and can't be changed once added.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
