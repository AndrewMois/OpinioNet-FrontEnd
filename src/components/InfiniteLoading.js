import React from 'react';

function InfiniteLoading() {
    return (

        <div className="rounded-md my-4 animate-pulse">
            <div className="bg-white rounded-2xl box-shadow-black p-4 mb-4 border-2 border-black">
                <div className="flex justify-between items-center">
                    <div className="w-3/4 h-6 bg-gray-300 rounded"></div>
                    <div className="flex items-center justify-between gap-2">
                        <div className="w-6 h-6 bg-gray-300 rounded"></div>
                        <div className="w-8 h-6 bg-gray-300 rounded"></div>
                    </div>
                </div>
                <div className="h-4 bg-gray-300 rounded mt-2"></div>
                <div className="h-4 bg-gray-300 rounded mt-2"></div>
                <div className="h-4 bg-gray-300 rounded mt-2"></div>
            </div>
        </div>

    );
}

export default InfiniteLoading;