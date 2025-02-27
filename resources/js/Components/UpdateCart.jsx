import React, { useEffect, useState } from "react";
import FormSelectField from "./FormSelectField";
import {
    co_brand_logo_options,
    isFalsy,
    official_logo_options,
    wayne_logo_options,
} from "../constantVriables";
import FormInputField from "./FormInputField";
import axios from "axios";

const UpdateCart = ({ cartItem, setIsUpdated, noupdate }) => {
    const [isEdit, setIsEdit] = useState(false);

    const [fields, setFields] = useState({});

    const [selectedCoBrandLogoPrice, setSelectedCoBrandLogoPrice] = useState(0);

    const [selectedOfficialLogoPrice, setSelectedOfficialLogoPrice] =
        useState(0);

    const [error, setError] = useState({});

    useEffect(() => {
        setFields(cartItem);
        setSelectedCoBrandLogoPrice(
            cartItem?.embroidery_logo_cost ? cartItem.embroidery_logo_cost : 0.0
        );
        setSelectedOfficialLogoPrice(
            cartItem?.embroidery_logo_cost ? cartItem.embroidery_logo_cost : 0.0
        );
    }, [cartItem]);

    const handleEdit = () => {
        setIsEdit(true);
    };

    const handleClose = () => {
        setIsEdit(false);
    };

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
                : cartItem.product?.embroidery_lines_price
                ? Number(cartItem.product.embroidery_lines_price)
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
            .put("/api/customer/cart/" + cartItem.id, newFields, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                },
            })
            .then((data) => {
                console.log(data);
                console.log(data.data.cartItem);
                if (data?.data) {
                    setIsUpdated((prev) => !prev);
                    setIsEdit(false);
                    // setOrders(data.data);
                    // setCartItems(data.data.cartItems);
                    // setCartId(data.data.cartId);
                    // setTotal(data.data.total);
                }
            })
            .catch((err) => console.log(err));
    };

    return !isEdit ? (
        <span className="flex flex-col">
            {cartItem.product?.wayne_logo_position ? (
                <span>
                    Wayne Health Logo ${cartItem.product.wayne_logo_price}: {""}
                    {cartItem?.wayne_logo === "yes"
                        ? cartItem?.wayne_logo
                        : "no"}
                </span>
            ) : null}
            {cartItem.product?.co_brand_logo_position ? (
                cartItem?.co_brand_logo ? (
                    <span>
                        Co-brand Logo ${cartItem.embroidery_logo_cost}:{" "}
                        {cartItem?.co_brand_logo}
                    </span>
                ) : null
            ) : null}
            {cartItem.product?.official_logo_position ? (
                cartItem?.official_logo ? (
                    <span>Official Logo ${cartItem.embroidery_logo_cost}:</span>
                ) : null
            ) : null}
            {cartItem.product?.embroidery_lines === "line1" ? (
                cartItem?.line1 ? (
                    <span>
                        Line 1 ${cartItem.embroidery_lines_cost}:{" "}
                        {cartItem?.line1}
                    </span>
                ) : null
            ) : null}
            {cartItem.product?.embroidery_lines === "line2" ? (
                <>
                    {cartItem?.line1 ? (
                        <span>
                            Line 1 ${cartItem.embroidery_lines_cost}:{" "}
                            {cartItem?.line1}
                        </span>
                    ) : null}
                    {cartItem?.line2 ? (
                        <span>Line 2: {cartItem?.line2}</span>
                    ) : null}
                </>
            ) : null}
            {cartItem.product?.embroidery_lines === "line3" ? (
                <>
                    {cartItem?.line1 ? (
                        <span>
                            Line 1 ${cartItem.embroidery_lines_cost}:{" "}
                            {cartItem?.line1}
                        </span>
                    ) : null}
                    {cartItem?.line2 ? (
                        <span>Line 2: {cartItem?.line2}</span>
                    ) : null}
                    {cartItem?.line3 ? (
                        <span>Line 3: {cartItem?.line3}</span>
                    ) : null}
                </>
            ) : null}
            {cartItem.product?.wayne_logo_position ||
            cartItem.product?.co_brand_logo_position ||
            cartItem.product?.official_logo_position ||
            cartItem.product?.embroidery_lines === "line1" ||
            cartItem.product?.embroidery_lines === "line2" ||
            cartItem.product?.embroidery_lines === "line3" ? (
                noupdate ? null : (
                    <div>
                        <button
                            onClick={handleEdit}
                            className="text-blue-500 hover:text-blue-700"
                        >
                            Edit
                        </button>
                    </div>
                )
            ) : null}
        </span>
    ) : (
        <span>
            {cartItem.product?.wayne_logo_position ? (
                <FormSelectField
                    label={
                        "Wayne Health Logo $" +
                        cartItem.product.wayne_logo_price
                    }
                    id="wayne_logo"
                    name="wayne_logo"
                    value={fields.wayne_logo}
                    options={wayne_logo_options}
                    onChange={(e) => {
                        handleChange(e);
                        if (e.target.selectedIndex !== 0) {
                            setFields((prev) => {
                                return {
                                    ...prev,
                                    wayne_logo_price: Number(
                                        cartItem.product.wayne_logo_price
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
            ) : null}
            {cartItem.product?.co_brand_logo_position ? (
                <FormSelectField
                    label={
                        selectedCoBrandLogoPrice !== 0
                            ? "Co-brand Logo $" + selectedCoBrandLogoPrice
                            : "Co-brand Logo $"
                    }
                    value={fields.co_brand_logo}
                    id="co_brand_logo"
                    name="co_brand_logo"
                    options={co_brand_logo_options}
                    onChange={(event) => {
                        handleChange(event);

                        if (event.target.selectedIndex !== 0) {
                            setFields((prev) => {
                                return {
                                    ...prev,
                                    embroidery_logo_cost:
                                        cartItem.product.co_brand_logo_price[
                                            event.target.selectedIndex - 1
                                        ],
                                };
                            });
                            setSelectedCoBrandLogoPrice(
                                cartItem.product.co_brand_logo_price[
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
            ) : null}
            {cartItem.product?.official_logo_position ? (
                <FormSelectField
                    label={
                        selectedOfficialLogoPrice !== 0
                            ? "Official Logo $" + selectedOfficialLogoPrice
                            : "Official Logo $"
                    }
                    value={fields.official_logo}
                    id="official_logo"
                    name="official_logo"
                    options={official_logo_options}
                    onChange={(event) => {
                        handleChange(event);

                        if (event.target.selectedIndex !== 0) {
                            setFields((prev) => {
                                return {
                                    ...prev,
                                    embroidery_logo_cost:
                                        cartItem.product.official_logo_price[
                                            event.target.selectedIndex - 1
                                        ],
                                };
                            });
                            setSelectedOfficialLogoPrice(
                                cartItem.product.official_logo_price[
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
            ) : null}
            {cartItem.product?.embroidery_lines === "line1" ? (
                <FormInputField
                    label="Line 1:"
                    value={fields.line1}
                    name="line1"
                    onChange={handleLinesChange}
                />
            ) : null}
            {cartItem.product?.embroidery_lines === "line2" ? (
                <>
                    <FormInputField
                        label="Line 1:"
                        value={fields.line1}
                        name="line1"
                        onChange={handleLinesChange}
                    />
                    <FormInputField
                        label="Line 2:"
                        value={fields.line2}
                        name="line2"
                        onChange={handleLinesChange}
                    />
                </>
            ) : null}
            {cartItem.product?.embroidery_lines === "line3" ? (
                <>
                    <FormInputField
                        label="Line 1:"
                        value={fields.line1}
                        name="line1"
                        onChange={handleLinesChange}
                    />
                    <FormInputField
                        label="Line 2:"
                        value={fields.line2}
                        name="line2"
                        onChange={handleLinesChange}
                    />
                    <FormInputField
                        label="Line 3:"
                        value={fields.line3}
                        name="line3"
                        onChange={handleLinesChange}
                    />
                </>
            ) : null}
            <div className="flex gap-4">
                <button
                    onClick={onUpdate}
                    className="text-blue-500 hover:text-blue-700"
                >
                    Update
                </button>
                <button onClick={handleClose} className="hover:text-red-700">
                    Close
                </button>
            </div>
        </span>
    );
};

export default UpdateCart;
