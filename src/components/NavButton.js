'use client';
import React from 'react';
import Link from "next/link";
import Image from "next/image";
import {motion} from "framer-motion";

function NavButton({href, imagePath, alt, text}) {
    return (
        <motion.div whileTap={{scale: 0.8}} className="flex flex-col items-center justify-center">
            <Link className="flex flex-col items-center justify-center"
                  href={`${href}`}>
                <Image src={`${imagePath}`} alt={alt} height="24" width="30" className="mb-1"/>
                <span className="text-xs">{text}</span>
            </Link>
        </motion.div>
    );
}

export default NavButton;