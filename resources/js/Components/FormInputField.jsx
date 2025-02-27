import React from "react";

const FormInputField = ({
    type,
    id,
    name,
    value,
    onChange,
    label,
    placeholder,
    className,
    max,
    error,
}) => {
    return (
        <div className={className ? "p-2 " + className : "p-2"}>
            <label className={`block font-medium text-sm text-gray-700`}>
                {label}
            </label>
            <input
                max={max}
                type={type || "text"}
                id={id || ""}
                name={name || ""}
                placeholder={placeholder || "Enter Text"}
                value={value || ""}
                onChange={onChange}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8c0327] focus:ring-[#8c0327] focus:ring-opacity-50 p-2"
                style={{ backgroundColor: "#f6f6f6" }}
            />
            {error && <p className="text-red-500 mt-1 text-sm">{error}</p>}
        </div>
    );
};

export default FormInputField;

// <FormInputField
//     type="text"
//     id="title"
//     name="title"
//     label="Name"
//     placeholder="Event Title"
//     onChange={() => {}}
// />
