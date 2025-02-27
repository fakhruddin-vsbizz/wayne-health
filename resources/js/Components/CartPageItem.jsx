import React from "react";
import { Link } from "react-router-dom";

const CartPageItem = ({ item, setIsUpdated }) => {
    const handleDelete = () => {
        const token = localStorage.getItem("x-wayne-health-token");

        axios
            .delete("/api/customer/cart/" + item.id, {
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
        <div class="max-w-7xl mx-auto mt-8 rounded-lg border border-gray-700 bg-white shadow-md  duration-500 hover:scale-100 hover:shadow-xl p-4 md:p-6">
            <div class="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                <a href="#" class="shrink-0 md:order-1">
                    <img
                        class="h-52 w-40 dark:hidden"
                        src={"/images/" + item.product.product_image}
                        alt="product image"
                    />
                    {/* <img
                        class="hidden h-20 w-20 dark:block"
                        src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front-dark.svg"
                        alt="imac image"
                    /> */}
                </a>
                <div class="flex sm:flex-col-reverse sm:gap-8 items-center sm:justify-center md:order-3 justify-between">
                    <div class="text-end md:order-5 md:w-32">
                        <p class="text-base text-center font-bold text-gray-900">
                            Price per item: ${item.price}
                        </p>
                    </div>
                    <div class="flex items-center md:order-4">
                        {/* <button
                            type="button"
                            id="decrement-button"
                            data-input-counter-decrement="counter-input"
                            class="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100"
                        >
                            <svg
                                class="h-2.5 w-2.5 text-gray-900"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 18 2"
                            >
                                <path
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M1 1h16"
                                />
                            </svg>
                        </button>
                        <input
                            type="text"
                            id="counter-input"
                            data-input-counter
                            class="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0"
                            placeholder=""
                            value="2"
                            required
                        />
                        <button
                            type="button"
                            id="increment-button"
                            data-input-counter-increment="counter-input"
                            class="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100"
                        >
                            <svg
                                class="h-2.5 w-2.5 text-gray-900"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 18 18"
                            >
                                <path
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M9 1v16M1 9h16"
                                />
                            </svg>
                        </button> */}
                        <span>Qty: {item.quantity}</span>
                    </div>
                    <div class="text-end md:order-3 md:w-32">
                        <p class="text-base text-center font-bold text-gray-900">
                            Total: ${item.total_price}
                        </p>
                    </div>
                </div>

                <div class="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-3xl">
                    <div class="flex gap-4">
                        <span class="text-base font-medium text-gray-900">
                            <p>{item.product.name}</p>
                            <p>Manufacturer: {item.product?.manufacturer}</p>
                            <p>Item Code: {item.product.item_code}</p>
                            {/* <p>Sku: ML_MDT11_2</p> */}
                            <p>Size: {item.size}</p>
                        </span>
                        <div className="flex gap-2">
                            <div className="w-52">
                                <span className="font-bold">
                                    Logo Embroidery
                                </span>
                                {item?.wayne_logo ? (
                                    <p>wayne Health logo: {item.wayne_logo}</p>
                                ) : null}
                                {item?.co_brand_logo ? (
                                    <p>co-brand logo: {item.co_brand_logo}</p>
                                ) : null}
                                {item?.official_logo ? (
                                    <p>official logo: {item.official_logo}</p>
                                ) : null}
                            </div>
                            <div>
                                <span className="font-bold">
                                    Lines Embroidery
                                </span>
                                {item?.line1 ? (
                                    <p>Line 1: {item.line1}</p>
                                ) : null}
                                {item?.line2 ? (
                                    <p>Line 2: {item.line2}</p>
                                ) : null}
                                {item?.line3 ? (
                                    <p>Line 3: {item.line3}</p>
                                ) : null}
                            </div>
                        </div>
                    </div>

                    <div class="flex items-center gap-4">
                        <Link
                            to={"/customer/edit-cartItem/" + item.id}
                            class="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 hover:underline"
                        >
                            Update
                        </Link>

                        <button
                            type="button"
                            onClick={handleDelete}
                            class="inline-flex items-center text-sm font-medium text-red-600 hover:underline"
                        >
                            <svg
                                class="me-1.5 h-5 w-5"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M6 18 17.94 6M18 18 6.06 6"
                                />
                            </svg>
                            Remove
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPageItem;
