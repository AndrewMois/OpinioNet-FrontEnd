'use client';
import React from 'react';
import Link from "next/link";
import Image from "next/image";
import {motion} from "framer-motion";
import {usePathname} from "next/navigation";

function NavButton({href, imagePath, alt, text}) {
    const path = usePathname()
    return (
        <motion.div whileTap={{scale: 0.8}}
                    className="flex flex-col items-center justify-center focus:outline-none remove-tap-highlight">
            <Link className="relative flex flex-col items-center justify-center remove-tap-highlight"
                  href={`${href}`}>
                <Image src={`${imagePath}`} alt={alt} height="24" width="30"
                       className="mb-1 remove-tap-highlight outline-none"/>
                <span className="text-xs remove-tap-highlight outline-none">{text}</span>
                {href === path && (
                    <motion.span
                        initial={{width: 0}}
                        animate={{width: '100%'}}
                        transition={{duration: 0.2}}
                        className="absolute left-0 top-full block h-[2px] w-full bg-fuchsia-800"/>)}
            </Link>
        </motion.div>
    );
}

export default NavButton;