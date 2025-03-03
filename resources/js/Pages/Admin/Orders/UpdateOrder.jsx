import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import FormInputField from "../../../Components/FormInputField";
import FormSelectField from "../../../Components/FormSelectField";
import {
    co_brand_logo_options,
    official_logo_options,
    order_status_options,
    primaryGreen,
    toastOptions,
    wayne_logo_options,
} from "../../../constantVriables";
import FormTextAreaField from "../../../Components/FormTextAreaField";
import FormCheckboxInput from "../../../Components/FormCheckboxInput";
import axios from "axios";
import CustomTable from "../../../Components/CustomTable";
import OrderItemUpdateRow from "../../../Components/OrderitemUpdateRow";
import { CustomModal } from "../../../Components/CustomModal";
import OrderDetails from "../../print/OrderDetails";
import moment from "moment";
import PaySlip from "../../print/PaySlip";
import { toast } from "react-toastify";

const columns = [
    "Product",
    "Line 1",
    "Line 2",
    "Line 3",
    "Co-Brand Logo",
    "Wayne Health Logo",
    "Official Logo",
    "Shipping Address",
    "Unit Price",
    "Qty",
    "Total",
    "Customer Name",
    "Update",
];

const UpdateOrder = () => {
    const { orderId } = useParams();

    const [orderItems, setOrderItems] = useState([]);
    const [orderDetails, setOrderDetails] = useState({});

    const [Open, setOpen] = useState(false);
    const [OpenSlip, setOpenSlip] = useState(false);

    const [CustomerDetails, setCustomerDetails] = useState({});

    const [isUpdated, setIsUpdated] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setOrderDetails((prev) => ({ ...prev, [name]: value }));
    };

    const updateOrderDetails = () => {
        console.log(orderDetails);

        const token = localStorage.getItem("x-wayne-health-token");
        axios
            .put("/api/customer/order/" + orderDetails.id, orderDetails, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            })
            .then((data) => {
                console.log(data);
                if (data.data.id) {
                    toast.success("Order Updated Successfully!", toastOptions);
                    setIsUpdated((prev) => !prev);
                }
            })
            .catch((err) => {
                console.log(err);
                toast.error("Something went wrong!", toastOptions);
            });
    };

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
                    setCustomerDetails(data.data.customer[0]);
                    // setCartId(data.data.cartId);
                    // setTotal(data.data.total);
                }
            })
            .catch((err) => console.log(err));
    }, [isUpdated]);

    return (
        <div className="container mx-auto p-6">
            <div className="p-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border rounded-md p-4">
                    <h2
                        style={{
                            color: primaryGreen,
                        }}
                        className="text-lg font-bold mb-2"
                    >
                        Order Details
                    </h2>
                    <div className="flex flex-col gap-2">
                        <span className="text-gray-500">
                            First Name: {CustomerDetails.first_name}
                        </span>
                        <span className="text-gray-500">
                            Last Name: {CustomerDetails.last_name}
                        </span>
                        <span className="text-gray-500">
                            Address 1: {CustomerDetails.address_line_1}
                        </span>
                        <span className="text-gray-500">
                            Address 2:{CustomerDetails.address_line_2}{" "}
                        </span>
                        <span className="text-gray-500">
                            City: {CustomerDetails.city}
                        </span>
                        <span className="text-gray-500">
                            State/Prov: {CustomerDetails.state}
                        </span>
                        <span className="text-gray-500">
                            Zip: {CustomerDetails.postal_code}
                        </span>
                        <span className="text-gray-500">
                            Country: {CustomerDetails.country}
                        </span>
                        <span className="text-gray-500">
                            Email: {CustomerDetails.email}
                        </span>
                        <span className="text-gray-500">
                            Phone: {CustomerDetails.phone}
                        </span>
                        {/* <span>Comments:</span> */}
                        <FormTextAreaField
                            name="comment"
                            value={orderDetails.comment}
                            onChange={handleChange}
                            label="Comment"
                        />
                        <FormInputField
                            label="Cost Center No:"
                            name="cost_center"
                            value={orderDetails.cost_center}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div>
                    <div className="border rounded-md p-4">
                        <h2
                            style={{
                                color: primaryGreen,
                            }}
                            className="text-lg font-bold mb-2"
                        >
                            Order Status
                        </h2>
                        <div className="flex flex-col gap-2">
                            <div>
                                <div className="flex flex-col gap-2">
                                    <span className="text-gray-500">
                                        Order Number:{" "}
                                        {orderDetails.order_number}
                                    </span>
                                    <span className="text-gray-500">
                                        Order Date:{" "}
                                        {moment(orderDetails.created_at).format(
                                            "MMMM Do YYYY, h:mm:ss a"
                                        )}
                                    </span>
                                </div>
                                <FormSelectField
                                    noNull={true}
                                    name="order_status"
                                    label="Order Status"
                                    value={orderDetails.order_status}
                                    options={order_status_options}
                                    onChange={handleChange}
                                />
                                {/* <FormCheckboxInput label="Email Order Status on Update" /> */}
                            </div>
                            <span className="text-gray-500">
                                Shipping Method: Ground Service
                            </span>
                            <FormTextAreaField
                                name="notes"
                                label="Note"
                                value={orderDetails.notes}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="flex gap-8 mt-8 ml-4">
                            <button
                                style={{ backgroundColor: primaryGreen }}
                                onClick={() => setOpen(true)}
                                className="flex w-1/3 mt-4 items-center justify-center rounded-lg px-5 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-primary-300"
                            >
                                Print Order Details
                            </button>
                            <button
                                style={{ backgroundColor: primaryGreen }}
                                onClick={() => setOpenSlip(true)}
                                className="flex w-1/3 mt-4 items-center justify-center rounded-lg px-5 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-primary-300"
                            >
                                Print Packing Slip
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-start w-1/3 mb-8">
                <button
                    style={{ backgroundColor: primaryGreen }}
                    onClick={updateOrderDetails}
                    className="flex w-1/2 mt-4 ml-4 items-center justify-center rounded-lg px-5 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-primary-300"
                >
                    Update Order
                </button>
            </div>
            <div>
                <h2
                    style={{
                        color: primaryGreen,
                    }}
                    className="text-lg font-bold ml-4"
                >
                    Order Line Details{" "}
                    <span className="text-gray-500 font-normal ml-1 text-md">
                        (To update row data scroll to right)
                    </span>
                </h2>
                <div>
                    <CustomTable
                        overflowX="scroll"
                        style={{ maxWidth: "100%" }}
                        noActionBtn={true}
                        columns={columns}
                    >
                        {orderItems.map((row) => {
                            const additionalCharges = row?.embroidery_lines_cost
                                ? Number(row.embroidery_lines_cost)
                                : 0 + row?.embroidery_logo_cost
                                ? Number(row.embroidery_logo_cost)
                                : 0 + row?.wayne_logo_price
                                ? Number(row.wayne_logo_price)
                                : 0;

                            const price_per_unit =
                                Number(row.price) + additionalCharges;

                            return (
                                <tr
                                    key={row.id}
                                    className="bg-white transition-all duration-500 hover:bg-gray-50"
                                >
                                    <OrderItemUpdateRow
                                        setIsUpdated={setIsUpdated}
                                        price_per_unit={price_per_unit}
                                        CustomerDetails={CustomerDetails}
                                        row={row}
                                        orderDetails={orderDetails}
                                    />
                                </tr>
                            );
                        })}
                    </CustomTable>
                </div>
            </div>
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
                        padding: "1rem 5px 0",
                    }}
                    orderId={orderDetails.id}
                />
            </CustomModal>
            <CustomModal
                open={OpenSlip}
                style={{
                    maxWidth: "70% !important",
                    width: "100%",
                }}
                noBtns={true}
                size="xl"
                longScroll={true}
                setOpen={setOpenSlip}
                heading="Print Order Details"
                handleOkay={() => {}}
            >
                <PaySlip
                    style={{
                        padding: "1rem 5px 0",
                    }}
                    orderId={orderDetails.id}
                />
            </CustomModal>
        </div>
    );
};

export default UpdateOrder;
