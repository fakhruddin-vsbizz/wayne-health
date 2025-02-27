import axios from "axios";
import React, { useEffect, useState } from "react";
import CustomTable from "../../../Components/CustomTable";
import { Link } from "react-router-dom";
import moment from "moment";
import OrderDetails from "../../print/OrderDetails";
import { CustomModal } from "../../../Components/CustomModal";
import { primaryGreen, primaryYellow } from "../../../constantVriables";
import FormInputField from "../../../Components/FormInputField";

const columns = [
    "Date",
    "Order Number",
    "Customer",
    "Company",
    "Zip",
    "View",
    "Print",
];

const AllOrders = () => {
    const [orders, setOrders] = useState([]);

    const [fields, setFields] = useState({
        fromDate: "",
        toDate: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFields({ ...fields, [name]: value });
    };

    const [Open, setOpen] = useState(false);

    const [printOrderId, setPrintOrderId] = useState(0);

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

    const getOrderInfo = () => {
        const token = localStorage.getItem("x-wayne-health-token");
        axios
            .post(
                "/api/customer/order-filter",
                {
                    fromDate: fields.fromDate,
                    toDate: fields.toDate,
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
                console.log(data.data.cartItems);
                if (data?.data) {
                    setOrders(data.data);
                    // setCartItems(data.data.cartItems);
                    // setCartId(data.data.cartId);
                    // setTotal(data.data.total);
                }
            })
            .catch((err) => console.log(err));
    };

    return (
        <div>
            <div class="container mx-auto p-6">
                <div
                    style={{ border: `1px ${primaryYellow} solid` }}
                    class="bg-white shadow-md rounded-lg p-6"
                >
                    <div class="grid grid-cols-3">
                        <FormInputField
                            name="fromDate"
                            label="From"
                            type="date"
                            value={fields.fromDate}
                            onChange={handleChange}
                        />
                        <FormInputField
                            name="toDate"
                            label="To"
                            type="date"
                            value={fields.toDate}
                            onChange={handleChange}
                        />
                        <div className="flex items-end">
                            <button
                                style={{ backgroundColor: primaryGreen }}
                                className="block w-full bg-[#8c0327] hover:bg-[#6b0220] mb-2 text-white font-bold py-3 px-4 rounded-full"
                                onClick={getOrderInfo}
                            >
                                Get Order
                            </button>
                        </div>
                    </div>
                </div>
            </div>

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
                                <Link
                                    className="font-bold text-lg hover:text-green-500 hover:underline"
                                    to={"/admin/orders/update/" + row.id}
                                >
                                    View
                                </Link>
                            </td>
                            <td className=" p-5 ">
                                <button
                                    className="font-bold text-lg hover:text-green-500 hover:underline"
                                    onClick={() => {
                                        setOpen(true);
                                        setPrintOrderId(row.id);
                                    }}
                                >
                                    Print
                                </button>
                            </td>
                        </tr>
                    );
                })}
            </CustomTable>

            <CustomModal
                open={Open}
                style={{
                    maxWidth: "70% !important",
                    width: "100%",
                }}
                noBtns={true}
                size="xl"
                longScroll={true}
                setOpen={setOpen}
                heading="Print Order Details"
                handleOkay={() => {}}
            >
                <OrderDetails
                    style={{
                        padding: "1rem 5px",
                    }}
                    orderId={printOrderId}
                />
            </CustomModal>
        </div>
    );
};

export default AllOrders;
