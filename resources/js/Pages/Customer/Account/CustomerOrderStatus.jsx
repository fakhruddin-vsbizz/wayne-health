import React, { useEffect, useState } from "react";
import CustomTable from "../../../Components/CustomTable";
import FormInputField from "../../../Components/FormInputField";
import {
    order_status_options,
    primaryGreen,
    primaryYellow,
} from "../../../constantVriables";
import axios from "axios";
import moment from "moment";
import { Link } from "react-router-dom";

const columns = ["Date", "Order Number", "Status", "Ordered By", "Total"];

const CustomerOrderStatus = () => {
    const [orders, setOrders] = useState([]);
    const [customer, setCustomer] = useState({});

    useEffect(() => {
        const token = localStorage.getItem("x-wayne-health-token");
        axios
            .get("/api/customer/account/orderHistory", {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            })
            .then((data) => {
                console.log(data);
                console.log(data.data.cartItems);
                if (data?.data) {
                    const newData = data.data.orders.map((item) => {
                        const total_price = item.order_items.reduce(
                            (accumulator, currentValue) => {
                                console.log(accumulator);
                                console.log(currentValue);
                                return (
                                    Number(accumulator) +
                                    Number(currentValue.total_price)
                                );
                            },
                            0
                        );

                        return {
                            ...item,
                            total_price: total_price,
                        };
                    });
                    setOrders(newData);
                    setCustomer(data.data.customer);
                    // setCartItems(data.data.cartItems);
                    // setCartId(data.data.cartId);
                    // setTotal(data.data.total);
                }
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <div>
            <h1
                style={{
                    color: primaryGreen,
                }}
                className="text-lg ml-36 pt-4 font-semibold"
            >
                Order History
            </h1>
            <CustomTable noActionBtn={true} columns={columns}>
                {orders.map((row) => {
                    return (
                        <tr
                            key={row.id}
                            className="bg-white transition-all duration-500 hover:bg-gray-50"
                        >
                            <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900 ">
                                <div className="flex flex-col gap-2">
                                    <span>
                                        {moment(row.created_at).format(
                                            "MMMM Do YYYY, h:mm:ss a"
                                        )}
                                    </span>{" "}
                                </div>
                            </td>
                            <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                                <div className="flex flex-col gap-2">
                                    <span>{row.order_number}</span>
                                </div>
                            </td>
                            <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                                <div className="flex flex-col gap-2">
                                    <span>
                                        {
                                            order_status_options.filter(
                                                (fItem) =>
                                                    fItem.value ===
                                                    row.order_status
                                            )[0].title
                                        }
                                    </span>
                                </div>
                            </td>
                            <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                                {" "}
                                {customer.first_name} {customer.last_name}
                            </td>

                            <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                                <div className="flex flex-col gap-2">
                                    <span>${row.total_price}</span>
                                </div>
                            </td>
                        </tr>
                    );
                })}
            </CustomTable>
            <p className="text-lg ml-36 pt-4 font-semibold">
                Total Orders: {orders.length}
            </p>
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

export default CustomerOrderStatus;
