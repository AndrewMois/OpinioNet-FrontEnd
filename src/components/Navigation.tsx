import React from 'react';
import NavButton from "@/components/NavButton";
import AddNavButton from "@/components/AddNavButton";

// import {motion} from "framer-motion";

function Navigation() {
    return (
        <header className="relative z-10">
            <nav className="fixed bottom-0 left-0 w-full border-t-4 border-black background-colour">
                <div className="flex justify-around px-4 py-2">

                    <NavButton href="/" text="Feed" alt="feed" imagePath="/images/feed.svg"/>

                    <AddNavButton/>

                    <NavButton href="/account" text="Account" alt="account" imagePath="/images/accountBtn.svg"/>
                </div>
            </nav>
        </header>
    );
}

export default Navigation;