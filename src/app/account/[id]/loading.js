import React from 'react';

function Loading() {
    return (
        <main className="mb-20 h-screen">
            <div className="mx-auto border-b-2 border-black p-4 animate-pulse">
                <div className="flex items-center justify-center flex-col">
                    <div className="w-32 h-32 bg-gray-300 rounded-full mb-4"></div>
                    <div className="w-40 h-6 bg-gray-300 rounded"></div>
                </div>


                {/* Email inputs */}
                <div className="mb-4">
                    <label className="block font-semibold mb-1">Email:</label>
                    <div className="w-full h-10 bg-gray-300 rounded-2xl box-shadow-black"></div>
                </div>

                {/* Password inputs */}
                <div>
                    <label className="block font-semibold mb-1">Change Password:</label>
                    <div className="w-full h-10 bg-gray-300 rounded-2xl box-shadow-black"></div>
                </div>
            </div>
            <hr/>
            <div className="mx-auto p-4 animate-pulse">
                <h1 className="my-4">Your posts</h1>
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
        </main>
    );
}

export default Loading;