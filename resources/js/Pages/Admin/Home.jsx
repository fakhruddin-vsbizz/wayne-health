import axios from "axios";
import React, { useEffect, useState } from "react";
import CustomTable from "../../Components/CustomTable";
import { Link } from "react-router-dom";
import moment from "moment";

const columns = [
    "Date",
    "Order Number",
    "Customer",
    "Company",
    "Zip",
    "View",
    "Print",
];

const Home = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("x-wayne-health-token");
        axios
            .get("/api/customer/order", {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                },
            })
            .then((data) => {
                console.log(data);
                console.log(data.data.cartItems);
                if (data?.data) {
                    setOrders(data.data);
                    // setCartItems(data.data.cartItems);
                    // setCartId(data.data.cartId);
                    // setTotal(data.data.total);
                }
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <div>
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
                                {" "}
                                {row?.customer.first_name}{" "}
                                {row?.customer.last_name}
                            </td>
                            <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                                <div className="flex flex-col gap-2">
                                    <span>{row.shipping_ship_to_company}</span>
                                </div>
                            </td>
                            <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                                <div className="flex flex-col gap-2">
                                    <span>{row.shipping_postal_code}</span>
                                </div>
                            </td>
                            <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                                {" "}
                                <Link to={"/admin/orders/update/" + row.id}>
                                    View
                                </Link>
                            </td>
                            <td className=" p-5 ">
                                <button>Print</button>
                            </td>
                        </tr>
                    );
                })}
            </CustomTable>
        </div>
    );
};

export default Home;
