import React, { useEffect, useState } from "react";
import FormInputField from "./FormInputField";
import FormSelectField from "./FormSelectField";
import {
    co_brand_logo_options,
    isFalsy,
    official_logo_options,
    toastOptions,
    wayne_logo_options,
} from "../constantVriables";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const OrderItemUpdateRow = ({
    row,
    orderDetails,
    setIsUpdated,
    price_per_unit,
    CustomerDetails,
}) => {
    const [fields, setFields] = useState({});

    const [selectedCoBrandLogoPrice, setSelectedCoBrandLogoPrice] = useState(0);

    const [selectedOfficialLogoPrice, setSelectedOfficialLogoPrice] =
        useState(0);

    const [error, setError] = useState({});

    const [isEdit, setIsEdit] = useState(false);

    const [editId, setEditId] = useState(null);

    const [quantity, setQuantity] = useState(0);

    const updateQty = (id) => {
        console.log(quantity, id);

        const token = localStorage.getItem("x-wayne-health-token");

        axios
            .put(
                "/api/customer/cart/update-quantity-admin/" + id,
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
        setQuantity(row.quantity);
    };

    useEffect(() => {
        setFields(row);
        setSelectedCoBrandLogoPrice(
            row?.embroidery_logo_cost ? fields.embroidery_logo_cost : 0
        );
        setSelectedOfficialLogoPrice(
            row?.embroidery_logo_cost ? fields.embroidery_logo_cost : 0
        );
    }, [row]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFields({ ...fields, [name]: value });
    };

    const handleLinesChange = (e) => {
        const { name, value } = e.target;
        if (value.length > 25) {
            setError({
                ...error,
                [name]: "Maximum 25 characters allowed",
            });
            return;
        } else if (value.length === 24) {
            setError({
                ...error,
                [name]: "",
            });
        }
        setFields((prev) => ({ ...prev, [name]: value }));
    };

    const onUpdate = () => {
        const token = localStorage.getItem("x-wayne-health-token");

        let newFields = {};

        const emb_line_cost =
            isFalsy(fields.line1) &&
            isFalsy(fields?.line2) &&
            isFalsy(fields.line3)
                ? 0
                : fields.product?.embroidery_lines_price
                ? Number(fields.product.embroidery_lines_price)
                : 0;

        // const wayne_logo_price =

        let total_price = 0;

        let total_price_for_one = 0;

        if (fields.wayne_logo_price !== 0 || fields.wayne_logo_price !== null) {
            total_price_for_one =
                Number(fields.price) +
                Number(emb_line_cost) +
                Number(fields.embroidery_logo_cost) +
                Number(fields.wayne_logo_price);
        } else {
            total_price_for_one =
                Number(fields.price) +
                Number(emb_line_cost) +
                Number(fields.embroidery_logo_cost);
        }

        total_price = total_price_for_one * Number(fields.quantity);

        newFields = {
            ...fields,
            embroidery_lines_cost: emb_line_cost,
            size: fields.size,
            price: fields.price,
            quantity: fields.quantity,
            total_price: total_price,
            total_price_for_one: total_price_for_one,
        };

        console.log(newFields);

        axios
            .put(
                "/api/customer/order/update-orderItem/" + fields.id,
                newFields,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: "application/json",
                    },
                }
            )
            .then((data) => {
                console.log(data);
                console.log(data.data.id);
                if (data?.data) {
                    setIsUpdated((prev) => !prev);
                    toast.success(
                        "Order item updated successfully",
                        toastOptions
                    );
                    // setOrders(data.data);
                    // setCartItems(data.data.cartItems);
                    // setCartId(data.data.cartId);
                    // setTotal(data.data.total);
                }
            })
            .catch((err) => console.log(err));
    };

    return (
        <>
            <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                <div className="flex flex-col gap-2">
                    <span>{fields.name}</span>{" "}
                    <span>Manufacturer: {fields.product?.manufacturer}</span>{" "}
                    <span>Item Code: {fields.product?.item_code}</span>{" "}
                    {row?.inseam ? <span>Inseam: {fields.inseam}</span> : null}{" "}
                    {row?.fit ? <span>Fit: {fields.fit}</span> : null}{" "}
                    {row?.size ? <span>Size: {fields.size}</span> : null}{" "}
                    {row?.length ? <span>Length: {fields.length}</span> : null}{" "}
                </div>
            </td>
            <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                <div className="w-80">
                    <FormInputField
                        name="line1"
                        label="Line 1"
                        value={fields.line1}
                        onChange={handleLinesChange}
                    />
                </div>
            </td>
            <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                <div className="w-80">
                    <FormInputField
                        name="line2"
                        label="Line 2"
                        value={fields.line2}
                        onChange={handleLinesChange}
                    />
                </div>
            </td>
            <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                <div className="w-80">
                    <FormInputField
                        name="line3"
                        label="Line 3"
                        value={fields.line3}
                        onChange={handleLinesChange}
                    />
                </div>
            </td>
            <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                <div className="w-80">
                    <FormSelectField
                        value={fields.co_brand_logo}
                        name="co_brand_logo"
                        options={co_brand_logo_options}
                        onChange={(event) => {
                            handleChange(event);

                            if (event.target.selectedIndex !== 0) {
                                setFields((prev) => {
                                    return {
                                        ...prev,
                                        embroidery_logo_cost:
                                            fields.product.co_brand_logo_price[
                                                event.target.selectedIndex - 1
                                            ],
                                    };
                                });
                                setSelectedCoBrandLogoPrice(
                                    fields.product.co_brand_logo_price[
                                        event.target.selectedIndex - 1
                                    ]
                                );
                            } else {
                                setFields((prev) => {
                                    return {
                                        ...prev,
                                        embroidery_logo_cost: 0,
                                    };
                                });
                                setSelectedCoBrandLogoPrice(0);
                            }
                        }}
                    />
                </div>
            </td>
            <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                <div className="w-80">
                    <FormSelectField
                        value={fields.wayne_logo}
                        name="wayne_logo"
                        options={wayne_logo_options}
                        onChange={(e) => {
                            handleChange(e);
                            if (e.target.selectedIndex !== 0) {
                                setFields((prev) => {
                                    return {
                                        ...prev,
                                        wayne_logo_price: Number(
                                            fields.product.wayne_logo_price
                                        ),
                                    };
                                });
                            } else {
                                setFields((prev) => {
                                    return {
                                        ...prev,
                                        wayne_logo_price: 0,
                                    };
                                });
                            }
                        }}
                    />
                </div>
            </td>
            <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                <div className="w-80">
                    <FormSelectField
                        value={fields.official_logo}
                        name="official_logo"
                        options={official_logo_options}
                        onChange={(event) => {
                            handleChange(event);

                            if (event.target.selectedIndex !== 0) {
                                setFields((prev) => {
                                    return {
                                        ...prev,
                                        embroidery_logo_cost:
                                            fields.product.official_logo_price[
                                                event.target.selectedIndex - 1
                                            ],
                                    };
                                });
                                setSelectedOfficialLogoPrice(
                                    fields.product.official_logo_price[
                                        event.target.selectedIndex - 1
                                    ]
                                );
                            } else {
                                setFields((prev) => {
                                    return {
                                        ...prev,
                                        embroidery_logo_cost: 0,
                                    };
                                });
                                setSelectedOfficialLogoPrice(0);
                            }
                        }}
                    />
                </div>
            </td>
            <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                <div className="flex flex-col gap-2">
                    <span>
                        {orderDetails?.shipping_ship_to_name},{" "}
                        {orderDetails?.shipping_ship_to_company}
                    </span>
                    <span>{orderDetails?.shipping_address_line_1}</span>
                    <span>{orderDetails?.shipping_address_line_2}</span>
                    <span>
                        {orderDetails?.shipping_city}{" "}
                        {orderDetails?.shipping_state}
                    </span>
                    <span>
                        {orderDetails?.shipping_postal_code}{" "}
                        {orderDetails?.shipping_country}
                    </span>
                </div>
            </td>
            <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                <span>${price_per_unit}</span>
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
                        <button onClick={() => updateQty(row.id)}>
                            Update Qty
                        </button>
                    </div>
                ) : (
                    <div className="flex flex-col gap-2 items-start">
                        <span>{row.quantity}</span>
                        <button onClick={() => onEdit(row.id)}>Edit Qty</button>
                    </div>
                )}
            </td>
            <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                <span>${fields.total_price}</span>
            </td>
            <td className=" p-5 ">
                <div className="w-52">
                    <Link to={"/admin/edit-customer/" + CustomerDetails.id}>
                        {CustomerDetails.first_name} {CustomerDetails.last_name}
                    </Link>
                </div>
            </td>
            <td className=" p-5 ">
                <div className="w-52">
                    <button
                        className="font-bold text-lg hover:text-green-500 hover:underline"
                        onClick={onUpdate}
                    >
                        Update
                    </button>
                </div>
            </td>
        </>
    );
};

export default OrderItemUpdateRow;
