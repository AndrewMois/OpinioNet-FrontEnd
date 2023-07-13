import React from 'react';
import Link from "next/link";
import NavButton from "@/components/NavButton";

// import {motion} from "framer-motion";

function Navigation() {
    return (
        <header className="relative z-10">
            <nav className="fixed bottom-0 left-0 w-full border-t-4 border-black background-colour">
                <div className="flex justify-around px-4 py-2">

                    <NavButton href="/" text="Feed" alt="feed" imagePath="/images/feed.svg"/>

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

                    <NavButton href="/account" text="Account" alt="account" imagePath="/images/accountBtn.svg"/>
                </div>
            </nav>
        </header>
    );
}

export default Navigation;