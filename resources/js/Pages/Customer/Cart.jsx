import React, { useEffect, useState } from "react";
import CartPageItem from "../../Components/CartPageItem";
import { Link, useParams } from "react-router-dom";
import CustomTable from "../../Components/CustomTable";
import UpdateCart from "../../Components/UpdateCart";
import {
    primaryGreen,
    primaryYellow,
    toastOptions,
} from "../../constantVriables";
import FormInputField from "../../Components/FormInputField";
import axios from "axios";
import { toast } from "react-toastify";
import moment from "moment";

const columns = [
    "Item",
    "Price",
    "Quantity",
    "Total",
    "Remove",
    "Additional Information",
];

const CartPage = ({ setCartIsUpdated }) => {
    // const {cartId} = useParams();

    const [cartItems, setCartItems] = useState([]);

    const [cartId, setCartId] = useState("");

    const [total, setTotal] = useState(0);

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
                    setCartIsUpdated((prev) => !prev);
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
    }, [isUpdated, cartId]);

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
                    setCartIsUpdated((prev) => !prev);
                    setIsUpdated((prev) => !prev);
                }
            })
            .catch((err) => console.log(err));
    };

    const onEdit = (id) => {
        setIsEdit(true);
        setEditId(id);
        setQuantity(cartItems.filter((fItem) => fItem.id === id)[0].quantity);
    };

    return cartItems.length === 0 ? (
        <div class="container mx-auto p-6">
            <div className="w-full flex flex-col items-center justify-center mb-4">
                <a href="https://www.alyko.com/" target="_blank">
                    <img src="/images/banner/welcome.png" alt="ALYKO banner" />
                </a>
            </div>
            <div
                style={{ border: `1px ${primaryYellow} solid` }}
                class="bg-white shadow-md rounded-lg p-6 pb-8"
            >
                <div>
                    <h1
                        style={{
                            color: primaryGreen,
                        }}
                        className="text-lg ml-10 pt-4 font-semibold"
                    >
                        Shopping Cart
                    </h1>
                    <div className="w-full flex justify-center">
                        <p className="w-1/3 text-center">
                            There are no items in your cart Please continue
                            shopping.
                        </p>
                    </div>
                </div>
            </div>
            <footer
                style={{
                    textAlign: "-webkit-center",
                }}
                className="pb-4 mt-8 flex items-center text-center"
            >
                <div className="w-full">
                    <hr className="border-black w-10/12 mb-4" />
                    <div className="flex gap-8 justify-center items-center">
                        <div>
                            <p>
                                Copyright © {moment().year()} www.upgmarket.com
                            </p>
                            <a
                                className="text-blue-600 underline"
                                target="_blank"
                                href="https://www.alyko.com/"
                            >
                                www.alyko.com
                            </a>
                        </div>
                        <div>
                            <Link
                                to="/customer/return-policy"
                                className="text-blue-500"
                            >
                                Return Policy
                            </Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    ) : (
        <div>
            <CustomTable noActionBtn={true} columns={columns}>
                {cartItems.map((row) => {
                    const additionalCharges =
                        Number(row.embroidery_lines_cost) +
                        Number(row.embroidery_logo_cost) +
                        Number(row.wayne_logo_price);

                    // const total_price_for_one = row.price + additionalCharges;

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
                                        Manufacturer: {row.product.manufacturer}
                                    </span>{" "}
                                    <span>
                                        Item Code: {row.product.item_code}
                                    </span>{" "}
                                    {row?.product?.colors ? (
                                        <span>Color: {row.product.colors}</span>
                                    ) : null}{" "}
                                    {row?.inseam ? (
                                        <span>Inseam: {row.inseam}</span>
                                    ) : null}{" "}
                                    {row?.fit ? (
                                        <span>Fit: {row.fit}</span>
                                    ) : null}{" "}
                                    {row?.size ? (
                                        <span>Size: {row.size}</span>
                                    ) : null}{" "}
                                    {row?.productLength ? (
                                        <span>Length: {row.productLength}</span>
                                    ) : null}{" "}
                                </div>
                            </td>
                            <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                                <div className="flex flex-col gap-2">
                                    <span>${row.price}</span>
                                    <span>Additions: ${additionalCharges}</span>
                                    <span>
                                        Total: ${row.total_price_for_one}
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
                                                setQuantity(e.target.value);
                                            }}
                                        />
                                        <button
                                            onClick={() => updateQty(row.id)}
                                        >
                                            Update Qty
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex flex-col gap-2 items-start">
                                        <span>{row.quantity}</span>
                                        <button onClick={() => onEdit(row.id)}>
                                            Edit Qty
                                        </button>
                                    </div>
                                )}
                            </td>
                            <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                                <div className="flex flex-col gap-2">
                                    <span className="line-through">
                                        ${row.price * row.quantity}
                                    </span>

                                    <span>
                                        Additions: ${totalAdditionalCharges}
                                    </span>
                                    <span>Total: ${row.total_price}</span>
                                </div>
                            </td>
                            <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                                <button
                                    onClick={() => onDeleteCartItem(row.id)}
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
                        class="flex w-full items-center justify-center rounded-lg px-5 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-primary-300"
                    >
                        Proceed to Checkout
                    </Link>
                </div>
            </div>
            <footer
                style={{
                    textAlign: "-webkit-center",
                }}
                className="pb-4 mt-8 flex items-center text-center"
            >
                <div className="w-full">
                    <hr className="border-black w-10/12 mb-4" />
                    <div className="flex gap-8 justify-center items-center">
                        <div>
                            <p>
                                Copyright © {moment().year()} www.upgmarket.com
                            </p>
                            <a
                                className="text-blue-600 underline"
                                target="_blank"
                                href="https://www.alyko.com/"
                            >
                                www.alyko.com
                            </a>
                        </div>
                        <div>
                            <Link
                                to="/customer/return-policy"
                                className="text-blue-500"
                            >
                                Return Policy
                            </Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default CartPage;

// return (
//     <div className="mb-8 flex flex-col gap-8">
//         {cartItems.map((item) => (
//             <CartPageItem
//                 key={item.id}
//                 item={item}
//                 setIsUpdated={setIsUpdated}
//             />
//         ))}

//         <div class="ml-auto mr-56 max-w-xl flex-1 space-y-6 lg:mt-0 lg:w-full">
//             <div class="space-y-4 rounded-lg border border-gray-700 bg-white p-4 shadow-sm  sm:p-6">
//                 <div class="space-y-4">
//                     <dl class="flex items-center justify-between gap-4 pt-2">
//                         <dt class="text-base font-bold text-gray-900">
//                             Total
//                         </dt>
//                         <dd class="text-base font-bold text-gray-900">
//                             ${total}
//                         </dd>
//                     </dl>
//                 </div>

//                 <Link
//                     to={"/customer/checkout/" + cartId}
//                     class="flex w-full items-center justify-center rounded-lg px-5 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-primary-300"
//                 >
//                     Proceed to Checkout
//                 </Link>
//             </div>
//         </div>

//         {/* <div className="max-w-7xl mx-auto mt-8">{total}</div> */}

//         {/* <CartPageItem />;
//         <CartPageItem />; */}
//     </div>
// );
