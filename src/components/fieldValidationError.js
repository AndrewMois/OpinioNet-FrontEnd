import React from 'react';

function FieldValidationError({message}) {
    return (
        <div>
            <p className="mt-2 ml-4 text-xs text-red-600">
                <span className="font-bold">{message}</span></p>
        </div>
    );
}

export default FieldValidationError;