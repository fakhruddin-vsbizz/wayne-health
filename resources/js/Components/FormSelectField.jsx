import React, { useEffect } from "react";

const FormSelectField = ({
    id,
    name,
    options,
    value,
    onChange,
    label,
    blankLabel,
    noNull,
}) => {
    // useEffect(() => {
    //   if (noNull) {

    //   }
    // }, [])

    return (
        <div className="p-2">
            <label className={`block font-medium text-sm text-gray-700`}>
                {label}
            </label>
            <select
                id={id || ""}
                name={name || ""}
                value={value || ""}
                onChange={onChange}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8c0327] focus:ring-[#8c0327] focus:ring-opacity-50 p-2"
                style={{ backgroundColor: "#f6f6f6" }}
            >
                {!noNull ? (
                    <option value="">
                        {blankLabel || "Select a category"}
                    </option>
                ) : null}
                {options.map((option, index) => (
                    <option key={index} value={option.value}>
                        {option.title}
                    </option>
                ))}
                {/* <option>Sports</option>
                <option>Arts</option>
                <option>Technology</option> */}
            </select>
        </div>
    );
};

export default FormSelectField;

// <FormSelectField
//     id="category"
//     name="category"
//     options={[{ title: "name", value: "name" }]}
//     onChange={() => {}}
//     label="Select a category"
// />;
