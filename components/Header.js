
import Link from "next/link"

export default function Header() {
    return (
        <header className="relative z-0 w-full h-24 shadow-sm bg-pink-500">
            <div className="container flex items-center justify-center h-full max-w-6xl px-8 mx-auto sm:justify-between xl:px-0">
                <Link href="/">
                    <a className="relative flex items-center h-full font-black leading-none">
                        {/* We have a SVG here */}
                        <img src="/images/logo.png" alt="Logo of Medikai" width={100} />
                        <span className="ml-3 text-2xl text-white">
                            Medikai
                            <span className="text-pink-500 ml-5">&nbsp;</span>
                        </span>
                    </a>
                </Link>

                <nav
                    id="nav"
                    className="absolute top-0 sm:ml-10 left-0 z-50 flex flex-col items-center justify-between w-full h-64 pt-5 mt-24 text-lg text-gray-800 bg-white border-t border-gray-200 md:w-auto md:flex-row md:h-24 lg:text-base md:bg-transparent md:mt-0 md:border-none md:py-0 md:flex md:relative"
                >
                    <Link href="/#">
                        <a className="ml-0 mr-0 font-bold duration-100 md:ml-12 md:mr-3 lg:mr-8 transition-color hover:text-white">
                            Home
                        </a>
                    </Link>
                    <Link href="/#features">
                        <a className="mr-0 font-bold duration-100 md:mr-3 lg:mr-8 transition-color hover:text-white">
                            Features
                        </a>
                    </Link>
                    <Link href="/hospitalDashboard">
                        <a className="mr-0 font-bold duration-100 md:mr-3 lg:mr-8 transition-color hover:text-white">
                            Hospital
                        </a>
                    </Link>
                    <Link href="/symptom">
                        <a className="mr-0 font-bold duration-100 md:mr-3 lg:mr-8 transition-color hover:text-white">
                            Symptom-Diagnosis
                        </a>
                    </Link>
                    <Link href="/doctorDashboard">
                        <a className="mr-0 font-bold duration-100 md:mr-3 lg:mr-8 transition-color hover:text-white">
                            Doctor
                        </a>
                    </Link>
                    <div className="flex flex-col  w-full font-medium border-t border-gray-200 sm:hidden">
                        <Link href="/ownerDashboard">
                            <a className="w-full py-2 font-bold text-center text-pink-500">
                                Owner
                            </a>
                        </Link>
                        <Link href="/patientDashboard">
                            <a className="relative inline-block w-full px-5 py-3 text-lg leading-none text-center text-white bg-white fold-bold">
                                Patient
                            </a>
                        </Link>
                    </div>
                </nav>

                <div className=" absolute left-0 flex-col items-center justify-center hidden w-full pb-8 mt-48 border-b border-gray-200 md:relative md:w-auto md:bg-transparent md:border-none md:mt-0 md:flex-row md:p-0 md:items-end md:flex md:justify-between">

                    <Link href="/patientDashboard">
                        <a className="relative z-40 inline-block w-auto h-full px-10 py-5 mr-5 text-lg font-bold leading-none text-white transition-all  duration-300 bg-red-700 rounded-lg shadow-md fold-bold lg:bg-white lg:text-pink-700 sm:w-full lg:shadow-none hover:shadow-xl">
                            White Paper
                        </a>
                    </Link>

                </div>
            </div>
        </header>
    )
}
