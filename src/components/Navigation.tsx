import React from 'react';
import NavButton from "@/components/NavButton";
import AddNavButton from "@/components/AddNavButton";

// import {motion} from "framer-motion";

function Navigation() {
    return (

        <nav className="fixed bottom-0 left-0 w-full border-t-4 border-black md:border-0">
            <div
                className="flex justify-around px-4 py-2 max-w-screen-md mx-auto background-colour md:border-black md:border-x-4 md:border-t-4">
                <NavButton href="/" text="Feed" alt="feed" imagePath="/images/feed.svg"/>
                <AddNavButton/>
                <NavButton href="/account" text="Account" alt="account" imagePath="/images/accountBtn.svg"/>
            </div>
        </nav>
    );
}

export default Navigation;