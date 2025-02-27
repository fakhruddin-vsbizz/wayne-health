import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

const CartListItem = ({ name, totalPrice, quantity, id, setIsUpdated }) => {
    const handleDelete = () => {
        console.log(id);

        const token = localStorage.getItem("x-wayne-health-token");

        axios
            .delete("/api/customer/cart/" + id, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            })
            .then((data) => {
                console.log(data);
                if (data?.data?.success) {
                    setIsUpdated((prev) => !prev);
                    // toast.success(data.data.success, {
                    //     position: "top-right",
                    //     autoClose: 3000,
                    //     hideProgressBar: false,
                    //     closeOnClick: true,
                    //     pauseOnHover: true,
                    //     draggable: false,
                    //     progress: undefined,
                    //     theme: "light",
                    // });
                }
            })
            .catch((err) => console.log(err));
    };

    return (
        <div class="grid grid-cols-2">
            <div>
                <span class="truncate text-sm font-semibold leading-none text-gray-900 dark:text-white">
                    {name}
                </span>
                <p class="mt-0.5 truncate text-sm font-normal text-gray-500 dark:text-gray-400">
                    ${totalPrice}
                </p>
            </div>

            <div class="flex items-center justify-end gap-6">
                <p class="text-sm font-normal leading-none text-gray-500 dark:text-gray-400">
                    Qty: {quantity}
                </p>

                <button
                    type="button"
                    onClick={handleDelete}
                    class="text-red-600 hover:text-red-700 dark:text-red-500 dark:hover:text-red-600"
                >
                    <span class="sr-only"> Remove </span>
                    <svg
                        class="h-4 w-4"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M2 12a10 10 0 1 1 20 0 10 10 0 0 1-20 0Zm7.7-3.7a1 1 0 0 0-1.4 1.4l2.3 2.3-2.3 2.3a1 1 0 1 0 1.4 1.4l2.3-2.3 2.3 2.3a1 1 0 0 0 1.4-1.4L13.4 12l2.3-2.3a1 1 0 0 0-1.4-1.4L12 10.6 9.7 8.3Z"
                            clip-rule="evenodd"
                        />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default CartListItem;
