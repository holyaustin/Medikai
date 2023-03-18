export default function Footer() {
    return (
        <div>
            <footer className="px-4 pt-20 pb-8 text-white bg-white border-t border-gray-200">
                <div className="container flex flex-col justify-between max-w-6xl px-4 mx-auto overflow-hidden lg:flex-row">
                    <div className="w-full pl-12 mr-4 text-left lg:w-1/4 sm:text-center sm:pl-0 lg:text-left">
                        <a
                            href="/"
                            className="flex justify-start block text-left sm:text-center lg:text-left sm:justify-center lg:justify-start"
                        >
                            <span className="flex items-start sm:items-center">
                                <img src="/logo.svg" alt="Logo of MediChain" />
                            </span>
                        </a>
                        <p className="mt-6 mr-4 text-base text-gray-500">
                            Crafting the next-level of user experience and data
                            security.
                        </p>
                    </div>
                    <div className="block w-full pl-10 mt-6 text-sm lg:w-3/4 sm:flex lg:mt-0">
                        <ul className="flex flex-col w-full p-0 font-medium text-left text-gray-700 list-none">
                            <li className="inline-block px-3 py-2 mt-5 font-bold tracking-wide text-gray-800 uppercase md:mt-0">
                                About Project
                            </li>
                            <li>
                                <a
                                    href="https://github.com/sadityakumar9211/medichain-hardhat"
                                    target="_blank"
                                    className="inline-block px-3 py-2 text-gray-500 no-underline hover:text-gray-600"
                                >
                                    Hardhat Repository
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://github.com/sadityakumar9211/medichain-nextjs"
                                    target="_blank"
                                    className="inline-block px-3 py-2 text-gray-500 no-underline hover:text-gray-600"
                                >
                                    Next.js Repository
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://github.com/sadityakumar9211/medichain-thegraph"
                                    target="_blank"
                                    className="inline-block px-3 py-2 text-gray-500 no-underline hover:text-gray-600"
                                >
                                    The Graph Repository
                                </a>
                            </li>
                        </ul>
                        <ul className="flex flex-col w-full p-0 font-medium text-left text-gray-700 list-none">
                            <li className="inline-block px-3 py-2 mt-5 font-bold tracking-wide text-gray-800 uppercase md:mt-0">
                                Hardhat Tools
                            </li>
                            <li>
                                <a
                                    href="https://hardhat.org/"
                                    target="_blank"
                                    className="inline-block px-3 py-2 text-gray-500 no-underline hover:text-gray-600"
                                >
                                    Hardhat
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://thegraph.com/en/"
                                    target="_blank"
                                    className="inline-block px-3 py-2 text-gray-500 no-underline hover:text-gray-600"
                                >
                                    The Graph
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://moralis.io/"
                                    target="_blank"
                                    className="inline-block px-3 py-2 text-gray-500 no-underline hover:text-gray-600"
                                >
                                    Moralis Open Source Tools
                                </a>
                            </li>
                        </ul>
                        <ul className="flex flex-col w-full p-0 font-medium text-left text-gray-700 list-none">
                            <li className="inline-block px-3 py-2 mt-5 font-bold tracking-wide text-gray-800 uppercase md:mt-0">
                                Frontend
                            </li>
                            <li>
                                <a
                                    href="https://nextjs.org/"
                                    target="_blank"
                                    className="inline-block px-3 py-2 text-gray-500 no-underline hover:text-gray-600"
                                >
                                    Next.js
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://github.com/web3ui/web3uikit" target="_blank"
                                    className="inline-block px-3 py-2 text-gray-500 no-underline hover:text-gray-600"
                                >
                                    Web3uikit
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://tailwindcss.com/"
                                    target="_blank"
                                    className="inline-block px-3 py-2 text-gray-500 no-underline hover:text-gray-600"
                                >
                                    Tailwind CSS
                                </a>
                            </li>
                        </ul>
                        <div className="flex flex-col w-full text-gray-700">
                            <div className="inline-block px-3 py-2 mt-5 font-bold text-gray-800 uppercase md:mt-0">
                                Follow Us
                            </div>
                            <div className="flex justify-start pl-4 mt-2">
                                <a
                                    className="flex items-center block mr-6 text-gray-400 no-underline hover:text-gray-600"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <svg
                                        viewBox="0 0 24 24"
                                        className="w-5 h-5 fill-current"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M23.998 12c0-6.628-5.372-12-11.999-12C5.372 0 0 5.372 0 12c0 5.988 4.388 10.952 10.124 11.852v-8.384H7.078v-3.469h3.046V9.356c0-3.008 1.792-4.669 4.532-4.669 1.313 0 2.686.234 2.686.234v2.953H15.83c-1.49 0-1.955.925-1.955 1.874V12h3.328l-.532 3.469h-2.796v8.384c5.736-.9 10.124-5.864 10.124-11.853z" />
                                    </svg>
                                </a>
                                <a
                                    className="flex items-center block mr-6 text-gray-400 no-underline hover:text-gray-600"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <svg
                                        viewBox="0 0 24 24"
                                        className="w-5 h-5 fill-current"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M23.954 4.569a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.691 8.094 4.066 6.13 1.64 3.161a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.061a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63a9.936 9.936 0 002.46-2.548l-.047-.02z" />
                                    </svg>
                                </a>
                                <a
                                    className="flex items-center block text-gray-400 no-underline hover:text-gray-600"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <svg
                                        viewBox="0 0 24 24"
                                        className="w-5 h-5 fill-current"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="pt-4 pt-6 mt-10 text-center text-gray-500 border-t border-gray-100">
                    © 2022 MediChain. All rights reserved.
                </div>

                <div className="pt-2 pt-4 mt-2 text-center text-gray-600 border-t border-gray-100">
                    Developed by{" "}
                    <a href="https://saditya9211.me">Aditya Kumar Singh</a>
                </div>
            </footer>
        </div>
    )
}