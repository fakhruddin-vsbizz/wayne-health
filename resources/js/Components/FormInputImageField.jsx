import React, { useRef } from "react";
import {
    primaryGreen,
    primaryYellow,
    secondaryYellow,
} from "../constantVriables";

const FormInputImageField = ({
    id,
    accept,
    name,
    value,
    onChange,
    error,
    label,
}) => {
    const inputRef = useRef(null);

    const handleClick = () => {
        inputRef.current.click();
    };

    return (
        <div>
            <span className={`block font-medium text-sm text-gray-700`}>
                {label}
            </span>
            <label
                htmlFor="image-upload"
                className="w-full h-48 border-2 border-dashed border-gray-300 rounded-md cursor-pointer flex flex-col items-center justify-center bg-[#f6f6f6] hover:bg-gray-50"
            >
                <div className="text-center">
                    <div className="mb-2">
                        <button
                            onClick={handleClick}
                            type="button"
                            style={{ backgroundColor: secondaryYellow }}
                            className="text-white rounded-full py-2 px-4"
                        >
                            Select from the computer
                        </button>
                    </div>
                    <p className="text-gray-500 text-sm mt-1 max-w-80">
                        {!value
                            ? "Upload a file (PNG, JPG)"
                            : value?.name
                            ? value.name
                            : value}
                    </p>
                </div>
            </label>
            <input
                id={id || ""}
                ref={inputRef}
                name={name || ""}
                type="file"
                accept={accept || "image/*"}
                onChange={onChange}
                className="sr-only"
            />
            {error && <p className="text-red-500 mt-1 text-sm">{error}</p>}
        </div>
    );
};

export default FormInputImageField;

// <FormInputImageField
//     id="image-upload"
//     name="image"
//     accept="image/*"
//     label="PNG, JPG"
//     onChange={() => {}}
// />;
