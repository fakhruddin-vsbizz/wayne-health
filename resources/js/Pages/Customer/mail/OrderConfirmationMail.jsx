import React from "react";
import moment from "moment";
import CustomTable from "../../../Components/CustomTable";
import { primaryGreen } from "../../../constantVriables";

const columns = ["Item", "Price", "Quantity", "Total", "Additional Info"];

const OrderConfirmationMail = ({
    orderItems = [],
    orderDetails = {},
    customer = {},
    total = 0,
    style,
}) => {
    return (
        <div
            style={{
                width: "100%",
                fontFamily: "Arial, sans-serif",
                fontSize: "14px",
                lineHeight: "1.5",
            }}
        >
            <section
                style={{ width: "100%", maxWidth: "600px", margin: "0 auto" }}
            >
                <h1
                    style={{
                        fontSize: "24px",
                        color: "#f87171",
                        textAlign: "center",
                        marginBottom: "20px",
                    }}
                >
                    www.upgmarket.com Order.
                </h1>

                <span
                    style={{
                        fontSize: "12px",
                        fontWeight: "bold",
                        display: "block",
                        textAlign: "center",
                        marginBottom: "20px",
                    }}
                >
                    Your Order #{orderDetails.order_number} (placed on{" "}
                    {moment(orderDetails.created_at).format(
                        "MMMM Do YYYY, h:mm:ss a"
                    )}
                    )
                </span>

                <table
                    style={{
                        width: "100%",
                        borderCollapse: "collapse",
                        marginBottom: "20px",
                    }}
                >
                    <tr>
                        <td
                            style={{
                                width: "50%",
                                padding: "10px",
                                border: "1px solid #e5e7eb",
                                backgroundColor: "#f3f4f6",
                            }}
                        >
                            <h2
                                style={{
                                    color: primaryGreen,
                                    fontSize: "18px",
                                    fontWeight: "bold",
                                    borderBottom: "1px solid",
                                    backgroundColor: "#dcf7e0",
                                    padding: "5px 10px",
                                }}
                            >
                                Bill To:
                            </h2>
                            <div style={{ padding: "5px 10px" }}>
                                <p style={{ margin: "0 0 5px" }}>
                                    {orderDetails.billing_ship_to_name}
                                </p>
                                <p style={{ margin: "0 0 5px" }}>
                                    {orderDetails.billing_ship_to_company}
                                </p>
                                <p style={{ margin: "0 0 5px" }}>
                                    {orderDetails.billing_address_line_1}
                                </p>
                                <p style={{ margin: "0 0 5px" }}>
                                    {orderDetails.billing_address_line_2}
                                </p>
                                <p style={{ margin: "0 0 5px" }}>
                                    {orderDetails.billing_postal_code}{" "}
                                    {orderDetails.billing_city}
                                </p>
                                <p style={{ margin: "0 0 5px" }}>
                                    {orderDetails.billing_country}
                                </p>
                                <p style={{ margin: "0 0 5px" }}>
                                    {customer.phone}
                                </p>
                                <p style={{ margin: "0" }}>{customer.email}</p>
                            </div>
                        </td>
                        <td
                            style={{
                                width: "50%",
                                padding: "10px",
                                border: "1px solid #e5e7eb",
                                backgroundColor: "#f3f4f6",
                            }}
                        >
                            <h2
                                style={{
                                    color: primaryGreen,
                                    fontSize: "18px",
                                    fontWeight: "bold",
                                    borderBottom: "1px solid",
                                    backgroundColor: "#dcf7e0",
                                    padding: "5px 10px",
                                }}
                            >
                                Ship To:
                            </h2>
                            <div style={{ padding: "5px 10px" }}>
                                <p style={{ margin: "0 0 5px" }}>
                                    Ground Service
                                </p>
                                <p style={{ margin: "0 0 5px" }}>
                                    {orderDetails.shipping_ship_to_name}
                                </p>
                                <p style={{ margin: "0 0 5px" }}>
                                    {orderDetails.shipping_ship_to_company}
                                </p>
                                <p style={{ margin: "0 0 5px" }}>
                                    {orderDetails.shipping_address_line_1}
                                </p>
                                <p style={{ margin: "0 0 5px" }}>
                                    {orderDetails.shipping_address_line_2}
                                </p>
                                <p style={{ margin: "0 0 5px" }}>
                                    {orderDetails.shipping_postal_code}{" "}
                                    {orderDetails.shipping_city}
                                </p>
                                <p style={{ margin: "0" }}>
                                    {orderDetails.shipping_country}
                                </p>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td
                            style={{
                                width: "50%",
                                padding: "10px",
                                border: "1px solid #e5e7eb",
                                backgroundColor: "#f3f4f6",
                            }}
                        >
                            <h2
                                style={{
                                    color: primaryGreen,
                                    fontSize: "18px",
                                    fontWeight: "bold",
                                    borderBottom: "1px solid",
                                    backgroundColor: "#dcf7e0",
                                    padding: "5px 10px",
                                }}
                            >
                                Payment Summary:
                            </h2>
                            <div style={{ padding: "5px 10px" }}>
                                <p style={{ margin: "0 0 5px" }}>
                                    Subtotal: ${Number(total).toFixed(2)}
                                </p>
                                <p style={{ margin: "0 0 5px" }}>
                                    Shipping(Ground Service): $0.00
                                </p>
                                <p style={{ margin: "0 0 5px" }}>Tax: $0.00</p>
                                <p style={{ margin: "0" }}>
                                    Order Total: ${Number(total).toFixed(2)}
                                </p>
                            </div>
                        </td>
                        <td
                            style={{
                                width: "50%",
                                padding: "10px",
                                border: "1px solid #e5e7eb",
                                backgroundColor: "#f3f4f6",
                            }}
                        >
                            <h2
                                style={{
                                    color: primaryGreen,
                                    fontSize: "18px",
                                    fontWeight: "bold",
                                    borderBottom: "1px solid",
                                    backgroundColor: "#dcf7e0",
                                    padding: "5px 10px",
                                }}
                            >
                                Payment Info:
                            </h2>
                            <div style={{ padding: "5px 10px" }}>
                                <p style={{ margin: "0" }}>
                                    Cost Center: {orderDetails.cost_center}
                                </p>
                            </div>
                        </td>
                    </tr>
                </table>

                <CustomTable style={style} noActionBtn={true} columns={columns}>
                    {orderItems.map((row) => {
                        const additionalCharges =
                            Number(row.embroidery_lines_cost) +
                            Number(row.embroidery_logo_cost) +
                            Number(row.wayne_logo_price);

                        const total_price_for_one =
                            Number(row.price) + additionalCharges;

                        return (
                            <tr
                                key={row.id}
                                style={{ backgroundColor: "#f3f4f6" }}
                            >
                                <td
                                    style={{
                                        padding: "10px",
                                        whiteSpace: "nowrap",
                                        fontSize: "14px",
                                        fontWeight: "500",
                                        color: "#1f2937",
                                    }}
                                >
                                    <div>
                                        <p style={{ margin: "0 0 5px" }}>
                                            {row.name}
                                        </p>
                                        <p style={{ margin: "0 0 5px" }}>
                                            Manufacturer: {row.manufacturer}
                                        </p>
                                        {row?.product?.colors && (
                                            <p style={{ margin: "0 0 5px" }}>
                                                Color: {row.product.colors}
                                            </p>
                                        )}
                                        {row?.inseam && (
                                            <p style={{ margin: "0 0 5px" }}>
                                                Inseam: {row.inseam}
                                            </p>
                                        )}
                                        {row?.fit && (
                                            <p style={{ margin: "0 0 5px" }}>
                                                Fit: {row.fit}
                                            </p>
                                        )}
                                        {row?.size && (
                                            <p style={{ margin: "0 0 5px" }}>
                                                Size: {row.size}
                                            </p>
                                        )}
                                        {row?.productLength && (
                                            <p style={{ margin: "0 0 5px" }}>
                                                Length: {row.productLength}
                                            </p>
                                        )}
                                    </div>
                                </td>
                                <td
                                    style={{
                                        padding: "10px",
                                        whiteSpace: "nowrap",
                                        fontSize: "14px",
                                        fontWeight: "500",
                                        color: "#1f2937",
                                    }}
                                >
                                    <div>
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
                                        padding: "10px",
                                        whiteSpace: "nowrap",
                                        fontSize: "14px",
                                        fontWeight: "500",
                                        color: "#1f2937",
                                    }}
                                >
                                    {row?.quantity}
                                </td>
                                <td style={{ padding: "10px" }}>
                                    <div>
                                        <span>
                                            $
                                            {Number(row.total_price).toFixed(2)}
                                        </span>
                                    </div>
                                </td>
                                <td style={{ padding: "10px" }}>
                                    <div>
                                        {row.product?.wayne_logo_position && (
                                            <p style={{ margin: "0 0 5px" }}>
                                                Wayne Health Logo $
                                                {row.product.wayne_logo_price}:{" "}
                                                {row?.wayne_logo === "yes"
                                                    ? row?.wayne_logo
                                                    : "no"}
                                            </p>
                                        )}
                                        {row.product?.co_brand_logo_position &&
                                            row?.co_brand_logo && (
                                                <p
                                                    style={{
                                                        margin: "0 0 5px",
                                                    }}
                                                >
                                                    Co-brand Logo $
                                                    {row.embroidery_logo_cost}:{" "}
                                                    {row?.co_brand_logo}
                                                </p>
                                            )}
                                        {row.product?.official_logo_position &&
                                            row?.official_logo && (
                                                <p
                                                    style={{
                                                        margin: "0 0 5px",
                                                    }}
                                                >
                                                    Official Logo $
                                                    {row.embroidery_logo_cost}:
                                                </p>
                                            )}
                                        {row.product?.embroidery_lines ===
                                            "line1" &&
                                            row?.line1 && (
                                                <p
                                                    style={{
                                                        margin: "0 0 5px",
                                                    }}
                                                >
                                                    Line 1 $
                                                    {row.embroidery_lines_cost}:{" "}
                                                    {row?.line1}
                                                </p>
                                            )}
                                        {row.product?.embroidery_lines ===
                                            "line2" && (
                                            <>
                                                {row?.line1 && (
                                                    <p
                                                        style={{
                                                            margin: "0 0 5px",
                                                        }}
                                                    >
                                                        Line 1 $
                                                        {
                                                            row.embroidery_lines_cost
                                                        }
                                                        : {row?.line1}
                                                    </p>
                                                )}
                                                {row?.line2 && (
                                                    <p
                                                        style={{
                                                            margin: "0 0 5px",
                                                        }}
                                                    >
                                                        Line 2: {row?.line2}
                                                    </p>
                                                )}
                                            </>
                                        )}
                                        {row.product?.embroidery_lines ===
                                            "line3" && (
                                            <>
                                                {row?.line1 && (
                                                    <p
                                                        style={{
                                                            margin: "0 0 5px",
                                                        }}
                                                    >
                                                        Line 1 $
                                                        {
                                                            row.embroidery_lines_cost
                                                        }
                                                        : {row?.line1}
                                                    </p>
                                                )}
                                                {row?.line2 && (
                                                    <p
                                                        style={{
                                                            margin: "0 0 5px",
                                                        }}
                                                    >
                                                        Line 2: {row?.line2}
                                                    </p>
                                                )}
                                                {row?.line3 && (
                                                    <p
                                                        style={{
                                                            margin: "0 0 5px",
                                                        }}
                                                    >
                                                        Line 3: {row?.line3}
                                                    </p>
                                                )}
                                            </>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </CustomTable>

                <div
                    style={{
                        width: "100%",
                        padding: "10px",
                        backgroundColor: "#f3f4f6",
                        marginTop: "10px",
                    }}
                >
                    <div style={{ display: "block", marginBottom: "5px" }}>
                        <span>Subtotal: </span>
                        <span style={{ float: "right" }}>
                            ${Number(total).toFixed(2)}
                        </span>
                    </div>
                    <div style={{ display: "block", marginBottom: "5px" }}>
                        <span>Shipping(Ground Service):</span>
                        <span style={{ float: "right" }}>$0.00</span>
                    </div>
                    <div style={{ display: "block", marginBottom: "5px" }}>
                        <span>Tax:</span>
                        <span style={{ float: "right" }}>$0.00</span>
                    </div>
                    <div style={{ display: "block" }}>
                        <span>Order Total:</span>
                        <span style={{ float: "right" }}>
                            ${Number(total).toFixed(2)}
                        </span>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default OrderConfirmationMail;
