import React from "react";
import moment from "moment";
import CustomTable from "../../../Components/CustomTable";
import { primaryGreen } from "../../../constantVriables";
import UpdateCart from "../../../Components/UpdateCart";

const columns = ["Item", "Price", "Quantity", "Total", "Additional Info"];

const OrderConfirmationMail = ({
    orderItems = [],
    orderDetails = {},
    customer = {},
    total = 0,
    style,
}) => {
    // const [orderItems, setOrderItems] = useState([]);
    // const [orderDetails, setOrderDetails] = useState({});

    // const [isUpdated, setIsUpdated] = useState(false);

    // const [total, setTotal] = useState(0);

    // const [customer, setCustomer] = useState({});

    // const contentRef = useRef(null);

    // const { orderId } = useParams();

    // const handlePrint = useReactToPrint({
    //     contentRef,
    //     pageStyle: "p-4",
    // });

    // const handlePrint = useReactToPrint({
    //     content: () => componentRef.current,
    //     documentTitle: `order-information`,
    //     onPrintError: () => alert("there is an error when printing"),
    // });

    // useEffect(() => {
    //     const token = localStorage.getItem("x-wayne-health-token");
    //     axios
    //         .get("/api/customer/order/" + orderId, {
    //             headers: {
    //                 Authorization: `Bearer ${token}`,
    //                 Accept: "application/json",
    //             },
    //         })
    //         .then((data) => {
    //             console.log(data);
    //             // console.log(data.data.cartItems);
    //             if (data?.data) {
    //                 setOrderItems(data.data.orderItems);
    //                 setOrderDetails(data.data.order);
    //                 setCustomer(data.data.customer[0]);
    //                 setTotal(data.data.total);
    //                 // setCartId(data.data.cartId);
    //                 // setTotal(data.data.total);
    //             }
    //         })
    //         .catch((err) => console.log(err));
    // }, [isUpdated]);

    return (
        <div style={{ width: "100%" }}>
            {/* <div className="print:hidden">
        <button
            onClick={handlePrint}
            style={{ backgroundColor: primaryGreen }}
            className="bg-cyan-500 px-6 py-2 text-white border border-cyan-500 font-bold rounded-md mb-3 w-full lg:w-fit my-6 mt-0 max-w-sm"
        >
            Print
        </button>
    </div> */}

            <section
                style={{
                    scale: 0.69,
                }}
            >
                <h1 style={{ fontSize: "1.5rem", color: "#f87171" }}>
                    www.upgmarket.com Order.
                </h1>

                <span style={{ fontSize: "0.75rem", fontWeight: "bold" }}>
                    Your Order #{orderDetails.order_number} (placed on{" "}
                    {moment(orderDetails.created_at).format(
                        "MMMM Do YYYY, h:mm:ss a"
                    )}
                    )
                </span>
                <div
                    style={{
                        padding: "0.5rem",
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "1.5rem",
                    }}
                >
                    <div
                        style={{
                            border: "1px solid #e5e7eb",
                            backgroundColor: "#f3f4f6",
                        }}
                    >
                        <h2
                            style={{
                                color: primaryGreen,
                                fontSize: "1.125rem",
                                fontWeight: "bold",
                                borderBottom: "1px solid",
                                backgroundColor: "#dcf7e0",
                                padding: "0.25rem 1rem",
                            }}
                        >
                            Bill To:
                        </h2>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                padding: "0.25rem 1rem",
                            }}
                        >
                            <p className="mb-1">
                                {orderDetails.billing_ship_to_name}
                            </p>
                            <p className="mb-1">
                                {orderDetails.billing_ship_to_company}
                            </p>
                            <p className="mb-1">
                                {orderDetails.billing_address_line_1}
                            </p>
                            <p className="mb-1">
                                {orderDetails.billing_address_line_2}
                            </p>
                            <p className="mb-1">
                                {orderDetails.billing_postal_code}{" "}
                                {orderDetails.billing_city}
                            </p>
                            <p className="mb-1">
                                {orderDetails.billing_country}
                            </p>
                            <p className="mb-1">{customer.phone}</p>
                            <p>{customer.email}</p>
                        </div>
                    </div>
                    <div
                        style={{
                            border: "1px solid #e5e7eb",
                            backgroundColor: "#f3f4f6",
                        }}
                    >
                        <h2
                            style={{
                                color: primaryGreen,
                                fontSize: "1.125rem",
                                fontWeight: "bold",
                                borderBottom: "1px solid",
                                backgroundColor: "#dcf7e0",
                                padding: "0.25rem 1rem",
                            }}
                        >
                            Ship To:
                        </h2>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                padding: "0.25rem 1rem",
                            }}
                        >
                            <p className="mb-1">Ground Service</p>
                            <p className="mb-1">
                                {orderDetails.shipping_ship_to_name}
                            </p>
                            <p className="mb-1">
                                {orderDetails.shipping_ship_to_company}
                            </p>
                            <p className="mb-1">
                                {orderDetails.shipping_address_line_1}
                            </p>
                            <p className="mb-1">
                                {orderDetails.shipping_address_line_2}
                            </p>
                            <p className="mb-1">
                                {orderDetails.shipping_postal_code}{" "}
                                {orderDetails.shipping_city}
                            </p>
                            <p>{orderDetails.shipping_country}</p>
                        </div>
                    </div>
                    <div
                        style={{
                            border: "1px solid #e5e7eb",
                            backgroundColor: "#f3f4f6",
                        }}
                    >
                        <h2
                            style={{
                                color: primaryGreen,
                                fontSize: "1.125rem",
                                fontWeight: "bold",
                                borderBottom: "1px solid",
                                backgroundColor: "#dcf7e0",
                                padding: "0.25rem 1rem",
                            }}
                        >
                            Payment Summary:
                        </h2>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                padding: "0.25rem 1rem",
                            }}
                        >
                            <p>Payment Summary:</p>
                            <div>
                                <div>
                                    <p className="mb-1">Subtotal: </p>
                                    <p>${Number(total).toFixed(2)}</p>
                                </div>
                                <div>
                                    <p className="mb-1">
                                        Shipping(Ground Service):
                                    </p>
                                    <p>$0.00</p>
                                </div>
                                <div>
                                    <p className="mb-1">Tax:</p>
                                    <p>$0.00</p>
                                </div>
                                <div>
                                    <p className="mb-1">Order Total:</p>
                                    <p>${Number(total).toFixed(2)}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        style={{
                            border: "1px solid #e5e7eb",
                            backgroundColor: "#f3f4f6",
                        }}
                    >
                        <h2
                            style={{
                                color: primaryGreen,
                                fontSize: "1.125rem",
                                fontWeight: "bold",
                                borderBottom: "1px solid",
                                backgroundColor: "#dcf7e0",
                                padding: "0.25rem 1rem",
                            }}
                        >
                            Payment Info:
                        </h2>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                padding: "0.25rem 1rem",
                            }}
                        >
                            <h3 className="mb-1">Cost Center:</h3>
                            <p>{orderDetails.cost_center}</p>
                        </div>
                    </div>
                </div>
                <div style={{ width: "100%" }}>
                    <CustomTable
                        style={style}
                        noActionBtn={true}
                        columns={columns}
                    >
                        {orderItems.map((row) => {
                            console.log(row);
                            const additionalCharges =
                                Number(row.embroidery_lines_cost) +
                                Number(row.embroidery_logo_cost) +
                                Number(row.wayne_logo_price);

                            const total_price_for_one =
                                Number(row.price) + additionalCharges;

                            // const totalAdditionalCharges =
                            //     additionalCharges * row.quantity;

                            return (
                                <tr
                                    key={row.id}
                                    style={{
                                        backgroundColor: "#f3f4f6",
                                        transition: "all 0.5s",
                                        ":hover": {
                                            backgroundColor: "#e5e7eb",
                                        },
                                    }}
                                >
                                    <td
                                        style={{
                                            padding: "1.25rem",
                                            whiteSpace: "nowrap",
                                            fontSize: "0.875rem",
                                            lineHeight: "1.5rem",
                                            fontWeight: "500",
                                            color: "#1f2937",
                                        }}
                                    >
                                        <div
                                            style={{
                                                display: "flex",
                                                flexDirection: "column",
                                                gap: "0.5rem",
                                            }}
                                        >
                                            <p>{row.name}</p>
                                            <p>
                                                Manufacturer: {row.manufacturer}
                                            </p>
                                            {row?.product?.colors ? (
                                                <p>
                                                    Color: {row.product.colors}
                                                </p>
                                            ) : null}{" "}
                                            {row?.inseam && (
                                                <p>Inseam: {row.inseam}</p>
                                            )}
                                            {row?.fit && <p>Fit: {row.fit}</p>}
                                            {row?.size && (
                                                <p>Size: {row.size}</p>
                                            )}
                                            {row?.productLength && (
                                                <p>
                                                    Length: {row.productLength}
                                                </p>
                                            )}
                                        </div>
                                    </td>
                                    <td
                                        style={{
                                            padding: "1.25rem",
                                            whiteSpace: "nowrap",
                                            fontSize: "0.875rem",
                                            lineHeight: "1.5rem",
                                            fontWeight: "500",
                                            color: "#1f2937",
                                        }}
                                    >
                                        <div
                                            style={{
                                                display: "flex",
                                                flexDirection: "column",
                                                gap: "0.5rem",
                                            }}
                                        >
                                            <span>
                                                $
                                                {Number(
                                                    total_price_for_one
                                                ).toFixed(2)}
                                            </span>
                                        </div>
                                    </td>
                                    <td
                                        style={{
                                            padding: "1.25rem",
                                            whiteSpace: "nowrap",
                                            fontSize: "0.875rem",
                                            lineHeight: "1.5rem",
                                            fontWeight: "500",
                                            color: "#1f2937",
                                        }}
                                    >
                                        {row?.quantity}
                                    </td>
                                    <td style={{ padding: "1.25rem" }}>
                                        <div
                                            style={{
                                                display: "flex",
                                                flexDirection: "column",
                                                color: "#1f2937",
                                            }}
                                        >
                                            <span>
                                                $
                                                {Number(
                                                    row.total_price
                                                ).toFixed(2)}
                                            </span>
                                        </div>
                                    </td>
                                    <td style={{ padding: "1.25rem" }}>
                                        <div
                                            style={{
                                                display: "flex",
                                                flexDirection: "column",
                                            }}
                                        >
                                            {row.product
                                                ?.wayne_logo_position ? (
                                                <p>
                                                    Wayne Health Logo $
                                                    {
                                                        row.product
                                                            .wayne_logo_price
                                                    }
                                                    : {""}
                                                    {row?.wayne_logo === "yes"
                                                        ? row?.wayne_logo
                                                        : "no"}
                                                </p>
                                            ) : null}
                                            {row.product
                                                ?.co_brand_logo_position ? (
                                                row?.co_brand_logo ? (
                                                    <p>
                                                        Co-brand Logo $
                                                        {
                                                            row.embroidery_logo_cost
                                                        }
                                                        : {row?.co_brand_logo}
                                                    </p>
                                                ) : null
                                            ) : null}
                                            {row.product
                                                ?.official_logo_position ? (
                                                row?.official_logo ? (
                                                    <p>
                                                        Official Logo $
                                                        {
                                                            row.embroidery_logo_cost
                                                        }
                                                        :
                                                    </p>
                                                ) : null
                                            ) : null}
                                            {row.product?.embroidery_lines ===
                                            "line1" ? (
                                                row?.line1 ? (
                                                    <p>
                                                        Line 1 $
                                                        {
                                                            row.embroidery_lines_cost
                                                        }
                                                        : {row?.line1}
                                                    </p>
                                                ) : null
                                            ) : null}
                                            {row.product?.embroidery_lines ===
                                            "line2" ? (
                                                <>
                                                    {row?.line1 ? (
                                                        <p>
                                                            Line 1 $
                                                            {
                                                                row.embroidery_lines_cost
                                                            }
                                                            : {row?.line1}
                                                        </p>
                                                    ) : null}
                                                    {row?.line2 ? (
                                                        <p>
                                                            Line 2: {row?.line2}
                                                        </p>
                                                    ) : null}
                                                </>
                                            ) : null}
                                            {row.product?.embroidery_lines ===
                                            "line3" ? (
                                                <>
                                                    {row?.line1 ? (
                                                        <p>
                                                            Line 1 $
                                                            {
                                                                row.embroidery_lines_cost
                                                            }
                                                            : {row?.line1}
                                                        </p>
                                                    ) : null}
                                                    {row?.line2 ? (
                                                        <p>
                                                            Line 2: {row?.line2}
                                                        </p>
                                                    ) : null}
                                                    {row?.line3 ? (
                                                        <p>
                                                            Line 3: {row?.line3}
                                                        </p>
                                                    ) : null}
                                                </>
                                            ) : null}
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </CustomTable>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            justifySelf: "center",
                            marginBottom: "1rem",
                            marginTop: "0.25rem",
                            width: "99.1%",
                            padding: "1rem",
                            backgroundColor: "#f3f4f6",
                            transition: "all 0.5s",
                            ":hover": { backgroundColor: "#e5e7eb" },
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                width: "100%",
                            }}
                        >
                            <span>Subtotal: </span>
                            <span>${Number(total).toFixed(2)}</span>
                        </div>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                width: "100%",
                            }}
                        >
                            <span>Shipping(Ground Service):</span>
                            <span>$0.00</span>
                        </div>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                width: "100%",
                            }}
                        >
                            <span>Tax:</span>
                            <span>$0.00</span>
                        </div>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                width: "100%",
                            }}
                        >
                            <span>Order Total:</span>
                            <span>${Number(total).toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default OrderConfirmationMail;
