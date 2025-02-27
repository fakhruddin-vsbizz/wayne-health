import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import FormInputField from "../../Components/FormInputField";
import FormSelectField from "../../Components/FormSelectField";
import { convertStringToObject } from "../../constantVriables";
import Counter from "../../Components/Counter";
import axios from "axios";
import { toast } from "react-toastify";

const EditCartItem = () => {
    const { cartItemId } = useParams();

    const [fit, setFit] = useState("");

    const [newLength, setNewLength] = useState("");

    const [priceAndSizeArray, setPriceAndSizeArray] = useState([]);

    const { productId } = useParams();

    const [cartItem, setCartItem] = useState({
        product_id: productId,
        line1: "",
        line2: "",
        line3: "",
        embroidery_lines_cost: "",
        embroidery_logo_cost: "",
        wayne_logo: "",
        co_brand_logo: "",
        official_logo: "",
        fit: "",
        productLength: "",
        size: "",
        price: "",
        quantity: 0,
    });

    const [product, setProduct] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCartItem((prev) => ({ ...prev, [name]: value }));
    };

    useEffect(() => {
        const token = localStorage.getItem("x-wayne-health-token");

        axios
            .get("/api/customer/cart/" + cartItemId, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            })
            .then((data) => {
                console.log(data);
                if (data?.data) {
                    console.log(data.data, "data");
                    setCartItem(data.data[0]);
                    setProduct(data.data[0].product);
                    setNewLength(
                        data.data[0].product.product_sizes[0].productLength
                    );
                    setFit(data.data[0].product.product_sizes[0].fit);
                    setPriceAndSizeArray(
                        convertStringToObject(
                            data.data[0].product.product_sizes[0].sizes
                        ).map((item) =>
                            item.size === data.data[0].size
                                ? {
                                      size: item.size,
                                      price: data.data[0].size.price,
                                      quantity: data.data[0].quantity,
                                  }
                                : item
                        )
                    );
                }
            })
            .catch((err) => console.log(err));
    }, []);

    useEffect(() => {
        document.querySelectorAll(".zoom-container").forEach((container) => {
            const img = container.querySelector(".zoom-image");

            container.addEventListener("mousemove", (e) => {
                const rect = container.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;

                img.style.transformOrigin = `${x}% ${y}%`;
                img.style.transform = "scale(2)";
            });

            container.addEventListener("mouseleave", () => {
                img.style.transform = "scale(1)";
                img.style.transformOrigin = "center center";
            });
        });
    }, []);

    // useEffect(() => {
    //     //   const token = localStorage.getItem("x-wayne-health-token");

    //     axios
    //         .get("/api/admin/products/" + productId, {
    //             headers: {
    //                 //   Authorization: `Bearer ${token}`,
    //                 Accept: "application/json",
    //                 "Content-Type": "application/json",
    //             },
    //         })
    //         .then((data) => {
    //             console.log(data);
    //             if (data?.data) {
    //                 console.log(data.data);
    //                 setProduct(data.data);
    //                 setNewLength(data.data.product_sizes[0].length);
    //                 setFit(data.data.product_sizes[0].fit);
    //                 setPriceAndSizeArray(
    //                     convertStringToObject(data.data.product_sizes[0].sizes)
    //                 );
    //             }
    //         })
    //         .catch((err) => console.log(err));
    // }, [productId]);

    const onUpdate = () => {
        // console.log(cartItem);

        console.log(cartItem);

        const token = localStorage.getItem("x-wayne-health-token");

        axios
            .put(
                "/api/customer/cart/" + cartItem.id,
                JSON.stringify(cartItem),
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + token,
                    },
                }
            )
            .then((data) => {
                console.log(data);
                if (data?.data) {
                    toast.success("Item Updated successfully");
                } else {
                    toast.error("Failed to update cart item");
                }
            })
            .catch((err) => console.log(err));
    };

    return (
        <div className="p-4">
            <form className="flex flex-col items-center">
                <div className="flex flex-col">
                    <div className="flex flex-col">
                        <div className="embroidery-form-section mb-12">
                            <div className="mb-12">
                                {product.embroidery_lines === "line1" ? (
                                    <FormInputField
                                        id="line1"
                                        name="line1"
                                        value={cartItem.line1}
                                        onChange={handleChange}
                                        label="Line 1:"
                                        placeholder="Enter embroidery text"
                                    />
                                ) : null}
                                {product.embroidery_lines === "line2" ? (
                                    <FormInputField
                                        id="line2"
                                        name="line2"
                                        value={cartItem.line2}
                                        onChange={handleChange}
                                        label="Line 2:"
                                        placeholder="Enter embroidery text"
                                    />
                                ) : null}
                                {product.embroidery_lines === "line3" ? (
                                    <FormInputField
                                        id="line3"
                                        name="line3"
                                        value={cartItem.line3}
                                        onChange={handleChange}
                                        label="Line 3:"
                                        placeholder="Enter embroidery text"
                                    />
                                ) : null}
                            </div>
                            {product.wayne_logo_position !== null && (
                                <>
                                    <span className="pb-7 text-gray-700">
                                        Wayne Health logo on{" "}
                                        {product.wayne_logo_position} chest: $
                                        {product.wayne_logo_price || "10"}
                                    </span>
                                    <FormSelectField
                                        id="wayne_logo"
                                        name="wayne_logo"
                                        value={cartItem.wayne_logo}
                                        options={[
                                            {
                                                title: "Yes",
                                                value: "yes",
                                            },
                                        ]}
                                        onChange={handleChange}
                                        blankLabel="No"
                                    />
                                    <div className="grid gap-6 mb-6">
                                        <ul className="grid w-full gap-6 md:grid-cols-3">
                                            <li>
                                                <div
                                                    htmlFor="wayne_logo"
                                                    className="inline-flex items-center justify-between w-full px-5 pt-5 pb-2 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer peer-checked:border-blue-600 hover:text-gray-600"
                                                >
                                                    <div className="flex flex-col gap-3">
                                                        <img
                                                            src={`/images/logos/wayne-logo.png`}
                                                            alt="wayne health logo"
                                                        />
                                                        <div className="w-full text-lg font-semibold text-center">
                                                            $
                                                            {product.wayne_logo_price ||
                                                                "10"}
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </>
                            )}

                            {product.co_brand_logo_position !== null && (
                                <>
                                    <span className="pb-7 text-gray-700">
                                        Optional Co-Brand logo on{" "}
                                        {product.co_brand_logo_position} chest:
                                    </span>
                                    <FormSelectField
                                        id="co_brand_logo"
                                        name="co_brand_logo"
                                        options={[
                                            {
                                                title: "DMC",
                                                value: "dmc logo",
                                            },
                                            {
                                                title: "Keresge",
                                                value: "keresge logo",
                                            },
                                            {
                                                title: "Karmanos",
                                                value: "karmanos logo",
                                            },
                                        ]}
                                        value={cartItem.co_brand_logo}
                                        onChange={handleChange}
                                        blankLabel="No"
                                    />
                                    <div className="grid gap-6 mb-6">
                                        <div className="grid w-full gap-6 md:grid-cols-3">
                                            <div
                                                htmlFor={`dmc-logo-option`}
                                                className="inline-flex items-center justify-between w-full px-5 pt-5 pb-2 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer peer-checked:border-blue-600 hover:text-gray-600 h-32"
                                            >
                                                <div className="flex flex-col gap-3 justify-between h-full">
                                                    <img
                                                        src={`/images/logos/dmc-logo.png`}
                                                        alt={`dmc logo`}
                                                    />
                                                    <div className="w-full text-lg font-semibold text-center">
                                                        $10
                                                    </div>
                                                </div>
                                            </div>
                                            <div
                                                htmlFor={`keresge-logo-option`}
                                                className="inline-flex items-center justify-between w-full px-5 pt-5 pb-2 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer peer-checked:border-blue-600 hover:text-gray-600 h-32"
                                            >
                                                <div className="flex flex-col gap-3 justify-between h-full">
                                                    <img
                                                        src={`/images/logos/keresge-logo.png`}
                                                        alt={`keresge logo`}
                                                    />
                                                    <div className="w-full text-lg font-semibold text-center">
                                                        $10
                                                    </div>
                                                </div>
                                            </div>
                                            <div
                                                htmlFor={`karmanos-logo-option`}
                                                className="inline-flex items-center justify-between w-full px-5 pt-5 pb-2 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer peer-checked:border-blue-600 hover:text-gray-600 h-32"
                                            >
                                                <div className="flex flex-col gap-3 justify-between h-full">
                                                    <img
                                                        src={`/images/logos/karmanos-logo.png`}
                                                        alt={`karmanos logo`}
                                                    />
                                                    <div className="w-full text-lg font-semibold text-center">
                                                        $10
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}

                            {product.official_logo_position !== null && (
                                <>
                                    <span className="pb-7 text-gray-700">
                                        Add official embroidered logo on{" "}
                                        {product.official_logo_position} chest:
                                    </span>
                                    <FormSelectField
                                        id="official_logo"
                                        name="official_logo"
                                        options={[
                                            {
                                                title: "Wayne Health",
                                                value: "Wayne Health Scrub Logo",
                                            },
                                            {
                                                title: "Wayne Health + KEI",
                                                value: "Wayne Health + KEI Logo",
                                            },
                                        ]}
                                        value={cartItem.official_logo}
                                        onChange={handleChange}
                                        blankLabel="No"
                                    />
                                    <div className="grid gap-6 mb-6">
                                        <div className="grid w-full gap-6 md:grid-cols-3">
                                            <div
                                                style={{ height: "155px" }}
                                                htmlFor={`wayne-health-logo-option`}
                                                className="inline-flex items-center justify-between w-full px-5 pt-5 pb-2 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer peer-checked:border-blue-600 hover:text-gray-600 h-32"
                                            >
                                                <div className="flex flex-col gap-3 justify-center h-full">
                                                    <img
                                                        src={`/images/logos/wayne_scrub_logo.png`}
                                                        alt={`wayne health logo`}
                                                    />
                                                    <div className="w-full text-lg font-semibold text-center">
                                                        $10
                                                    </div>
                                                </div>
                                            </div>
                                            <div
                                                style={{ height: "155px" }}
                                                htmlFor={`KEI-wayne-health-logo-option`}
                                                className="inline-flex items-center justify-between w-full px-5 pt-5 pb-2 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer peer-checked:border-blue-600 hover:text-gray-600 h-32"
                                            >
                                                <div className="flex flex-col gap-3 justify-between h-full">
                                                    <img
                                                        src={`/images/logos/kei_wayne_logo.png`}
                                                        alt={`KEI plus wayne health logo`}
                                                    />
                                                    <div className="w-full text-lg font-semibold text-center">
                                                        $10
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                            {fit ? (
                                <div className="mb-12">
                                    <FormInputField
                                        label="Fit:"
                                        id="fit"
                                        name="fit"
                                        value={fit}
                                    />
                                </div>
                            ) : null}
                            {newLength ? (
                                <div className="mb-12">
                                    <FormInputField
                                        label="Length:"
                                        id="length"
                                        name="newLength"
                                        value={newLength}
                                    />
                                </div>
                            ) : null}
                            <div style={{ width: "47vw" }}>
                                <Counter
                                    item={cartItem}
                                    key={cartItem.size}
                                    setPriceAndSizeArray={setPriceAndSizeArray}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* sizes */}
                {/* {product.product_sizes.map((item) => ( */}
                {/* ))} */}

                {/* Submit button */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <button
                        type="button"
                        onClick={onUpdate}
                        className="max-w-52 bg-blue-500 text-white px-4 py-2 rounded-lg"
                    >
                        Update
                    </button>
                    <Link
                        to={"/customer/cart/" + cartItem.cart_id}
                        className="text-center max-w-52 bg-blue-500 text-white px-4 py-2 rounded-lg"
                    >
                        Back
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default EditCartItem;
