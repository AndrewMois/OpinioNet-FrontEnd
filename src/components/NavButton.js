'use client';
import React from 'react';
import Link from "next/link";
import Image from "next/image";
import {motion} from "framer-motion";

function NavButton({href, imagePath, alt, text}) {
    return (
        <motion.div whileTap={{scale: 0.8}}
                    className="flex flex-col items-center justify-center focus:outline-none remove-tap-highlight">
            <Link className="flex flex-col items-center justify-center remove-tap-highlight"
                  href={`${href}`}>
                <Image src={`${imagePath}`} alt={alt} height="24" width="30"
                       className="mb-1 remove-tap-highlight outline-none"/>
                <span className="text-xs remove-tap-highlight outline-none">{text}</span>
            </Link>
        </motion.div>
    );
}

export default NavButton;