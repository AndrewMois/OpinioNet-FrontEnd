'use client';
import React from 'react';
import {GridLoader} from "react-spinners";

function Loading() {
    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
            <GridLoader color="#86198f" size={20}/>
        </div>
    );
}

export default Loading;