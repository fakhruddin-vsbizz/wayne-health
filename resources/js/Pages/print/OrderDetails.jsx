import React, { useEffect, useRef, useState } from "react";
import CustomTable from "../../Components/CustomTable";
import axios from "axios";
import { useReactToPrint } from "react-to-print";
import moment from "moment";
import { primaryGreen } from "../../constantVriables";

const columns = ["Item", "Price", "Quantity", "Total", "Additional Info"];

const OrderDetails = ({ orderId, style }) => {
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

            <section ref={contentRef} className="text-sm">
                <h1 className="text-2xl text-red-500">
                    www.upgmarket.com Order.
                </h1>

                <span className="text-sm font-bold">
                    Your Order #{orderDetails.order_number} (placed on{" "}
                    {moment(orderDetails.created_at).format(
                        "MMMM Do YYYY, h:mm:ss a"
                    )}
                    )
                </span>
                <div className="p-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="border bg-gray-100">
                        <h2
                            style={{ color: primaryGreen }}
                            className="text-lg font-bold border-b bg-green-100 px-4 py-1"
                        >
                            Bill To:
                        </h2>
                        <div className="flex flex-col px-4 py-1">
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
                    <div className="border bg-gray-100">
                        <h2
                            style={{ color: primaryGreen }}
                            className="text-lg font-bold border-b bg-green-100 px-4 py-1"
                        >
                            Ship To:
                        </h2>
                        <div className="flex flex-col px-4 py-1">
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
                    <div className="border bg-gray-100">
                        <h2
                            style={{ color: primaryGreen }}
                            className="text-lg font-bold border-b bg-green-100 px-4 py-1"
                        >
                            Payment Summary:
                        </h2>
                        <div className="flex flex-col px-4 py-1">
                            <span>Payment Summary:</span>
                            <div>
                                <div>
                                    <span>Subtotal: </span>
                                    <span>${Number(total).toFixed(2)}</span>
                                </div>
                                <div>
                                    <span>Shipping(Ground Service):</span>
                                    <span>$0.00</span>
                                </div>
                                <div>
                                    <span>Tax:</span>
                                    <span>$0.00</span>
                                </div>
                                <div>
                                    <span>Order Total:</span>
                                    <span>${Number(total).toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="border bg-gray-100">
                        <h2
                            style={{ color: primaryGreen }}
                            className="text-lg font-bold border-b bg-green-100 px-4 py-1"
                        >
                            Payment Info:
                        </h2>
                        <div className="flex flex-col px-4 py-1">
                            <h3>Cost Center:</h3>
                            <span>{orderDetails.cost_center}</span>
                        </div>
                    </div>
                </div>
                <div className="w-full ">
                    <CustomTable
                        style={style}
                        noActionBtn={true}
                        columns={columns}
                    >
                        {orderItems.map((row) => {
                            const additionalCharges =
                                Number(row.embroidery_lines_cost) +
                                Number(row.embroidery_logo_cost) +
                                Number(row.wayne_logo_price);

                            const total_price_for_one =
                                Number(row.price) * row.quantity;

                            const totalAdditionalCharges =
                                additionalCharges * row.quantity;

                            return (
                                <tr
                                    key={row.id}
                                    className="bg-gray-100 transition-all duration-500 hover:bg-gray-200 "
                                >
                                    <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900 ">
                                        <span className="flex flex-col gap-1 text-sm">
                                            <span className="max-w-40 text-wrap">
                                                {row.name}
                                            </span>{" "}
                                            <span>
                                                Manufacturer: {row.manufacturer}
                                            </span>{" "}
                                            <span>
                                                Item Code:{" "}
                                                {row.product.item_code}
                                            </span>{" "}
                                            {row?.product?.colors ? (
                                                <span>
                                                    Color: {row.product.colors}
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
                                                <span>Size: {row.size}</span>
                                            ) : null}{" "}
                                            {row?.productLength ? (
                                                <span>
                                                    Length: {row.productLength}
                                                </span>
                                            ) : null}{" "}
                                        </span>
                                    </td>
                                    <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                                        <span className="flex flex-col gap-1 text-sm">
                                            <span>
                                                ${Number(row.price).toFixed(2)}
                                            </span>
                                            <span>
                                                Additions: $
                                                {Number(
                                                    additionalCharges
                                                ).toFixed(2)}
                                            </span>
                                            <span>
                                                Total: $
                                                {Number(
                                                    total_price_for_one
                                                ).toFixed(2)}
                                            </span>
                                        </span>
                                    </td>
                                    <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                                        <span className="text-sm">
                                            {" "}
                                            {row?.quantity}
                                        </span>
                                    </td>
                                    <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                                        <span className="flex flex-col gap-1 text-sm">
                                            {additionalCharges === 0 ? (
                                                <span>
                                                    $
                                                    {Number(
                                                        Number(row.price) *
                                                            row.quantity
                                                    ).toFixed(2)}
                                                </span>
                                            ) : (
                                                <span className="line-through">
                                                    $
                                                    {Number(
                                                        Number(row.price) *
                                                            row.quantity
                                                    ).toFixed(2)}
                                                </span>
                                            )}
                                            <span>
                                                Additions: $
                                                {Number(
                                                    totalAdditionalCharges
                                                ).toFixed(2)}
                                            </span>
                                            <span>
                                                Total: $
                                                {Number(
                                                    row.total_price
                                                ).toFixed(2)}
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
                                    <td className=" p-5 ">
                                        <span className="flex flex-col text-gray-900 text-sm">
                                            {row.product
                                                ?.wayne_logo_position ? (
                                                <span>
                                                    Wayne Health Logo $
                                                    {
                                                        row.product
                                                            .wayne_logo_price
                                                    }
                                                    : {""}
                                                    {row?.wayne_logo === "yes"
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
                                                        : {row?.co_brand_logo}
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
                                            {row.product?.embroidery_lines ===
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
                                            {row.product?.embroidery_lines ===
                                            "line2" ? (
                                                <>
                                                    {row?.line1 ? (
                                                        <span>
                                                            Line 1 $
                                                            {
                                                                row.embroidery_lines_cost
                                                            }
                                                            : {row?.line1}
                                                        </span>
                                                    ) : null}
                                                    {row?.line2 ? (
                                                        <span>
                                                            Line 2: {row?.line2}
                                                        </span>
                                                    ) : null}
                                                </>
                                            ) : null}
                                            {row.product?.embroidery_lines ===
                                            "line3" ? (
                                                <>
                                                    {row?.line1 ? (
                                                        <span>
                                                            Line 1 $
                                                            {
                                                                row.embroidery_lines_cost
                                                            }
                                                            : {row?.line1}
                                                        </span>
                                                    ) : null}
                                                    {row?.line2 ? (
                                                        <span>
                                                            Line 2: {row?.line2}
                                                        </span>
                                                    ) : null}
                                                    {row?.line3 ? (
                                                        <span>
                                                            Line 3: {row?.line3}
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
                    <div className="flex flex-col justify-self-center mb-4 mt-1 w-[99.1%] p-4 bg-gray-100 transition-all duration-500 hover:bg-gray-200 ">
                        <div className="flex justify-between w-full">
                            <span>Subtotal: </span>
                            <span>${Number(total).toFixed(2)}</span>
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
                            <span>${Number(total).toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default OrderDetails;
