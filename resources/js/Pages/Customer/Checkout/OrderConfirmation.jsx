import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import CustomTable from "../../../Components/CustomTable";
import { Link, useLocation, useParams } from "react-router-dom";
import { primaryGreen, primaryYellow } from "../../../constantVriables";
import UpdateCart from "../../../Components/UpdateCart";
import { useReactToPrint } from "react-to-print";

const columns = ["Item", "Price", "Quantity", "Total", "Additional Info"];

const OrderConfirmation = () => {
    const [cartItems, setCartItems] = useState([]);
    const [cartId, setCartId] = useState("");

    const [orderIdState, setOrderIdState] = useState(null);

    const [isLoading, setIsLoading] = useState(false);

    const [total, setTotal] = useState(0);

    // const { orderId } = useParams();
    const location = useLocation();

    useEffect(() => {
        if (location?.state?.orderId) {
            setOrderIdState(location?.state?.orderId);
        }
    }, [location?.state?.orderId]);

    const [isUpdated, setIsUpdated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("x-wayne-health-token");
        setIsLoading(true);
        if (orderIdState) {
            axios
                .get("/api/customer/order/" + orderIdState, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: "application/json",
                    },
                })
                .then((data) => {
                    console.log(data);
                    console.log(data.data.cartItems);
                    if (data?.data) {
                        setCartItems(data.data.orderItems);
                        setCartId(data.data.order);
                        setTotal(data.data.total);
                        setIsLoading(false);
                    }
                })
                .catch((err) => console.log(err));
        }
    }, [orderIdState]);

    const contentRef = useRef(null);

    const handlePrint = useReactToPrint({
        contentRef,
        pageStyle: "p-4",
    });

    return isLoading ? (
        <div class="container mx-auto p-6">
            <div className="w-full flex flex-col items-center justify-center mb-4">
                <a href="https://www.alyko.com/" target="_blank">
                    <img src="/images/banner/welcome.png" alt="ALYKO banner" />
                </a>
            </div>
            <div
                style={{ border: `1px ${primaryYellow} solid` }}
                class="bg-white shadow-md rounded-lg p-6 flex justify-center"
            >
                <svg
                    class="text-gray-300 animate-spin"
                    viewBox="0 0 64 64"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    width="50"
                    height="50"
                >
                    <path
                        d="M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80099 17.3838 6.66487 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3L32 3Z"
                        stroke="currentColor"
                        stroke-width="5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    ></path>
                    <path
                        d="M32 3C36.5778 3 41.0906 4.08374 45.1692 6.16256C49.2477 8.24138 52.7762 11.2562 55.466 14.9605C58.1558 18.6647 59.9304 22.9531 60.6448 27.4748C61.3591 31.9965 60.9928 36.6232 59.5759 40.9762"
                        stroke="currentColor"
                        stroke-width="5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="text-green-500"
                    ></path>
                </svg>
            </div>
        </div>
    ) : (
        <>
            {/* <div className="w-full flex justify-center items-center my-4 px-16">
                <section className="w-full">
                    <div className="w-full flex justify-between">
                        <div className="flex flex-col gap-4">
                            <div>
                                <h1 className="text-2xl text-red-500">
                                    www.upmarket.com Order Confirmation
                                </h1>
                                <p className="text-gray-500 underline">
                                    The following order has been placed:
                                </p>
                            </div>
                            <div className="border bg-gray-100">
                                <h2
                                    style={{ color: primaryGreen }}
                                    className="text-lg font-bold border-b bg-green-100 px-4 py-1"
                                >
                                    Ship To:
                                </h2>
                                <div className="flex flex-col px-4 py-1">
                                    <span>Ground Service</span>
                                    <span>{cartId.shipping_ship_to_name}</span>
                                    <span>
                                        {cartId.shipping_ship_to_company}
                                    </span>
                                    <span>
                                        {cartId.shipping_address_line_1}
                                    </span>
                                    <span>
                                        {cartId.shipping_address_line_2}
                                    </span>
                                    <span>
                                        {cartId.shipping_postal_code}{" "}
                                        {cartId.shipping_city}
                                    </span>
                                    <span>{cartId.shipping_country}</span>
                                </div>
                            </div>
                        </div>
                        <h2 className="text-2xl text-red-500">
                            Order Number: {cartId.order_number}
                        </h2>
                        <div className="print:hidden">
                            <button
                                onClick={handlePrint}
                                style={{ backgroundColor: primaryGreen }}
                                className="bg-cyan-500 px-6 py-2 text-white border border-cyan-500 font-bold rounded-md mb-3 w-full lg:w-fit my-6 mt-0 max-w-sm"
                            >
                                Print
                            </button>
                        </div>
                    </div>
                    <div className="w-full">
                        <CustomTable
                            style={{
                                padding: "1rem 5px",
                                margin: "0",
                            }}
                            noActionBtn={true}
                            columns={columns}
                        >
                            {cartItems.map((row) => {
                                const additionalCharges =
                                    Number(row.embroidery_lines_cost) +
                                    Number(row.embroidery_logo_cost) +
                                    Number(row.wayne_logo_price);

                                const total_price_for_one =
                                    Number(row.price) + additionalCharges;

                                const totalAdditionalCharges =
                                    additionalCharges * row.quantity;

                                return (
                                    <tr
                                        key={row.id}
                                        className="bg-white transition-all duration-500 hover:bg-gray-50"
                                    >
                                        <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900 ">
                                            <div className="flex flex-col gap-2">
                                                <span>{row.name}</span>{" "}
                                                <span>
                                                    Manufacturer:{" "}
                                                    {row.manufacturer}
                                                </span>{" "}
                                                {row?.product?.colors ? (
                                                    <span>
                                                        Color:{" "}
                                                        {row.product.colors}
                                                    </span>
                                                ) : null}{" "}
                                                {row?.inseam ? (
                                                    <span>
                                                        Inseam: {row.inseam}
                                                    </span>
                                                ) : null}{" "}
                                                {row?.fit ? (
                                                    <span>Fit: {row.fit}</span>
                                                ) : null}{" "}
                                                {row?.size ? (
                                                    <span>
                                                        Size: {row.size}
                                                    </span>
                                                ) : null}{" "}
                                                {row?.productLength ? (
                                                    <span>
                                                        Length:{" "}
                                                        {row.productLength}
                                                    </span>
                                                ) : null}{" "}
                                            </div>
                                        </td>
                                        <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                                            <div className="flex flex-col gap-2">
                                                <span>${row.price}</span>
                                                <span>
                                                    Additions: $
                                                    {additionalCharges}
                                                </span>
                                                <span>
                                                    Total: $
                                                    {Number(
                                                        total_price_for_one
                                                    ).toFixed(2)}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                                            {" "}
                                            {row?.quantity}
                                        </td>
                                        <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                                            <div className="flex flex-col gap-2">
                                                {additionalCharges === 0 ? (
                                                    <span>
                                                        $
                                                        {row.price *
                                                            row.quantity}
                                                    </span>
                                                ) : (
                                                    <span className="line-through">
                                                        $
                                                        {row.price *
                                                            row.quantity}
                                                    </span>
                                                )}
                                                <span>
                                                    Additions: $
                                                    {totalAdditionalCharges}
                                                </span>
                                                <span>
                                                    Total: ${row.total_price}
                                                </span>
                                            </div>
                                        </td>
                                        <td className=" p-5 ">
                                            <UpdateCart
                                                noupdate={true}
                                                setIsUpdated={setIsUpdated}
                                                cartItem={row}
                                            />
                                        </td>
                                    </tr>
                                );
                            })}
                        </CustomTable>
                        <div className="py-4 px-4 flex flex-col justify-self-start mb-4 mt-1 w-[92%] p-4 bg-gray-100 transition-all duration-500 hover:bg-gray-200 ">
                            <div className="flex justify-between w-full">
                                <span>Subtotal: </span>
                                <span>${total}.00</span>
                            </div>
                            <div className="flex justify-between w-full">
                                <span>Shipping(Ground Service):</span>
                                <span>$0.00</span>
                            </div>
                            <div className="flex justify-between w-full">
                                <span>Tax:</span>
                                <span>$0.00</span>
                            </div>
                            <div className="flex justify-between w-full">
                                <span>Order Total:</span>
                                <span>${total}.00</span>
                            </div>
                        </div>
                    </div>
                    <div className="mx-4 my-8 text-black">
                        <hr className="border-black w-1/3 mb-4" />
                        <p className="mb-3">
                            Return Policy & Disclaimers: - Garments are not
                            returnable.
                        </p>
                        <ul className="list-disc">
                            <li className="ml-10">
                                <p>
                                    Please make sure the size is correct, and
                                    all personalization information and
                                    spellings are checked prior to placing the
                                    order.
                                </p>
                            </li>
                            <li className="ml-10">
                                <p>
                                    Turn garments inside out and wash according
                                    to the manufacturer's laundering
                                    instructions. We are not responsible for
                                    incorrectly laundered garments.
                                </p>
                            </li>
                        </ul>
                        <hr className="border-black w-1/3 mt-4" />
                    </div>
                </section>
            </div> */}
            <div className="w-full block my-4 px-16">
                <section ref={contentRef} className="w-full text-xs">
                    <div className="w-full flex justify-between">
                        <div className="flex flex-col gap-4">
                            <div>
                                <h1 className="text-2xl text-red-500">
                                    www.upmarket.com Order Confirmation
                                </h1>
                                <p className="text-gray-500 underline">
                                    The following order has been placed:
                                </p>
                            </div>
                            <div className="border bg-gray-100">
                                <h2
                                    style={{ color: primaryGreen }}
                                    className="text-lg font-bold border-b bg-green-100 px-4 py-1"
                                >
                                    Ship To:
                                </h2>
                                <div className="flex flex-col px-4 py-1">
                                    <span>Ground Service</span>
                                    <span>{cartId.shipping_ship_to_name}</span>
                                    <span>
                                        {cartId.shipping_ship_to_company}
                                    </span>
                                    <span>
                                        {cartId.shipping_address_line_1}
                                    </span>
                                    <span>
                                        {cartId.shipping_address_line_2}
                                    </span>
                                    <span>
                                        {cartId.shipping_postal_code}{" "}
                                        {cartId.shipping_city}
                                    </span>
                                    <span>{cartId.shipping_country}</span>
                                </div>
                            </div>
                        </div>
                        <h2 className="text-xl text-red-500">
                            Order Number: {cartId.order_number}
                        </h2>
                        <div className="print:hidden">
                            <button
                                onClick={handlePrint}
                                style={{ backgroundColor: primaryGreen }}
                                className="bg-cyan-500 px-6 py-2 text-white border border-cyan-500 font-bold rounded-md mb-3 w-full lg:w-fit my-6 mt-0 max-w-sm"
                            >
                                Print
                            </button>
                        </div>
                    </div>
                    <div className="w-full">
                        <CustomTable
                            style={{
                                padding: "1rem 5px",
                                margin: "0",
                            }}
                            noActionBtn={true}
                            columns={columns}
                        >
                            {cartItems.map((row) => {
                                const additionalCharges =
                                    Number(row.embroidery_lines_cost) +
                                    Number(row.embroidery_logo_cost) +
                                    Number(row.wayne_logo_price);

                                const total_price_for_one =
                                    Number(row.price) + additionalCharges;

                                const totalAdditionalCharges =
                                    additionalCharges * row.quantity;

                                return (
                                    <tr
                                        key={row.id}
                                        className="bg-white transition-all duration-500 hover:bg-gray-50"
                                    >
                                        <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900 ">
                                            <div className="flex flex-col gap-2">
                                                <span className="max-w-40 text-wrap text-xs">
                                                    {row.name}
                                                </span>{" "}
                                                <span className="text-xs">
                                                    Manufacturer:{" "}
                                                    {row.manufacturer}
                                                </span>{" "}
                                                {row?.product?.colors ? (
                                                    <span className="text-xs">
                                                        Color:{" "}
                                                        {row.product.colors}
                                                    </span>
                                                ) : null}{" "}
                                                {row?.inseam ? (
                                                    <span className="text-xs">
                                                        Inseam: {row.inseam}
                                                    </span>
                                                ) : null}{" "}
                                                {row?.fit ? (
                                                    <span className="text-xs">
                                                        Fit: {row.fit}
                                                    </span>
                                                ) : null}{" "}
                                                {row?.size ? (
                                                    <span className="text-xs">
                                                        Size: {row.size}
                                                    </span>
                                                ) : null}{" "}
                                                {row?.productLength ? (
                                                    <span className="text-xs">
                                                        Length:{" "}
                                                        {row.productLength}
                                                    </span>
                                                ) : null}{" "}
                                            </div>
                                        </td>
                                        <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                                            <div className="flex flex-col gap-2">
                                                <span className="text-xs">
                                                    ${row.price}
                                                </span>
                                                <span className="text-xs">
                                                    Additions: $
                                                    {additionalCharges}
                                                </span>
                                                <span className="text-xs">
                                                    Total: $
                                                    {Number(
                                                        total_price_for_one
                                                    ).toFixed(2)}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                                            <span className="text-xs">
                                                {" "}
                                                {row?.quantity}
                                            </span>
                                        </td>
                                        <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                                            <div className="flex flex-col gap-2">
                                                {additionalCharges === 0 ? (
                                                    <span className="text-xs">
                                                        $
                                                        {row.price *
                                                            row.quantity}
                                                    </span>
                                                ) : (
                                                    <span className="line-through text-xs">
                                                        $
                                                        {row.price *
                                                            row.quantity}
                                                    </span>
                                                )}
                                                <span className="text-xs">
                                                    Additions: $
                                                    {totalAdditionalCharges}
                                                </span>
                                                <span className="text-xs">
                                                    Total: ${row.total_price}
                                                </span>
                                            </div>
                                        </td>
                                        {/* <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                                        <button
                                            onClick={() =>
                                                onDeleteCartItem(row.id)
                                            }
                                            class="text-slate-800 hover:text-red-600 text-sm bg-white hover:bg-slate-100 rounded-r-lg font-medium px-4 py-2 inline-flex space-x-1 items-center"
                                        >
                                            <span>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke-width="1.5"
                                                    stroke="currentColor"
                                                    class="w-6 h-6"
                                                >
                                                    <path
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                                    />
                                                </svg>
                                            </span>
                                            <span class="hidden md:inline-block">
                                                Delete
                                            </span>
                                        </button>
                                    </td> */}
                                        <td className=" p-5 ">
                                            <span className="flex flex-col">
                                                {row.product
                                                    ?.wayne_logo_position ? (
                                                    <span className="text-xs">
                                                        Wayne Health Logo $
                                                        {
                                                            row.product
                                                                .wayne_logo_price
                                                        }
                                                        : {""}
                                                        {row?.wayne_logo ===
                                                        "yes"
                                                            ? row?.wayne_logo
                                                            : "no"}
                                                    </span>
                                                ) : null}
                                                {row.product
                                                    ?.co_brand_logo_position ? (
                                                    row?.co_brand_logo ? (
                                                        <span className="text-xs">
                                                            Co-brand Logo $
                                                            {
                                                                row.embroidery_logo_cost
                                                            }
                                                            :{" "}
                                                            {row?.co_brand_logo}
                                                        </span>
                                                    ) : null
                                                ) : null}
                                                {row.product
                                                    ?.official_logo_position ? (
                                                    row?.official_logo ? (
                                                        <span className="text-xs">
                                                            Official Logo $
                                                            {
                                                                row.embroidery_logo_cost
                                                            }
                                                            :
                                                        </span>
                                                    ) : null
                                                ) : null}
                                                {row.product
                                                    ?.embroidery_lines ===
                                                "line1" ? (
                                                    row?.line1 ? (
                                                        <span className="text-xs">
                                                            Line 1 $
                                                            {
                                                                row.embroidery_lines_cost
                                                            }
                                                            : {row?.line1}
                                                        </span>
                                                    ) : null
                                                ) : null}
                                                {row.product
                                                    ?.embroidery_lines ===
                                                "line2" ? (
                                                    <>
                                                        {row?.line1 ? (
                                                            <span className="text-xs">
                                                                Line 1 $
                                                                {
                                                                    row.embroidery_lines_cost
                                                                }
                                                                : {row?.line1}
                                                            </span>
                                                        ) : null}
                                                        {row?.line2 ? (
                                                            <span className="text-xs">
                                                                Line 2:{" "}
                                                                {row?.line2}
                                                            </span>
                                                        ) : null}
                                                    </>
                                                ) : null}
                                                {row.product
                                                    ?.embroidery_lines ===
                                                "line3" ? (
                                                    <>
                                                        {row?.line1 ? (
                                                            <span className="text-xs">
                                                                Line 1 $
                                                                {
                                                                    row.embroidery_lines_cost
                                                                }
                                                                : {row?.line1}
                                                            </span>
                                                        ) : null}
                                                        {row?.line2 ? (
                                                            <span className="text-xs">
                                                                Line 2:{" "}
                                                                {row?.line2}
                                                            </span>
                                                        ) : null}
                                                        {row?.line3 ? (
                                                            <span className="text-xs">
                                                                Line 3:{" "}
                                                                {row?.line3}
                                                            </span>
                                                        ) : null}
                                                    </>
                                                ) : null}
                                            </span>
                                        </td>
                                    </tr>
                                );
                            })}
                        </CustomTable>
                        <div className="py-4 px-4 flex flex-col justify-self-start mb-4 mt-1 w-[92%] p-4 bg-gray-100 transition-all duration-500 hover:bg-gray-200 ">
                            <div className="flex justify-between w-full">
                                <span>Subtotal: </span>
                                <span>${total}.00</span>
                            </div>
                            <div className="flex justify-between w-full">
                                <span>Shipping(Ground Service):</span>
                                <span>$0.00</span>
                            </div>
                            <div className="flex justify-between w-full">
                                <span>Tax:</span>
                                <span>$0.00</span>
                            </div>
                            <div className="flex justify-between w-full">
                                <span>Order Total:</span>
                                <span>${total}.00</span>
                            </div>
                        </div>
                    </div>
                    <div className="mx-4 my-8 text-black">
                        <hr className="border-black w-1/3 mb-4" />
                        <p className="mb-3">
                            Return Policy & Disclaimers: - Garments are not
                            returnable.
                        </p>
                        <ul className="list-disc">
                            <li className="ml-10">
                                <p>
                                    Please make sure the size is correct, and
                                    all personalization information and
                                    spellings are checked prior to placing the
                                    order.
                                </p>
                            </li>
                            <li className="ml-10">
                                <p>
                                    Turn garments inside out and wash according
                                    to the manufacturer's laundering
                                    instructions. We are not responsible for
                                    incorrectly laundered garments.
                                </p>
                            </li>
                        </ul>
                        <hr className="border-black w-1/3 mt-4" />
                    </div>
                </section>
            </div>
        </>
    );
};

export default OrderConfirmation;
