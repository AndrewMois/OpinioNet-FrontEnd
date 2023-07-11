import React from 'react';
import Link from "next/link";

function Logo(props) {
    return (
        <div
            className={"mx-auto py-1 border-b-4 border-black text-center background-colour text-fuchsia-800 text-shadow-black"}>
            <Link href="/">
                <h1 className={"text-3xl font-bold"}>
                    {props.text}
                </h1>
            </Link>
        </div>
    );
}

export default Logo;