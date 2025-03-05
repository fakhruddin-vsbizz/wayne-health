import React, { useEffect, useRef, useState } from "react";
import CustomTable from "../../Components/CustomTable";
import axios from "axios";
import { useReactToPrint } from "react-to-print";
import { primaryGreen } from "../../constantVriables";

const columns = ["Product", "Quantity", "Price", "Total", "Additional Info"];

const PaySlip = ({ orderId, style }) => {
    const [orderItems, setOrderItems] = useState([]);
    const [orderDetails, setOrderDetails] = useState({});

    const [isUpdated, setIsUpdated] = useState(false);

    const [total, setTotal] = useState(0);

    const [customer, setCustomer] = useState({});

    console.log(customer);

    const contentRef = useRef(null);

    console.log(orderId);

    // const { orderId } = useParams();

    const handlePrint = useReactToPrint({
        contentRef,
        pageStyle: "p-4",
    });

    // const handlePrint = useReactToPrint({
    //     content: () => componentRef.current,
    //     documentTitle: `order-information`,
    //     onPrintError: () => alert("there is an error when printing"),
    // });

    useEffect(() => {
        const token = localStorage.getItem("x-wayne-health-token");
        axios
            .get("/api/customer/order/" + orderId, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                },
            })
            .then((data) => {
                console.log(data);
                // console.log(data.data.cartItems);
                if (data?.data) {
                    setOrderItems(data.data.orderItems);
                    setOrderDetails(data.data.order);
                    setCustomer(data.data.customer[0]);
                    setTotal(data.data.total);
                    // setCartId(data.data.cartId);
                    // setTotal(data.data.total);
                }
            })
            .catch((err) => console.log(err));
    }, [isUpdated]);

    return (
        <div className="w-full">
            <div className="print:hidden">
                <button
                    onClick={handlePrint}
                    style={{ backgroundColor: primaryGreen }}
                    className="bg-cyan-500 px-6 py-2 text-white border border-cyan-500 font-bold rounded-md mb-3 w-full lg:w-fit my-6 mt-0 max-w-sm"
                >
                    Print
                </button>
            </div>

            <section
                className="border-2 border-black p-4 text-sm"
                ref={contentRef}
            >
                <div className="border-b-2 p-2">
                    <h1 className="text-xl text-black">
                        www.upgmarket.com Order
                    </h1>

                    <span className="text-sm font-bold ">
                        Order Number: {orderDetails.order_number}
                    </span>
                </div>
                <div className="p-2 mt-2 grid grid-cols-1 md:grid-cols-3 gap-6 border-b-2 p-2">
                    <div className="">
                        <h2
                            style={{ color: primaryGreen }}
                            className="font-bold"
                        >
                            Bill To:
                        </h2>
                        <div className="flex flex-col py-1">
                            <span>{orderDetails.billing_ship_to_name}</span>
                            <span>{orderDetails.billing_ship_to_company}</span>
                            <span>{orderDetails.billing_address_line_1}</span>
                            <span>{orderDetails.billing_address_line_2}</span>
                            <span>
                                {orderDetails.billing_postal_code}{" "}
                                {orderDetails.billing_city}
                            </span>
                            <span>{orderDetails.billing_country}</span>
                            <span>{customer.phone}</span>
                            <span>{customer.email}</span>
                        </div>
                    </div>
                    <div className="">
                        <h2
                            style={{ color: primaryGreen }}
                            className="font-bold"
                        >
                            Ship To:
                        </h2>
                        <div className="flex flex-col py-1">
                            <span>Ground Service</span>
                            <span>{orderDetails.shipping_ship_to_name}</span>
                            <span>{orderDetails.shipping_ship_to_company}</span>
                            <span>{orderDetails.shipping_address_line_1}</span>
                            <span>{orderDetails.shipping_address_line_2}</span>
                            <span>
                                {orderDetails.shipping_postal_code}{" "}
                                {orderDetails.shipping_city}
                            </span>
                            <span>{orderDetails.shipping_country}</span>
                        </div>
                    </div>

                    <div className="">
                        <h2
                            style={{ color: primaryGreen }}
                            className="font-bold"
                        >
                            Purchase Order:
                        </h2>
                        <div className="flex gap-2 py-1">
                            <h3>PO No:</h3>
                            <span>{orderDetails.cost_center}</span>
                        </div>
                    </div>
                </div>
                <div className="w-full">
                    <h2
                        style={{ color: primaryGreen }}
                        className="text-lg font-bold px-2 mt-3"
                    >
                        Order Detail:
                    </h2>
                    <div>
                        <CustomTable
                            footer={
                                <>
                                    <tr className="text-black">
                                        <td
                                            colSpan={4}
                                            className="border-r-2 border-black border-b-2 text-end pr-2"
                                        >
                                            <span>Subtotal: </span>
                                        </td>
                                        <td className="border-r-2 border-black border-b-2 text-end pr-2">
                                            <span>
                                                ${Number(total).toFixed(2)}
                                            </span>
                                        </td>
                                    </tr>
                                    <tr className="text-black">
                                        <td
                                            colSpan={4}
                                            className="border-r-2 border-black border-b-2 text-end pr-2"
                                        >
                                            <span>Tax:</span>
                                        </td>
                                        <td className="border-r-2 border-black border-b-2 text-end pr-2">
                                            <span>$0.00</span>
                                        </td>
                                    </tr>
                                    <tr className="text-black">
                                        <td
                                            colSpan={4}
                                            className="border-r-2 border-black border-b-2 text-end pr-2"
                                        >
                                            <span>Order Total:</span>
                                        </td>
                                        <td className="border-r-2 border-black border-b-2 text-end pr-2">
                                            <span>
                                                ${Number(total).toFixed(2)}
                                            </span>
                                        </td>
                                    </tr>
                                </>
                            }
                            noColorHeader={true}
                            border={true}
                            style={style}
                            noActionBtn={true}
                            columns={columns}
                        >
                            {orderItems.map((row) => {
                                const additionalCharges =
                                    Number(row.embroidery_lines_cost) +
                                    Number(row.embroidery_logo_cost) +
                                    Number(row.wayne_logo_price);

                                const total_price_for_one = Number(
                                    Number(row.price) * row.quantity
                                ).toFixed(2);

                                const totalAdditionalCharges =
                                    additionalCharges * row.quantity;

                                return (
                                    <>
                                        <tr
                                            key={row.id}
                                            className="transition-all duration-500  border-b-2"
                                        >
                                            <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900 border-black border-2">
                                                <span className="flex flex-col gap-1 text-sm">
                                                    <span className="text-blue-600 underline max-w-40 text-wrap text-sm">
                                                        {row.name}
                                                    </span>{" "}
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
                                                        <span>
                                                            Fit: {row.fit}
                                                        </span>
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
                                                </span>
                                            </td>

                                            <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900 border-black border-2">
                                                {" "}
                                                {row?.quantity}
                                            </td>
                                            <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900 border-black border-2">
                                                <span className="flex flex-col gap-1 text-sm">
                                                    <span>${row.price}</span>
                                                    <span>
                                                        Additions: $
                                                        {additionalCharges}
                                                    </span>
                                                    <span>
                                                        Total: $
                                                        {total_price_for_one}
                                                    </span>
                                                </span>
                                            </td>
                                            <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900 border-black border-2">
                                                <span className="flex flex-col gap-1 text-sm">
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
                                                        Total: $
                                                        {row.total_price}
                                                    </span>
                                                </span>
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
                                            <td className=" p-5 border-black border-2">
                                                <span className="flex flex-col text-gray-900">
                                                    {row.product
                                                        ?.wayne_logo_position ? (
                                                        <span>
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
                                                            <span>
                                                                Co-brand Logo $
                                                                {
                                                                    row.embroidery_logo_cost
                                                                }
                                                                :{" "}
                                                                {
                                                                    row?.co_brand_logo
                                                                }
                                                            </span>
                                                        ) : null
                                                    ) : null}
                                                    {row.product
                                                        ?.official_logo_position ? (
                                                        row?.official_logo ? (
                                                            <span>
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
                                                            <span>
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
                                                                <span>
                                                                    Line 1 $
                                                                    {
                                                                        row.embroidery_lines_cost
                                                                    }
                                                                    :{" "}
                                                                    {row?.line1}
                                                                </span>
                                                            ) : null}
                                                            {row?.line2 ? (
                                                                <span>
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
                                                                <span>
                                                                    Line 1 $
                                                                    {
                                                                        row.embroidery_lines_cost
                                                                    }
                                                                    :{" "}
                                                                    {row?.line1}
                                                                </span>
                                                            ) : null}
                                                            {row?.line2 ? (
                                                                <span>
                                                                    Line 2:{" "}
                                                                    {row?.line2}
                                                                </span>
                                                            ) : null}
                                                            {row?.line3 ? (
                                                                <span>
                                                                    Line 3:{" "}
                                                                    {row?.line3}
                                                                </span>
                                                            ) : null}
                                                        </>
                                                    ) : null}
                                                </span>
                                            </td>
                                        </tr>
                                    </>
                                );
                            })}
                        </CustomTable>
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
                                Please make sure the size is correct, and all
                                personalization information and spellings are
                                checked prior to placing the order.
                            </p>
                        </li>
                        <li className="ml-10">
                            <p>
                                Turn garments inside out and wash according to
                                the manufacturer's laundering instructions. We
                                are not responsible for incorrectly laundered
                                garments.
                            </p>
                        </li>
                    </ul>
                    <hr className="border-black w-1/3 mt-4" />
                </div>
            </section>
        </div>
    );
};

export default PaySlip;
