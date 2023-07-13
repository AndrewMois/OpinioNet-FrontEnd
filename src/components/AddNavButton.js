'use client';
import React from 'react';
import Link from "next/link";
import {motion} from "framer-motion";
import Image from "next/image";

function AddNavButton() {
    return (
        <motion.div whileTap={{scale: 0.8}} className="flex flex-col items-center justify-center">
            <Link href="/add">
                <div
                    className={"bg-fuchsia-800 p-3 box-shadow-black border-2 border-black rounded-2xl flex items-center justify-center"}>
                    <Image src="/images/add.svg" alt="add" width={30} height={30} className="w-6 h-6"/>
                </div>
            </Link>
        </motion.div>
    );
}

export default AddNavButton;