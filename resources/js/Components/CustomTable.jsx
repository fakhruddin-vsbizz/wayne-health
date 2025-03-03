import React from "react";
import { Link } from "react-router-dom";
import { primaryGreen } from "../constantVriables";

const CustomTable = ({
    columns,
    children,
    noActionBtn,
    style,
    overflowX,
    border,
    noColorHeader,
    footer,
}) => {
    return (
        <div
            style={style ? { ...style } : {}}
            className="flex flex-col max-w-7xl mx-auto p-4"
        >
            <div className="overflow-x-auto">
                <div className="min-w-full block align-middle">
                    {/* <div className="relative  text-gray-500 focus-within:text-gray-900 mb-4">
                        <div className="absolute inset-y-0 left-1 flex items-center pl-3 pointer-events-none ">
                            <svg
                                className="w-5 h-5"
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M17.5 17.5L15.4167 15.4167M15.8333 9.16667C15.8333 5.48477 12.8486 2.5 9.16667 2.5C5.48477 2.5 2.5 5.48477 2.5 9.16667C2.5 12.8486 5.48477 15.8333 9.16667 15.8333C11.0005 15.8333 12.6614 15.0929 13.8667 13.8947C15.0814 12.6872 15.8333 11.0147 15.8333 9.16667Z"
                                    stroke="#9CA3AF"
                                    strokeWidth="1.6"
                                    strokeLinecap="round"
                                />
                                <path
                                    d="M17.5 17.5L15.4167 15.4167M15.8333 9.16667C15.8333 5.48477 12.8486 2.5 9.16667 2.5C5.48477 2.5 2.5 5.48477 2.5 9.16667C2.5 12.8486 5.48477 15.8333 9.16667 15.8333C11.0005 15.8333 12.6614 15.0929 13.8667 13.8947C15.0814 12.6872 15.8333 11.0147 15.8333 9.16667Z"
                                    stroke="black"
                                    stroke-opacity="0.2"
                                    strokeWidth="1.6"
                                    strokeLinecap="round"
                                />
                                <path
                                    d="M17.5 17.5L15.4167 15.4167M15.8333 9.16667C15.8333 5.48477 12.8486 2.5 9.16667 2.5C5.48477 2.5 2.5 5.48477 2.5 9.16667C2.5 12.8486 5.48477 15.8333 9.16667 15.8333C11.0005 15.8333 12.6614 15.0929 13.8667 13.8947C15.0814 12.6872 15.8333 11.0147 15.8333 9.16667Z"
                                    stroke="black"
                                    stroke-opacity="0.2"
                                    strokeWidth="1.6"
                                    strokeLinecap="round"
                                />
                            </svg>
                        </div>
                        <input
                            type="text"
                            id="default-search"
                            className="block w-80 h-11 pr-5 pl-12 py-2.5 text-base font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none"
                            placeholder="Search for company"
                        />
                    </div> */}
                    <div
                        style={{
                            overflowX: overflowX ? overflowX : "hidden",
                        }}
                        className="overflow-hidden "
                    >
                        <table
                            className={
                                border
                                    ? "min-w-full rounded-xl border-black border-2"
                                    : "min-w-full rounded-xl"
                            }
                        >
                            <thead>
                                {noColorHeader ? (
                                    <tr
                                        className={
                                            border
                                                ? " border-black border-2"
                                                : ""
                                        }
                                    >
                                        {columns.map((column, indx) => (
                                            <th
                                                key={indx}
                                                scope="col"
                                                className={
                                                    border
                                                        ? "p-5 text-left text-sm leading-6 font-semibold capitalize text-black border-black border-2"
                                                        : "p-5 text-left text-sm leading-6 font-semibold capitalize text-black"
                                                }
                                            >
                                                {" "}
                                                {column}
                                            </th>
                                        ))}
                                        {!noActionBtn ? (
                                            <th
                                                scope="col"
                                                className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize"
                                            >
                                                {" "}
                                                Actions{" "}
                                            </th>
                                        ) : null}
                                    </tr>
                                ) : (
                                    <tr
                                        className={
                                            border
                                                ? "bg-green-100 border-black border-2"
                                                : "bg-green-100"
                                        }
                                    >
                                        {columns.map((column, indx) => (
                                            <th
                                                key={indx}
                                                scope="col"
                                                style={{ color: primaryGreen }}
                                                className={
                                                    border
                                                        ? "p-5 text-left text-sm leading-6 font-semibold capitalize border-black border-2"
                                                        : "p-5 text-left text-sm leading-6 font-semibold capitalize"
                                                }
                                            >
                                                {" "}
                                                {column}
                                            </th>
                                        ))}
                                        {!noActionBtn ? (
                                            <th
                                                scope="col"
                                                style={{ color: primaryGreen }}
                                                className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize"
                                            >
                                                {" "}
                                                Actions{" "}
                                            </th>
                                        ) : null}
                                    </tr>
                                )}
                            </thead>
                            <tbody className="divide-y divide-gray-300 ">
                                {children}
                                {footer ? footer : null}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomTable;
