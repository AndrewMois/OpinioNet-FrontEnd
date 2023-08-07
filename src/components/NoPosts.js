import React from 'react';

function NoPosts() {
    return (
        <div
            key={9999999}
            className="bg-white rounded-2xl box-shadow-black p-4 mb-4  border-2 border-black"
        >
            <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold mb-2">No posts yet</h2>
            </div>

            <p className="text-gray-600 mb-2 whitespace-pre-line">{"Go ahead and ask peoples' opinion!"}</p>
        </div>
    )
}

export default NoPosts;