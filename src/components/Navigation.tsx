import React from 'react';
import Link from "next/link";

function Navigation() {
    return (
        <header>
            <nav className="fixed bottom-0 left-0 w-full border-t-4 border-black background-colour">
                <div className="flex justify-around px-4 py-2">
                    <Link className="flex flex-col items-center justify-center"
                          href="/">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-1" fill="none" viewBox="0 0 24 24"
                             stroke="#000">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                        <span className="text-xs">Feed</span>
                    </Link>

                    <Link href="/add">
                        <div
                            className={"bg-fuchsia-800 p-3 box-shadow-black border-2 border-black rounded-2xl flex items-center justify-center"}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                                 stroke="#fff">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M12 4v16m8-8H4"></path>
                            </svg>
                        </div>
                    </Link>

                    <Link className="flex flex-col items-center justify-center"
                          href="/account">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-1" fill="none" viewBox="0 0 24 24"
                             stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2m-6 0a2 2 0 00-2 2h-4v12h16V6h-4a2 2 0 00-2-2h-4z"></path>
                        </svg>
                        <span className="text-xs">Account</span>
                    </Link>
                </div>
            </nav>
        </header>
    );
}

export default Navigation;