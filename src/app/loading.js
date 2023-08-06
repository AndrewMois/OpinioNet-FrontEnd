import React from 'react';

function Loading() {
    return (
        <div className="h-screen">
            <h1 className="text-2xl font-bold my-4">Feed</h1>
            <div className="rounded-md my-4 animate-pulse">
                {Array(5).fill(0).map((count, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-2xl box-shadow-black p-4 mb-4 border-2 border-black">
                        <div className="flex justify-between items-center">
                            <div className="w-3/4 h-6 bg-gray-300 rounded"></div>
                            <div className="flex items-center justify-between gap-2">
                                <div className="w-6 h-6 bg-gray-300 rounded"></div>
                                <div className="w-8 h-6 bg-gray-300 rounded"></div>
                            </div>
                        </div>
                        <div className="h-4 bg-gray-300 rounded mt-2"></div>
                        <div className="h-4 bg-gray-300 rounded mt-2"></div>

                        <div className="flex justify-between gap-4">
                            <div className="w-1/3 h-4 bg-gray-300 rounded mt-2"></div>
                            <div className="w-1/3 h-4 bg-gray-300 rounded mt-2"></div>
                            <div className="w-1/3 h-4 bg-gray-300 rounded mt-2"></div>
                        </div>

                        <div className="flex justify-between gap-4">
                            <div className="w-1/4 h-4 bg-gray-300 rounded mt-2"></div>
                            <div className="w-1/4 h-4 bg-gray-300 rounded mt-2"></div>
                            <div className="w-1/2 h-4 bg-gray-300 rounded mt-2"></div>
                        </div>

                        <div className="flex justify-between gap-4">
                            <div className="w-1/4 h-4 bg-gray-300 rounded mt-2"></div>
                            <div className="w-1/4 h-4 bg-gray-300 rounded mt-2"></div>
                            <div className="w-1/2 h-4 bg-gray-300 rounded mt-2"></div>
                        </div>

                        <div className="h-4 bg-gray-300 rounded mt-2"></div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Loading;