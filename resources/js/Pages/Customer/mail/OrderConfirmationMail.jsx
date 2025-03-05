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
            <table
                align="center"
                width="100%"
                style={{
                    maxWidth: "600px",
                    margin: "0 auto",
                    borderCollapse: "collapse",
                }}
            >
                <tr>
                    <td style={{ textAlign: "center", padding: "20px 0" }}>
                        <h1
                            style={{
                                fontSize: "24px",
                                color: "#f87171",
                                margin: "0",
                            }}
                        >
                            www.upgmarket.com Order.
                        </h1>
                        <span
                            style={{
                                fontSize: "12px",
                                fontWeight: "bold",
                                display: "block",
                                marginTop: "10px",
                            }}
                        >
                            Your Order #{orderDetails.order_number} (placed on{" "}
                            {moment(orderDetails.created_at).format(
                                "MMMM Do YYYY, h:mm:ss a"
                            )}
                            )
                        </span>
                    </td>
                </tr>

                <tr>
                    <td>
                        <table
                            width="100%"
                            style={{
                                borderCollapse: "collapse",
                                marginBottom: "20px",
                            }}
                        >
                            <tr>
                                <td
                                    width="50%"
                                    style={{
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
                                            margin: "0",
                                        }}
                                    >
                                        Bill To:
                                    </h2>
                                    <div style={{ padding: "5px 10px" }}>
                                        <p style={{ margin: "0 0 5px" }}>
                                            {orderDetails.billing_ship_to_name}
                                        </p>
                                        <p style={{ margin: "0 0 5px" }}>
                                            {
                                                orderDetails.billing_ship_to_company
                                            }
                                        </p>
                                        <p style={{ margin: "0 0 5px" }}>
                                            {
                                                orderDetails.billing_address_line_1
                                            }
                                        </p>
                                        <p style={{ margin: "0 0 5px" }}>
                                            {
                                                orderDetails.billing_address_line_2
                                            }
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
                                        <p style={{ margin: "0" }}>
                                            {customer.email}
                                        </p>
                                    </div>
                                </td>
                                <td
                                    width="50%"
                                    style={{
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
                                            margin: "0",
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
                                            {
                                                orderDetails.shipping_ship_to_company
                                            }
                                        </p>
                                        <p style={{ margin: "0 0 5px" }}>
                                            {
                                                orderDetails.shipping_address_line_1
                                            }
                                        </p>
                                        <p style={{ margin: "0 0 5px" }}>
                                            {
                                                orderDetails.shipping_address_line_2
                                            }
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
                        </table>
                    </td>
                </tr>

                <tr>
                    <td>
                        <table
                            width="100%"
                            style={{
                                borderCollapse: "collapse",
                                marginBottom: "20px",
                            }}
                        >
                            <tr>
                                <td
                                    width="50%"
                                    style={{
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
                                            margin: "0",
                                        }}
                                    >
                                        Payment Summary:
                                    </h2>
                                    <div style={{ padding: "5px 10px" }}>
                                        <p style={{ margin: "0 0 5px" }}>
                                            Subtotal: $
                                            {Number(total).toFixed(2)}
                                        </p>
                                        <p style={{ margin: "0 0 5px" }}>
                                            Shipping(Ground Service): $0.00
                                        </p>
                                        <p style={{ margin: "0 0 5px" }}>
                                            Tax: $0.00
                                        </p>
                                        <p style={{ margin: "0" }}>
                                            Order Total: $
                                            {Number(total).toFixed(2)}
                                        </p>
                                    </div>
                                </td>
                                <td
                                    width="50%"
                                    style={{
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
                                            margin: "0",
                                        }}
                                    >
                                        Payment Info:
                                    </h2>
                                    <div style={{ padding: "5px 10px" }}>
                                        <p style={{ margin: "0" }}>
                                            Cost Center:{" "}
                                            {orderDetails.cost_center}
                                        </p>
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>

                <tr>
                    <td>
                        <table
                            width="100%"
                            style={{
                                borderCollapse: "collapse",
                                tableLayout: "fixed",
                            }}
                        >
                            <thead>
                                <tr>
                                    {columns.map((col, index) => (
                                        <th
                                            key={index}
                                            style={{
                                                padding: "10px",
                                                textAlign: "left",
                                                backgroundColor: "#f3f4f6",
                                                borderBottom:
                                                    "1px solid #e5e7eb",
                                                fontSize: "14px",
                                                fontWeight: "bold",
                                                width:
                                                    index === 0
                                                        ? "30%"
                                                        : "auto", // Set the first column to 30% width
                                            }}
                                        >
                                            {col}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
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
                                            style={{
                                                backgroundColor: "#f3f4f6",
                                            }}
                                        >
                                            <td
                                                style={{
                                                    padding: "10px",
                                                    fontSize: "14px",
                                                    fontWeight: "500",
                                                    color: "#1f2937",
                                                    width: "30%",
                                                }}
                                            >
                                                <div>
                                                    <p
                                                        style={{
                                                            margin: "0 0 5px",
                                                        }}
                                                    >
                                                        {row.name}
                                                    </p>
                                                    <p
                                                        style={{
                                                            margin: "0 0 5px",
                                                        }}
                                                    >
                                                        Manufacturer:{" "}
                                                        {row.manufacturer}
                                                    </p>
                                                    <span>
                                                        Item Code:{" "}
                                                        {row.product.item_code}
                                                    </span>{" "}
                                                    {row?.product?.colors && (
                                                        <p
                                                            style={{
                                                                margin: "0 0 5px",
                                                            }}
                                                        >
                                                            Color:{" "}
                                                            {row.product.colors}
                                                        </p>
                                                    )}
                                                    {row?.inseam && (
                                                        <p
                                                            style={{
                                                                margin: "0 0 5px",
                                                            }}
                                                        >
                                                            Inseam: {row.inseam}
                                                        </p>
                                                    )}
                                                    {row?.fit && (
                                                        <p
                                                            style={{
                                                                margin: "0 0 5px",
                                                            }}
                                                        >
                                                            Fit: {row.fit}
                                                        </p>
                                                    )}
                                                    {row?.size && (
                                                        <p
                                                            style={{
                                                                margin: "0 0 5px",
                                                            }}
                                                        >
                                                            Size: {row.size}
                                                        </p>
                                                    )}
                                                    {row?.productLength && (
                                                        <p
                                                            style={{
                                                                margin: "0 0 5px",
                                                            }}
                                                        >
                                                            Length:{" "}
                                                            {row.productLength}
                                                        </p>
                                                    )}
                                                </div>
                                            </td>
                                            <td
                                                style={{
                                                    padding: "10px",
                                                    fontSize: "14px",
                                                    fontWeight: "500",
                                                    color: "#1f2937",
                                                    width: "15%",
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
                                                    fontSize: "14px",
                                                    fontWeight: "500",
                                                    color: "#1f2937",
                                                    width: "10%",
                                                }}
                                            >
                                                {row?.quantity}
                                            </td>
                                            <td
                                                style={{
                                                    padding: "10px",
                                                    fontSize: "14px",
                                                    fontWeight: "500",
                                                    color: "#1f2937",
                                                    width: "15%",
                                                }}
                                            >
                                                <div>
                                                    <span>
                                                        $
                                                        {Number(
                                                            row.total_price
                                                        ).toFixed(2)}
                                                    </span>
                                                </div>
                                            </td>
                                            <td
                                                style={{
                                                    padding: "10px",
                                                    fontSize: "14px",
                                                    fontWeight: "500",
                                                    color: "#1f2937",
                                                    width: "30%",
                                                }}
                                            >
                                                <div>
                                                    {row.product
                                                        ?.wayne_logo_position && (
                                                        <p
                                                            style={{
                                                                margin: "0 0 5px",
                                                            }}
                                                        >
                                                            Wayne Health Logo $
                                                            {
                                                                row.product
                                                                    .wayne_logo_price
                                                            }
                                                            :{" "}
                                                            {row?.wayne_logo ===
                                                            "yes"
                                                                ? row?.wayne_logo
                                                                : "no"}
                                                        </p>
                                                    )}
                                                    {row.product
                                                        ?.co_brand_logo_position &&
                                                        row?.co_brand_logo && (
                                                            <p
                                                                style={{
                                                                    margin: "0 0 5px",
                                                                }}
                                                            >
                                                                Co-brand Logo $
                                                                {
                                                                    row.embroidery_logo_cost
                                                                }
                                                                :{" "}
                                                                {
                                                                    row?.co_brand_logo
                                                                }
                                                            </p>
                                                        )}
                                                    {row.product
                                                        ?.official_logo_position &&
                                                        row?.official_logo && (
                                                            <p
                                                                style={{
                                                                    margin: "0 0 5px",
                                                                }}
                                                            >
                                                                Official Logo $
                                                                {
                                                                    row.embroidery_logo_cost
                                                                }
                                                                :
                                                            </p>
                                                        )}
                                                    {row.product
                                                        ?.embroidery_lines ===
                                                        "line1" &&
                                                        row?.line1 && (
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
                                                    {row.product
                                                        ?.embroidery_lines ===
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
                                                                    :{" "}
                                                                    {row?.line1}
                                                                </p>
                                                            )}
                                                            {row?.line2 && (
                                                                <p
                                                                    style={{
                                                                        margin: "0 0 5px",
                                                                    }}
                                                                >
                                                                    Line 2:{" "}
                                                                    {row?.line2}
                                                                </p>
                                                            )}
                                                        </>
                                                    )}
                                                    {row.product
                                                        ?.embroidery_lines ===
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
                                                                    :{" "}
                                                                    {row?.line1}
                                                                </p>
                                                            )}
                                                            {row?.line2 && (
                                                                <p
                                                                    style={{
                                                                        margin: "0 0 5px",
                                                                    }}
                                                                >
                                                                    Line 2:{" "}
                                                                    {row?.line2}
                                                                </p>
                                                            )}
                                                            {row?.line3 && (
                                                                <p
                                                                    style={{
                                                                        margin: "0 0 5px",
                                                                    }}
                                                                >
                                                                    Line 3:{" "}
                                                                    {row?.line3}
                                                                </p>
                                                            )}
                                                        </>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </td>
                </tr>

                <tr>
                    <td>
                        <table
                            width="100%"
                            style={{
                                borderCollapse: "collapse",
                                marginTop: "10px",
                                backgroundColor: "#f3f4f6",
                            }}
                        >
                            <tr>
                                <td style={{ padding: "10px" }}>
                                    <div
                                        style={{
                                            display: "block",
                                            marginBottom: "5px",
                                        }}
                                    >
                                        <span>Subtotal: </span>
                                        <span style={{ float: "right" }}>
                                            ${Number(total).toFixed(2)}
                                        </span>
                                    </div>
                                    <div
                                        style={{
                                            display: "block",
                                            marginBottom: "5px",
                                        }}
                                    >
                                        <span>Shipping(Ground Service):</span>
                                        <span style={{ float: "right" }}>
                                            $0.00
                                        </span>
                                    </div>
                                    <div
                                        style={{
                                            display: "block",
                                            marginBottom: "5px",
                                        }}
                                    >
                                        <span>Tax:</span>
                                        <span style={{ float: "right" }}>
                                            $0.00
                                        </span>
                                    </div>
                                    <div style={{ display: "block" }}>
                                        <span>Order Total:</span>
                                        <span style={{ float: "right" }}>
                                            ${Number(total).toFixed(2)}
                                        </span>
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </div>
    );
};

export default OrderConfirmationMail;
