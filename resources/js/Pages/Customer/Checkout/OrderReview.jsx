import React, { useEffect, useState } from "react";
import { Breadcrumbs } from "../../../Components/CheckoutStepper";
import {
    primaryGreen,
    primaryYellow,
    toastOptions,
} from "../../../constantVriables";
import CustomTable from "../../../Components/CustomTable";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import UpdateCart from "../../../Components/UpdateCart";
import { toast } from "react-toastify";
import ReactDOMServer from "react-dom/server";
import OrderConfirmationMail from "../mail/OrderConfirmationMail";
import FormInputField from "../../../Components/FormInputField";

const columns = [
    "Item",
    "Price",
    "Quantity",
    "Total",
    "Remove",
    "Additional Information",
];

const OrderReview = ({
    setCurrentPage,
    links,
    orderDetails,
    setCartIsUpdated,
}) => {
    const [cartItems, setCartItems] = useState([]);
    const [cartId, setCartId] = useState("");

    const [total, setTotal] = useState(0);

    const navigate = useNavigate();

    const [isUpdated, setIsUpdated] = useState(false);

    const [isEdit, setIsEdit] = useState(false);

    const [editId, setEditId] = useState(null);

    const [quantity, setQuantity] = useState(0);

    const updateQty = (id) => {
        console.log(quantity, id);

        const token = localStorage.getItem("x-wayne-health-token");

        axios
            .put(
                "/api/customer/cart/update-quantity/" + id,
                {
                    quantity: Number(quantity),
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: "application/json",
                    },
                }
            )
            .then((data) => {
                console.log(data);
                if (data?.data) {
                    setIsUpdated((prev) => !prev);
                    setIsEdit(false);
                    toast.success(
                        "Quantity updated successfully",
                        toastOptions
                    );
                    // setTotal(data.data.total);
                }
            })
            .catch((err) => console.log(err));
    };

    const onEdit = (id) => {
        setIsEdit(true);
        setEditId(id);
        setQuantity(cartItems.filter((fItem) => fItem.id === id)[0].quantity);
    };

    const onDeleteCartItem = (id) => {
        const token = localStorage.getItem("x-wayne-health-token");
        axios
            .delete("/api/customer/cart/" + id, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                },
            })
            .then((data) => {
                console.log(data);
                console.log(data.data.cartItems);
                if (data?.data?.success) {
                    setIsUpdated((prev) => !prev);
                }
            })
            .catch((err) => console.log(err));
    };

    const onPlaceOrder = (e) => {
        console.log(orderDetails);
        const token = localStorage.getItem("x-wayne-health-token");
        let newOrderDetails = {
            ...orderDetails,
            cartId: cartId,
        };
        axios
            .post("/api/customer/order", newOrderDetails, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            })
            .then((data) => {
                console.log(data);
                if (data?.data) {
                    navigate("/customer/order-confirmation", {
                        state: { orderId: data.data.order.id },
                    });

                    toast.success("your order has been placed", toastOptions);
                    const props = {
                        orderItems: data.data.orderItems,
                        orderDetails: data.data.order,
                        customer: data.data.customer,
                        total: data.data.total,
                        style: {
                            padding: "1rem 5px",
                        },
                    };

                    const emailHtml = ReactDOMServer.renderToStaticMarkup(
                        <OrderConfirmationMail {...props} />
                    );

                    axios
                        .post(
                            "/api/customer/send-order-confirmation-email",
                            { emailHtml: emailHtml },
                            {
                                headers: {
                                    Authorization: `Bearer ${token}`,
                                    Accept: "application/json",
                                    "Content-Type": "application/json",
                                },
                            }
                        )
                        .then((data) => {
                            console.log(data);
                            setCartIsUpdated((prev) => !prev);
                            console.log("Email sent successfully:", data);
                        })
                        .catch((error) =>
                            console.error("Error sending email:", error)
                        );
                    // setCustomers(data.data);
                }
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        const token = localStorage.getItem("x-wayne-health-token");
        axios
            .get("/api/customer/cart", {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                },
            })
            .then((data) => {
                console.log(data);
                console.log(data.data.cartItems);
                if (data?.data) {
                    setCartItems(data.data.cartItems);
                    setCartId(data.data.cartId);
                    setTotal(data.data.total);
                }
            })
            .catch((err) => console.log(err));
    }, [isUpdated]);

    return (
        <div
            style={{ border: `1px ${primaryYellow} solid` }}
            className="bg-white shadow-md rounded-lg p-6 mt-8 max-w-7xl"
        >
            <Breadcrumbs setCurrentPage={setCurrentPage} links={links} />
            <h2 class="text-xl font-semibold mb-2 mt-6 ">Order Review</h2>
            <div className="container mx-auto p-4">
                <p>
                    Your purchase confirmation will be emailed to you from
                    orders@alykostores.com. Please watch for your purchase
                    confirmation from this email address.
                </p>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 mt-8">
                    <div className="flex flex-col gap-2 border rounded-md p-4 w-full mx-auto max-w-2xl">
                        <h3 style={{ color: primaryGreen }}>Ship to:</h3>
                        <p>{orderDetails.shippingAddress.ship_to_name}</p>
                        <p>{orderDetails.shippingAddress.ship_to_company}</p>
                        <p>{orderDetails.shippingAddress.address_line_1}</p>
                        <p>{orderDetails.shippingAddress.city}</p>
                    </div>
                    <div className="flex flex-col gap-2 border rounded-md p-4 w-full mx-auto max-w-2xl">
                        <h3 style={{ color: primaryGreen }}>
                            Shipping Method:
                        </h3>
                        <p>Ground Service (Will be billed on invoice.)</p>
                        <p>Shipping cost: $0.00</p>
                    </div>
                    <div className="flex flex-col gap-2 border rounded-md p-4 w-full mx-auto max-w-2xl">
                        <h3 style={{ color: primaryGreen }}>Payment Method:</h3>
                        <p>Cost Center Number: {orderDetails.cost_center}</p>
                    </div>
                </div>
                <div>
                    <CustomTable noActionBtn={true} columns={columns}>
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
                                            <span>{row.product.name}</span>{" "}
                                            <span>
                                                Manufacturer:{" "}
                                                {row.product.manufacturer}
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
                                        </div>
                                    </td>
                                    <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                                        <div className="flex flex-col gap-2">
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
                                        </div>
                                    </td>
                                    <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                                        {isEdit && row.id === editId ? (
                                            <div>
                                                <FormInputField
                                                    id="quantity"
                                                    name="quantity"
                                                    value={quantity}
                                                    onChange={(e) => {
                                                        setQuantity(
                                                            e.target.value
                                                        );
                                                    }}
                                                />
                                                <button
                                                    onClick={() =>
                                                        updateQty(row.id)
                                                    }
                                                >
                                                    Update Qty
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="flex flex-col gap-2 items-start">
                                                <span>{row.quantity}</span>
                                                <button
                                                    onClick={() =>
                                                        onEdit(row.id)
                                                    }
                                                >
                                                    Edit Qty
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                    <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                                        <div className="flex flex-col gap-2">
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
                                                Total: ${row.total_price}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
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
                                    </td>
                                    <td className=" p-5 ">
                                        <UpdateCart
                                            setIsUpdated={setIsUpdated}
                                            cartItem={row}
                                        />
                                    </td>
                                </tr>
                            );
                        })}
                    </CustomTable>
                    <div className="flex justify-center my-5">
                        <Link
                            to={"/customer/cart/"}
                            className="text-blue-500 hover:text-blue-700"
                        >
                            Adjust Cart
                        </Link>
                    </div>
                </div>
                <div class="ml-auto mr-56 max-w-xl flex-1 space-y-6 lg:mt-0 lg:w-full">
                    <div class="space-y-4 rounded-lg border border-gray-700 bg-white p-4 shadow-sm  sm:p-6">
                        <div class="space-y-4">
                            <dl class="flex items-center justify-between gap-4 pt-2">
                                <dt class="text-base font-bold text-gray-900">
                                    Total
                                </dt>
                                <dd class="text-base font-bold text-gray-900">
                                    ${total}
                                </dd>
                            </dl>
                        </div>

                        <Link
                            to={"/customer/checkout"}
                            style={{ backgroundColor: primaryGreen }}
                            onClick={onPlaceOrder}
                            class="flex w-full items-center justify-center rounded-lg px-5 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-primary-300"
                        >
                            Place Order
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderReview;
