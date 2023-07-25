import React from 'react';

function ErrorMessage({errors}) {
    return (
        <div className="rounded border-2 border-black box-shadow-black bg-fuchsia-800 p-2 mb-4">
            {Object.values(errors).map((error, index) => (
                <p key={index} className="text-white font-bold text-xs">❕ {error}</p>
            ))}
        </div>
    );
}

export default ErrorMessage;
