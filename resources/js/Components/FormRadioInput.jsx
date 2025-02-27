import React, { useEffect } from "react";

const FormRadioInput = ({
    rows,
    fieldData,
    setFieldData,
    name,
    setOpen,
    setDeleteAddress,
}) => {
    useEffect(() => {
        if (rows.length > 0) {
            setFieldData(
                rows.filter((fItem) => fItem.is_default === "on")[0].id
            );
        }
    }, [rows]);

    console.log(rows);
    return (
        <div class="rounded-md p-4 w-full mx-auto max-w-2xl">
            {/* <h4 class="text-xl lg:text-2xl font-semibold">
                Select Your Country
            </h4> */}

            <div>
                {rows.map((item, indx) => (
                    <label
                        key={indx}
                        class="flex bg-gray-100 text-gray-700 rounded-md px-3 py-2 my-3  hover:bg-gray-200 cursor-pointer "
                    >
                        <input
                            type="radio"
                            name={name}
                            value={item.id}
                            checked={item.id === fieldData ? true : false}
                            onChange={(e) => {
                                setFieldData(Number(e.target.value));
                            }}
                        />
                        <i class="pl-2">
                            <div className="gap-6 p-2 grid grid-cols-1 md:grid-cols-2 justify-items-end">
                                <div className="flex flex-col gap-2">
                                    <span>Name: {item.ship_to_name}</span>
                                    <span>Company: {item.ship_to_company}</span>
                                    <span>
                                        Address 1: {item?.address_line_1}
                                    </span>
                                    <span>
                                        Address 2: {item?.address_line_2}
                                    </span>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <span>City: {item?.city} </span>
                                    <span>State: {item?.state} </span>
                                    <span>Country: {item?.country} </span>
                                    <span>Zip: {item?.postal_code} </span>
                                </div>
                            </div>
                            {item.is_default !== "on" ? (
                                <button
                                    onClick={() => {
                                        setOpen((prev) => !prev);
                                        setDeleteAddress(item);
                                    }}
                                    className="text-[#8c0327] hover:text-[#6b0220] hover:underline"
                                >
                                    Delete
                                </button>
                            ) : null}
                        </i>
                    </label>
                ))}
            </div>
        </div>
    );
};

export default FormRadioInput;
