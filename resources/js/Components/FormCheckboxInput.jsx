import React from "react";

const FormCheckboxInput = ({
    label,
    name,
    value,
    onChange,
    id,
    labelClass,
    inputClass,
    divClass,
    disabled,
}) => {
    return (
        <div className={divClass ? "block mt-4 " + divClass : "block mt-4"}>
            <label htmlFor={name || ""} className="inline-flex items-center">
                <input
                    disabled={disabled}
                    id={id || ""}
                    type="checkbox"
                    className={
                        inputClass
                            ? "rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500 " +
                              inputClass
                            : "rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                    }
                    name={name || ""}
                    checked={value}
                    onChange={onChange}
                />
                <span
                    className={
                        labelClass
                            ? "ms-2 text-sm text-gray-600 " + labelClass
                            : "ms-2 text-sm text-gray-600"
                    }
                >
                    {label}
                </span>
            </label>
        </div>
    );
};

export default FormCheckboxInput;
