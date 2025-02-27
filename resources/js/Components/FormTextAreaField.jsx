import React from "react";

const FormTextAreaField = ({
    name,
    id,
    rows,
    value,
    onChange,
    className,
    label,
    placeholder,
    error,
}) => {
    return (
        <div className={className ? className : ""}>
            <label className={`block font-medium text-sm text-gray-700`}>
                {label}
            </label>
            <textarea
                id={id || ""}
                name={name || ""}
                rows={rows || "3"}
                placeholder={placeholder || "Enter Text"}
                value={value || ""}
                onChange={onChange}
                className="block w-full h-48 rounded-md border-gray-300 shadow-sm focus:border-[#8c0327] focus:ring-[#8c0327] focus:ring-opacity-50 p-2"
                style={{ backgroundColor: "#f6f6f6" }}
            ></textarea>
            {error && <p className="text-red-500 mt-1 text-sm">{error}</p>}
        </div>
    );
};

export default FormTextAreaField;

// <FormTextAreaField
//     id="description"
//     name="description"
//     rows="3"
//     placeholder="Event Description"
//     onChange={() => {}}
// />;
