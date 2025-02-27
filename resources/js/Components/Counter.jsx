import React, { useEffect, useRef, useState } from "react";

const Counter = ({ item, setPriceAndSizeArray, containerClass }) => {
    const inputRef = useRef();

    // const increment = () => {
    //     setPriceAndSizeArray((prev) =>
    //         prev.map((mItem) =>
    //             mItem.size === item.size
    //                 ? {
    //                       ...mItem,
    //                       quantity: mItem.quantity + 1,
    //                   }
    //                 : mItem
    //         )
    //     );
    // };
    // const decrement = () => {
    //     setPriceAndSizeArray((prev) =>
    //         prev.map((mItem) =>
    //             mItem.size === item.size
    //                 ? {
    //                       ...mItem,
    //                       quantity:
    //                           mItem.quantity > 0
    //                               ? mItem.quantity - 1
    //                               : mItem.quantity,
    //                   }
    //                 : mItem
    //         )
    //     );
    // };

    const handleBlur = () => {
        const inputElement = inputRef.current;
        if (inputElement.value === "") {
            setPriceAndSizeArray((prev) =>
                prev.map((mItem) =>
                    mItem.size === item.size
                        ? {
                              ...mItem,
                              quantity: 0,
                          }
                        : mItem
                )
            );
        } else if (inputElement.value < 0) {
            setPriceAndSizeArray((prev) =>
                prev.map((mItem) =>
                    mItem.size === item.size
                        ? {
                              ...mItem,
                              quantity: -mItem.quantity,
                          }
                        : mItem
                )
            );
        }
    };

    useEffect(() => {
        const inputElement = inputRef.current;
        if (inputElement) {
            inputElement.addEventListener("blur", handleBlur);
        }
    }, []);

    const onChange = (e) => {
        setPriceAndSizeArray((prev) =>
            prev.map((mItem) =>
                mItem.size === item.size
                    ? {
                          ...mItem,
                          quantity: e.target.value,
                      }
                    : mItem
            )
        );
    };

    return (
        <div
            className={
                containerClass
                    ? "w-[150px] max-w-sm relative mt-4 " + containerClass
                    : "w-[150px] max-w-sm relative mt-4"
            }
        >
            <div class="mb-1 text-sm text-slate-600 flex justify-between">
                <span class="text-slate-900">Size: {item?.size || "XS"}</span>
                <span>${item?.price || 10}</span>
            </div>
            <div class="relative">
                {/* <button
                    onClick={decrement}
                    id="decreaseButton"
                    class="absolute right-9 top-1 rounded-md border border-transparent p-1.5 text-center text-sm transition-all text-slate-600 hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    type="button"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        class="w-4 h-4"
                    >
                        <path d="M3.75 7.25a.75.75 0 0 0 0 1.5h8.5a.75.75 0 0 0 0-1.5h-8.5Z" />
                    </svg>
                </button> */}
                <input
                    ref={inputRef}
                    id="amountInput"
                    type="number"
                    onChange={onChange}
                    value={item.quantity}
                    class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-3 pr-20 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                {/* <button
                    onClick={increment}
                    id="increaseButton"
                    class="absolute right-1 top-1 rounded-md border border-transparent p-1.5 text-center text-sm transition-all text-slate-600 hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    type="button"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        class="w-4 h-4"
                    >
                        <path d="M8.75 3.75a.75.75 0 0 0-1.5 0v3.5h-3.5a.75.75 0 0 0 0 1.5h3.5v3.5a.75.75 0 0 0 1.5 0v-3.5h3.5a.75.75 0 0 0 0-1.5h-3.5v-3.5Z" />
                    </svg>
                </button> */}
            </div>
        </div>
    );
};

export default Counter;
