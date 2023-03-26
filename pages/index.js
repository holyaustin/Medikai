//This is the Home Page(landing page) of the application.
import Head from "next/head"
import Header from "../components/Header"
import Footer from "../components/Footer"
import Link from "next/link"

export default function Home() {
    return (
        <div>
            <Head>
                <title>Medikai</title>
                <meta name="description" content="MediChain - Homepage" />
                <link rel="icon" href="/images/logo.png" />
            </Head>
            <div className=" antialiased">
                {/* Header Here */}
                <Header />
                {/* <!-- BEGIN MAIN SECTION --> */}
                <div className="relative items-center justify-center w-full h-full overflow-x-hidden overflow-auto lg:pt-40 lg:pb-24 xl:pt-24 xl:pb-24 bg-black">
                    <div className="container flex flex-col items-center justify-between h-full max-w-6xl px-8 mx-auto -mt-32 lg:flex-row xl:px-0 sm:h-full">
                        <div className="z-30 flex flex-col items-center w-full max-w-none pt-48 text-center mr-10 justify-center lg:items-start lg:w-1/2 lg:pt-20 xl:pt-40 lg:text-left">
                            <h1 className="relative mb-4 text-3xl font-black leading-tight text-white sm:text-5xl xl:mb-8 text-justify">
                                AI - Enabled Diagnosis for a Decentralized Medical Record system
                            </h1>
                            <p className="pr-0 mb-8 text-base text-pink-500 sm:text-lg xl:text-xl lg:pr-2 text-justify">
                                A smart contract powered patient medical record deployed on Ethereum major scaling and infrastructure solutions: L2 solutions (ZK Rollups and Optimistic Rollups) for faster trasanction finality and throughput. Patient Medical data are stored on decentralized storage with data encryption transaction committed on -chain. This enables only patients to have access to their medical record, giving them full control over their own data. Diagnosis of ailments are made through the power of Artificial Intelligence (OpenAI) and this DApp support Multi-chain.
                                 </p>
                                 <div  className="mt-5"> </div>
    <div className=" relative flex flex-col items-center space-y-5 justify-center w-full pb-4 mt-4 border-b border-gray-200 md:relative md:space-y-0  md:w-full md:bg-transparent md:border-none  sm:mt-0 lg:flex-row  md:p-0 md:items-center md:justify-between md:flex-row sm:flex-row  sm:items-center sm:justify-between sm:space-y-0">
    
    <Link href="/patientDashboard">
        <a className="relative z-40 inline-block w-full  text-center px-5 py-5 mr-2  text-lg font-bold leading-none text-white transition-all duration-300 bg-red-700 rounded-lg shadow-md lg:bg-white lg:text-pink-700 lg:shadow-none hover:shadow-xl">
        Patient Login
        </a>
    </Link>
   
  
    <Link href="/doctorDashboard">
        <a className="relative z-40 inline-block w-full text-center px-5 py-5 mr-2 text-lg font-bold leading-none text-white transition-all  duration-300 bg-red-700 rounded-lg shadow-md  lg:bg-white lg:text-pink-700  lg:shadow-none hover:shadow-xl">
        Doctor Login
        </a>
    </Link>
   
    </div>

                    
                        
                        </div>
                        <div className="relative z-50 flex flex-col items-end justify-center w-full h-full lg:w-1/2 ms:pl-10">
                            <div className="container relative left-0 w-full max-w-4xl lg:absolute lg:w-screen">
                                
                                <img
                                    src="/images/9.webp"
                                    className="mt-24 w-auto h-full rounded-lg lg:w-3/4 lg:h-3/4 lg:mt-32"
                                />
                                 
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- HERO SECTION END --> */}

                {/* <!-- BEGIN FEATURES SECTION --> */}
                <div
                    id="features"
                    className="relative w-full px-8 py-10 border-t border-gray-200 md:py-16 lg:py-24 xl:py-10 xl:px-0"
                >
                    <div className="container flex flex-col items-center justify-between h-full max-w-6xl mx-auto">
                        <h2 className="my-5 text-base font-bold tracking-tight text-pink-500 uppercase">
                            Features
                        </h2>
                        <h3 className="max-w-2xl px-5 mt-2 text-3xl font-black leading-tight text-center text-gray-900 sm:mt-0 sm:px-0 sm:text-6xl">
                            Developed for patients and Medical workers with data availability  and privacy in
                            Mind
                        </h3>
                        <div className="flex flex-col w-full mt-0 lg:flex-row sm:mt-10 lg:mt-20">
                            <div className="w-full max-w-md p-4 mx-auto mb-0 sm:mb-16 lg:mb-0 lg:w-1/3">
                                <div className="relative flex flex-col items-center justify-center w-full h-full p-20 mr-5 rounded-lg">
                                    {/* We have a SVG here */}
                                    <img
                                        src="/abstractBackground1.svg"
                                        alt=""
                                        className="absolute w-full h-full text-gray-100 fill-current"
                                    />
                                    {/* <!-- FEATURE Icon 1 SVG--> */}
                                    <img
                                        src="/featureIcon1.svg"
                                        alt=""
                                        className="relative w-20 h-20"
                                    />
                                    <h4 className="relative mt-6 text-lg font-bold text-center ">
                                        Easy Record Access
                                    </h4>
                                    <p className="relative mt-2 md:text-base text-sm text-center text-gray-600">
                                        Patient registers with their wallet, After Records are created and stored, 
                                        You can access it whenever you
                                        want. Only you can access your 
                                        medical record because its encrypted.
                                    </p>

                                </div>
                            </div>

                            <div className="w-full max-w-md p-4 mx-auto mb-0 sm:mb-16 lg:mb-0 lg:w-1/3">
                                <div className="relative flex flex-col items-center justify-center w-full h-full p-20 mr-5 rounded-lg">
                                    {/* We have a SVG here */}
                                    <img
                                        src="/abstractBackground2.svg"
                                        alt=""
                                        className="absolute w-full h-full text-gray-100 fill-current"
                                    />
                                    {/* <!-- FEATURE Icon 2 SVG --> */}
                                    <img
                                        src="/featureIcon2.svg"
                                        alt=""
                                        className="relative w-20 h-20"
                                    />
                                    <h4 className="relative mt-6 text-lg font-bold text-center ">
                                        Multi-Chain Support / Immutability
                                    </h4>
                                    <p className="relative mt-2 md:text-base text-sm text-center text-gray-600">
                                        Deployed on public blockchain,
                                        leveraging Ethereum scaling technology.
                                        This makes sure that the
                                        patient's data is permanent, indellible
                                        and unalterable.
                                    </p>

                                </div>
                            </div>

                            <div className="w-full max-w-md p-4 mx-auto mb-16 lg:mb-0 lg:w-1/3">
                                <div className="relative flex flex-col items-center justify-center w-full h-full p-20 mr-5 rounded-lg">
                                    {/* We have a SVG here */}
                                    <img
                                        src="/abstractBackground3.svg"
                                        alt=""
                                        className="absolute w-full h-full text-gray-100 fill-current"
                                    />
                                    {/* <!-- FEATURE Icon 3 SVG --> */}
                                    <img
                                        src="featureIcon3.svg"
                                        alt=""
                                        className="relative w-20 h-20"
                                    />
                                    <h4 className="relative mt-6 text-lg font-bold text-center ">
                                        AI Diagnosis / Medical Assistance
                                    </h4>
                                    <p className="relative mt-2 md:text-base text-sm text-center text-gray-600">
                                        Users can diagnose their ailment 
                                        based on the symptoms they experience. 
                                        This always further help ,medical laboratory 
                                        scientist and doctors in the areas of 
                                        diagnosis they can conduct for the patient. 
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- END FEATURES SECTION --> */}
            </div>
        </div>
    )
}
