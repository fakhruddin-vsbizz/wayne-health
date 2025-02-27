import React from "react";

const InputField = ({ label, value, error, disabled, className, ...props }) => {
    return (
        <div>
            {/* Label */}
            <label
                className={`block font-medium text-sm text-gray-700`}
                {...props}
            >
                {label}
            </label>

            {/* Input */}
            <input
                className={`border-gray-300 border focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm block mt-1 mb-4 p-2 w-full h-10 font-2xl`}
                disabled={disabled}
                {...props}
            />

            {/* Error message */}
            {error && <p className="text-sm text-red-600 space-y-1">{error}</p>}
        </div>
    );
};

export default InputField;
