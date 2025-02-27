import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import FormInputField from "../../Components/FormInputField";
import FormSelectField from "../../Components/FormSelectField";
import {
    co_brand_logo_options,
    convertStringToObject,
    isFalsy,
    official_logo_options,
    pdfNames,
    primaryGreen,
    wayne_logo_options,
} from "../../constantVriables";
import Counter from "../../Components/Counter";
import axios from "axios";
import { toast } from "react-toastify";
import { useReactToPrint } from "react-to-print";
import { CustomModal } from "../../Components/CustomModal";
import PrintProduct from "../print/PrintProduct";

const ProductPage = ({ setCartIsUpdated }) => {
    const [fit, setFit] = useState("");
    const [fitOptions, setFitOptions] = useState("");
    const [inseam, setInseam] = useState("");
    const [inseamOptions, setInseamOptions] = useState([]);
    const [inNewLengthOptions, setNewLengthOptions] = useState([]);

    const [productSizeIndx, setProductSizeIndx] = useState(0);

    const [Open, setOpen] = useState(false);

    const [newLength, setNewLength] = useState("");

    const contentRef = useRef(null);

    const [priceAndSizeArray, setPriceAndSizeArray] = useState([]);

    const [noPersonalization, setNoPersonalization] = useState(false);

    const [error, setError] = useState({});

    const { productId } = useParams();

    const [cartItem, setCartItem] = useState({
        product_id: productId,
        line1: "",
        line2: "",
        line3: "",
        embroidery_lines_cost: 0.0,
        embroidery_logo_cost: 0.0,
        wayne_logo_price: 0.0,
        wayne_logo: "",
        co_brand_logo: "",
        official_logo: "",
        fit: "",
        inseam: "",
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
        setCartItem((prev) => ({ ...prev, [name]: value }));
    };

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

    //change size with fit length or
    useEffect(() => {
        if (product.length !== 0) {
            if (product.product_sizes[productSizeIndx]?.productLength) {
                setNewLength(
                    product.product_sizes[productSizeIndx].productLength
                );
            }
            if (product.product_sizes[productSizeIndx]?.fit) {
                setFit(product.product_sizes[productSizeIndx].fit);
            }
            if (product.product_sizes[productSizeIndx]?.inseam) {
                setInseam(product.product_sizes[productSizeIndx].inseam);
            }
            setPriceAndSizeArray(
                convertStringToObject(
                    product.product_sizes[productSizeIndx].sizes
                )
            );
        }

        // console.log(product.product_sizes[productSizeIndx]?.length);
    }, [productSizeIndx]);

    useEffect(() => {
        //   const token = localStorage.getItem("x-wayne-health-token");

        axios
            .get("/api/admin/products/" + productId, {
                headers: {
                    //   Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            })
            .then((data) => {
                console.log(data);
                if (data?.data) {
                    console.log(data.data);
                    setProduct(data.data);
                    const isPersonalization =
                        data.data?.embroidery_lines_position !== null ||
                        data.data?.wayne_logo_position !== null ||
                        data.data?.co_brand_logo_position !== null;
                    console.log(isPersonalization);
                    setNoPersonalization(isPersonalization);
                    setNewLength(
                        data.data.product_sizes[0].productLength === undefined
                            ? ""
                            : data.data.product_sizes[0].productLength
                    );
                    setFit(
                        data.data.product_sizes[0].fit === undefined
                            ? ""
                            : data.data.product_sizes[0].fit
                    );
                    setInseam(
                        data.data.product_sizes[0].inseam === undefined
                            ? ""
                            : data.data.product_sizes[0].inseam
                    );
                    if (data.data.product_sizes[0]?.inseam) {
                        setInseamOptions(
                            data.data.product_sizes.map((item) => ({
                                value: item.inseam,
                                title: item.inseam,
                            }))
                        );
                    }
                    if (data.data.product_sizes[0]?.fit) {
                        setFitOptions(
                            data.data.product_sizes.map((item) => ({
                                value: item.fit,
                                title: item.fit,
                            }))
                        );
                    }
                    if (data.data.product_sizes[0]?.productLength) {
                        setNewLengthOptions(
                            data.data.product_sizes.map((item) => ({
                                value: item.productLength,
                                title: item.productLength,
                            }))
                        );
                    }
                    setPriceAndSizeArray(
                        convertStringToObject(data.data.product_sizes[0].sizes)
                    );
                }
            })
            .catch((err) => console.log(err));
    }, [productId]);

    const onAddToCart = () => {
        // console.log(cartItem);
        // console.log(priceAndSizeArray);
        // console.log(fit);
        // console.log(newLength);
        const cart = priceAndSizeArray
            .filter((item) => item.quantity > 0)
            .map((item) => {
                console.log(item, cartItem);
                const emb_line_cost =
                    cartItem.line1 === "" &&
                    cartItem.line2 === "" &&
                    cartItem.line3 === ""
                        ? 0
                        : product?.embroidery_lines_price
                        ? Number(product.embroidery_lines_price)
                        : 0;

                // const wayne_logo_price =

                let total_price = 0;

                let total_price_for_one = 0;

                if (
                    cartItem.wayne_logo_price !== 0.0 ||
                    cartItem.wayne_logo_price !== null
                ) {
                    total_price_for_one =
                        Number(item.price) +
                        Number(emb_line_cost) +
                        Number(cartItem.embroidery_logo_cost) +
                        Number(cartItem.wayne_logo_price);
                } else {
                    total_price_for_one =
                        Number(item.price) +
                        Number(emb_line_cost) +
                        Number(cartItem.embroidery_logo_cost);
                }

                total_price = total_price_for_one * Number(item.quantity);

                return {
                    ...cartItem,
                    inseam,
                    fit,
                    productLength: newLength,
                    embroidery_lines_cost: emb_line_cost,
                    size: item.size,
                    price: Number(item.price),
                    quantity: Number(item.quantity),
                    total_price: total_price,
                    total_price_for_one: total_price_for_one,
                };
            });

        console.log(cart);

        const token = localStorage.getItem("x-wayne-health-token");

        axios
            .post("/api/customer/cart", JSON.stringify({ cart }), {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                },
            })
            .then((data) => {
                console.log(data);
                if (data?.data?.success) {
                    setCartIsUpdated((prev) => !prev);
                    toast.success("Items added to cart", {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: false,
                        progress: undefined,
                        theme: "light",
                    });
                } else {
                    toast.error("Failed to add items to cart", {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: false,
                        progress: undefined,
                        theme: "light",
                    });
                }
            })
            .catch((err) => console.log(err));
    };

    // const handlePrint = useReactToPrint({
    //     contentRef,
    //     pageStyle: "p-4 scale-75",
    // });

    return (
        <section className="bg-gray-100">
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-wrap -mx-4">
                    {/* Product Images */}
                    <div
                        className={
                            product?.product_stitching_image
                                ? "w-full md:w-1/3 px-4 mb-8"
                                : "w-full md:w-2/5 px-4 mb-8"
                        }
                    >
                        <div className="product-image">
                            <div
                                style={{
                                    maxHeight: "420px",
                                    maxWidth: "180px",
                                }}
                                className="zoom-container main-image"
                            >
                                <img
                                    style={{
                                        maxHeight: "420px",
                                        maxWidth: "180px",
                                    }}
                                    src={`/images/${product.product_image}`}
                                    alt="Product"
                                    className="w-full h-auto rounded-lg shadow-md mb-4 zoom-image"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Product Details */}
                    <div
                        className={
                            product?.product_stitching_image
                                ? "w-full md:w-4/6 px-4 mb-8"
                                : "w-full md:w-3/5 px-4 mb-8"
                        }
                    >
                        <h2
                            style={{ color: "#5B913B" }}
                            className="text-2xl font-bold mb-2"
                        >
                            {product.name}
                        </h2>
                        <div className="flex gap-8">
                            <p className="text-gray-700 font-semibold mb-4">
                                Item Code: {product.item_code}
                            </p>
                            <p className="text-gray-700 font-semibold mb-4">
                                Manufacturer: {product.manufacturer}
                            </p>
                            {/* <button
                                onClick={() => setOpen(true)}
                                style={{ backgroundColor: primaryGreen }}
                                className="bg-cyan-500 px-6 py-2 text-white border border-cyan-500 font-bold rounded-md mb-3 w-full lg:w-fit my-6 mt-0 max-w-sm"
                            >
                                Print
                            </button> */}
                        </div>

                        <div
                            className={
                                product?.product_stitching_image
                                    ? "grid grid-cols-1 gap-6 sm:grid-cols-2"
                                    : "grid grid-cols-1 gap-6 sm:grid-cols-1"
                            }
                        >
                            <p
                                style={{
                                    maxWidth: product?.product_stitching_image
                                        ? "320px"
                                        : "70%",
                                    lineHeight: "45px",
                                }}
                                className="text-lg"
                            >
                                <div>
                                    {!product?.multiline_description
                                        ? null
                                        : product.multiline_description
                                              .split(";")
                                              .map((item) => (
                                                  <p className="text-[1rem] h-[2rem]">
                                                      {item}
                                                  </p>
                                              ))}
                                </div>
                                <a
                                    href={product.link}
                                    className="min-w-fit text-blue-500 underline"
                                >
                                    {
                                        pdfNames.filter(
                                            (fItem) =>
                                                fItem.value === product.link
                                        )[0]?.title
                                    }
                                </a>
                            </p>

                            {product?.product_stitching_image ? (
                                <div
                                    style={{
                                        maxHeight: "420px",
                                        maxWidth: "180px",
                                    }}
                                    className="flex flex-col gap-4 justify-around"
                                >
                                    <img
                                        style={{
                                            maxHeight: "420px",
                                            maxWidth: "180px",
                                        }}
                                        src={`/images/${product.product_stitching_image}`}
                                        alt="close-up view of stitching"
                                    />
                                    <p className="text-gray-700 mb-3">
                                        Close-up view of stitching
                                    </p>
                                </div>
                            ) : null}
                        </div>
                    </div>
                </div>

                {/* Customization Form */}
            </div>
            <div>
                <form className="pb-14">
                    {" "}
                    <div className="max-w-7xl mx-auto">
                        <div
                            style={{ justifySelf: "anchor-center" }}
                            className="grid grid-cols-1 gap-6 sm:grid-cols-2"
                        >
                            {noPersonalization ? (
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-1 embroidery-form-section">
                                    <div>
                                        <div className="flex flex-col">
                                            <div className="embroidery-form-section mb-12">
                                                {product.wayne_logo_position !==
                                                    null && (
                                                    <>
                                                        <span className="pb-7 text-gray-700">
                                                            Wayne Health logo on{" "}
                                                            {
                                                                product.wayne_logo_position
                                                            }{" "}
                                                            chest: $
                                                            {
                                                                product.wayne_logo_price
                                                            }
                                                        </span>
                                                        <FormSelectField
                                                            id="wayne_logo"
                                                            name="wayne_logo"
                                                            value={
                                                                cartItem.wayne_logo
                                                            }
                                                            options={
                                                                wayne_logo_options
                                                            }
                                                            onChange={(e) => {
                                                                handleChange(e);
                                                                if (
                                                                    e.target
                                                                        .selectedIndex !==
                                                                    0
                                                                ) {
                                                                    setCartItem(
                                                                        (
                                                                            prev
                                                                        ) => {
                                                                            return {
                                                                                ...prev,
                                                                                wayne_logo_price:
                                                                                    Number(
                                                                                        product.wayne_logo_price
                                                                                    ),
                                                                            };
                                                                        }
                                                                    );
                                                                } else {
                                                                    setCartItem(
                                                                        (
                                                                            prev
                                                                        ) => {
                                                                            return {
                                                                                ...prev,
                                                                                wayne_logo_price: 0,
                                                                            };
                                                                        }
                                                                    );
                                                                }
                                                            }}
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
                                                                                {
                                                                                    product.wayne_logo_price
                                                                                }
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </>
                                                )}

                                                {product.co_brand_logo_position !==
                                                    null && (
                                                    <>
                                                        <span className="pb-7 text-gray-700">
                                                            Optional Co-Brand
                                                            logo on{" "}
                                                            {
                                                                product.co_brand_logo_position
                                                            }{" "}
                                                            chest:
                                                        </span>
                                                        <FormSelectField
                                                            id="co_brand_logo"
                                                            name="co_brand_logo"
                                                            options={
                                                                co_brand_logo_options
                                                            }
                                                            value={
                                                                cartItem.co_brand_logo
                                                            }
                                                            onChange={(
                                                                event
                                                            ) => {
                                                                handleChange(
                                                                    event
                                                                );

                                                                if (
                                                                    event.target
                                                                        .selectedIndex !==
                                                                    0
                                                                ) {
                                                                    setCartItem(
                                                                        (
                                                                            prev
                                                                        ) => {
                                                                            return {
                                                                                ...prev,
                                                                                embroidery_logo_cost:
                                                                                    Number(
                                                                                        product
                                                                                            .co_brand_logo_price[
                                                                                            event
                                                                                                .target
                                                                                                .selectedIndex -
                                                                                                1
                                                                                        ]
                                                                                    ),
                                                                            };
                                                                        }
                                                                    );
                                                                } else {
                                                                    setCartItem(
                                                                        (
                                                                            prev
                                                                        ) => {
                                                                            return {
                                                                                ...prev,
                                                                                embroidery_logo_cost: 0,
                                                                            };
                                                                        }
                                                                    );
                                                                }
                                                            }}
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
                                                                            $
                                                                            {product.co_brand_logo_price
                                                                                ? product
                                                                                      .co_brand_logo_price[0]
                                                                                : ""}
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
                                                                            $
                                                                            {product.co_brand_logo_price
                                                                                ? product
                                                                                      .co_brand_logo_price[1]
                                                                                : ""}
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
                                                                            $
                                                                            {product.co_brand_logo_price
                                                                                ? product
                                                                                      .co_brand_logo_price[2]
                                                                                : ""}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div
                                                                    htmlFor={`ilitch-logo-option`}
                                                                    className="inline-flex items-center justify-between w-full px-5 pt-5 pb-2 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer peer-checked:border-blue-600 hover:text-gray-600 h-40"
                                                                >
                                                                    <div className="flex flex-col gap-3 justify-between h-full">
                                                                        <img
                                                                            src={`/images/logos/iltch-logo.jpg`}
                                                                            alt={`ilitch logo`}
                                                                        />
                                                                        <div className="w-full text-lg font-semibold text-center">
                                                                            $
                                                                            {product.co_brand_logo_price
                                                                                ? product
                                                                                      .co_brand_logo_price[3]
                                                                                : ""}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </>
                                                )}

                                                {product.official_logo_position !==
                                                    null && (
                                                    <>
                                                        <span className="pb-7 text-gray-700">
                                                            Add official
                                                            embroidered logo on{" "}
                                                            {
                                                                product.official_logo_position
                                                            }{" "}
                                                            chest:
                                                        </span>
                                                        <FormSelectField
                                                            id="official_logo"
                                                            name="official_logo"
                                                            options={
                                                                official_logo_options
                                                            }
                                                            value={
                                                                cartItem.official_logo
                                                            }
                                                            onChange={(e) => {
                                                                handleChange(e);
                                                                if (
                                                                    e.target
                                                                        .selectedIndex !==
                                                                    0
                                                                ) {
                                                                    setCartItem(
                                                                        (
                                                                            prev
                                                                        ) => {
                                                                            return {
                                                                                ...prev,
                                                                                embroidery_logo_cost:
                                                                                    Number(
                                                                                        product
                                                                                            .official_logo_price[
                                                                                            e
                                                                                                .target
                                                                                                .selectedIndex -
                                                                                                1
                                                                                        ]
                                                                                    ),
                                                                            };
                                                                        }
                                                                    );
                                                                } else {
                                                                    setCartItem(
                                                                        (
                                                                            prev
                                                                        ) => {
                                                                            return {
                                                                                ...prev,
                                                                                embroidery_logo_cost: 0,
                                                                            };
                                                                        }
                                                                    );
                                                                }
                                                            }}
                                                            blankLabel="No"
                                                        />
                                                        <div className="grid gap-6 mb-6">
                                                            <div className="grid w-full gap-6 md:grid-cols-3">
                                                                <div
                                                                    style={{
                                                                        height: "155px",
                                                                    }}
                                                                    htmlFor={`wayne-health-logo-option`}
                                                                    className="inline-flex items-center justify-between w-full px-5 pt-5 pb-2 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer peer-checked:border-blue-600 hover:text-gray-600 h-32"
                                                                >
                                                                    <div className="flex flex-col gap-3 justify-center h-full">
                                                                        <img
                                                                            src={`/images/logos/wayne_scrub_logo.png`}
                                                                            alt={`wayne health logo`}
                                                                        />
                                                                        <div className="w-full text-lg font-semibold text-center">
                                                                            $
                                                                            {product.official_logo_price
                                                                                ? product
                                                                                      .official_logo_price[0]
                                                                                : ""}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div
                                                                    style={{
                                                                        height: "155px",
                                                                    }}
                                                                    htmlFor={`KEI-wayne-health-logo-option`}
                                                                    className="inline-flex items-center justify-between w-full px-5 pt-5 pb-2 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer peer-checked:border-blue-600 hover:text-gray-600 h-32"
                                                                >
                                                                    <div className="flex flex-col gap-3 justify-between h-full">
                                                                        <img
                                                                            src={`/images/logos/kei_wayne_logo.png`}
                                                                            alt={`KEI plus wayne health logo`}
                                                                        />
                                                                        <div className="w-full text-lg font-semibold text-center">
                                                                            $
                                                                            {product.official_logo_price
                                                                                ? product
                                                                                      .official_logo_price[1]
                                                                                : ""}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex flex-col">
                                            <div className="embroidery-form-section mb-12">
                                                <h3 className="text-xl">
                                                    Optional Personalization
                                                </h3>
                                                <span className="pb-7 text-gray-700 text-sm">
                                                    Embroidery on right chest: $
                                                    {
                                                        product?.embroidery_lines_price
                                                    }
                                                </span>
                                                {product.embroidery_lines ===
                                                "line1" ? (
                                                    <FormInputField
                                                        id="line1"
                                                        name="line1"
                                                        value={cartItem.line1}
                                                        onChange={
                                                            handleLinesChange
                                                        }
                                                        label="Line 1:"
                                                        placeholder="Enter embroidery text"
                                                        error={error?.line1}
                                                    />
                                                ) : null}
                                                {product.embroidery_lines ===
                                                "line2" ? (
                                                    <>
                                                        <FormInputField
                                                            id="line1"
                                                            name="line1"
                                                            value={
                                                                cartItem.line1
                                                            }
                                                            onChange={
                                                                handleLinesChange
                                                            }
                                                            label="Line 1:"
                                                            placeholder="Enter embroidery text"
                                                            error={error?.line1}
                                                        />
                                                        <FormInputField
                                                            id="line2"
                                                            name="line2"
                                                            value={
                                                                cartItem.line2
                                                            }
                                                            onChange={
                                                                handleLinesChange
                                                            }
                                                            label="Line 2:"
                                                            placeholder="Enter embroidery text"
                                                            error={error?.line2}
                                                        />
                                                    </>
                                                ) : null}
                                                {product.embroidery_lines ===
                                                "line3" ? (
                                                    <>
                                                        <FormInputField
                                                            id="line1"
                                                            name="line1"
                                                            value={
                                                                cartItem.line1
                                                            }
                                                            onChange={
                                                                handleLinesChange
                                                            }
                                                            label="Line 1:"
                                                            placeholder="Enter embroidery text"
                                                            error={error?.line1}
                                                        />
                                                        <FormInputField
                                                            id="line2"
                                                            name="line2"
                                                            value={
                                                                cartItem.line2
                                                            }
                                                            onChange={
                                                                handleLinesChange
                                                            }
                                                            label="Line 2:"
                                                            placeholder="Enter embroidery text"
                                                            error={error?.line2}
                                                        />
                                                        <FormInputField
                                                            id="line3"
                                                            name="line3"
                                                            value={
                                                                cartItem.line3
                                                            }
                                                            onChange={
                                                                handleLinesChange
                                                            }
                                                            label="Line 3:"
                                                            placeholder="Enter embroidery text"
                                                            error={error?.line3}
                                                        />
                                                    </>
                                                ) : null}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div></div>
                            )}
                            <div>
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-1 embroidery-form-section">
                                    {!isFalsy(inseam) ||
                                    !isFalsy(fit) ||
                                    !isFalsy(newLength) ? (
                                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                            {inseam ? (
                                                <div className="embroidery-form-section mb-12">
                                                    <FormSelectField
                                                        label="Inseam:"
                                                        options={inseamOptions}
                                                        noNull
                                                        id="inseam"
                                                        name="inseam"
                                                        value={inseam}
                                                        onChange={(e) => {
                                                            setInseam(
                                                                e.target.value
                                                            );
                                                            setProductSizeIndx(
                                                                e.target
                                                                    .selectedIndex
                                                            );
                                                        }}
                                                    />
                                                </div>
                                            ) : null}
                                            {fit ? (
                                                <div className="embroidery-form-section mb-12">
                                                    <FormSelectField
                                                        label="Fit:"
                                                        id="fit"
                                                        name="fit"
                                                        options={fitOptions}
                                                        noNull
                                                        value={fit}
                                                        onChange={(e) => {
                                                            setFit(
                                                                e.target.value
                                                            );
                                                            setProductSizeIndx(
                                                                e.target
                                                                    .selectedIndex
                                                            );
                                                        }}
                                                    />
                                                </div>
                                            ) : null}
                                            {newLength ? (
                                                <div className="embroidery-form-section mb-12">
                                                    <FormSelectField
                                                        label="Length:"
                                                        id="length"
                                                        name="newLength"
                                                        options={
                                                            inNewLengthOptions
                                                        }
                                                        noNull
                                                        value={newLength}
                                                        onChange={(e) => {
                                                            setNewLength(
                                                                e.target.value
                                                            );
                                                            setProductSizeIndx(
                                                                e.target
                                                                    .selectedIndex
                                                            );
                                                        }}
                                                    />
                                                </div>
                                            ) : null}
                                        </div>
                                    ) : null}

                                    <div className="embroidery-form-section mb-12">
                                        <div className="grid grid-cols-2 gap-6 sm:grid-cols-2">
                                            {priceAndSizeArray.map((item) => (
                                                <Counter
                                                    containerClass="justify-self-center"
                                                    item={item}
                                                    key={item.size}
                                                    setPriceAndSizeArray={
                                                        setPriceAndSizeArray
                                                    }
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* sizes */}
                        {/* {product.product_sizes.map((item) => ( */}
                        {/* ))} */}
                        {/* Submit button */}
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-1 m-4 mr-12">
                            <button
                                type="button"
                                style={{ backgroundColor: primaryGreen }}
                                onClick={onAddToCart}
                                className="w-1/3 bg-blue-500 text-white px-4 py-2 rounded-lg justify-self-end"
                            >
                                Add to cart
                            </button>
                            {/* <button
                            type="button"
                            className="max-w-52 bg-blue-500 text-white px-4 py-2 rounded-lg"
                        >
                            Proceed to checkout
                        </button> */}
                        </div>
                    </div>
                </form>
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
                heading="Print Product Details"
                handleOkay={() => {}}
            >
                <PrintProduct
                    style={{
                        padding: "1rem 5px",
                    }}
                    inseam={inseam}
                    fit={fit}
                    newLength={newLength}
                    priceAndSizeArray={priceAndSizeArray}
                    product={product}
                />
            </CustomModal>
        </section>
    );
};

export default ProductPage;
