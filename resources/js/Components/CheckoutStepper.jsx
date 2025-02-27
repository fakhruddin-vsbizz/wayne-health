import React from "react";
import { Stepper, Step, Button } from "@material-tailwind/react";
import { HomeIcon, CogIcon, UserIcon } from "@heroicons/react/24/outline";
import CheckoutShippingPage from "../Pages/Customer/Checkout/CheckoutShippingPage";
import { Link } from "react-router-dom";

export function Breadcrumbs({ links, setCurrentPage }) {
    return (
        <nav class="flex" aria-label="Breadcrumb">
            <ol class="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                {links.map((item, indx) =>
                    item.active ? (
                        <li key={indx} class="inline-flex items-center">
                            <button
                                onClick={() => setCurrentPage(item.pageIndx)}
                                to={item.link}
                                state={{ some: "value" }}
                                class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
                            >
                                {item.title !== "Shipping" ? (
                                    <svg
                                        class="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 6 10"
                                    >
                                        <path
                                            stroke="currentColor"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="m1 9 4-4-4-4"
                                        />
                                    </svg>
                                ) : null}
                                {item.title}
                            </button>
                        </li>
                    ) : (
                        <li key={indx} aria-current="page">
                            <div class="flex items-center">
                                <svg
                                    class="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 6 10"
                                >
                                    <path
                                        stroke="currentColor"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="m1 9 4-4-4-4"
                                    />
                                </svg>
                                <span class="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">
                                    {item.title}
                                </span>
                            </div>
                        </li>
                    )
                )}
            </ol>
        </nav>
    );
}
