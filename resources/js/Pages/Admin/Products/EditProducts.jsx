import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import FormInputField from "../../../Components/FormInputField";
import FormInputImageField from "../../../Components/FormInputImageField";
import FormSelectField from "../../../Components/FormSelectField";
import {
    embroidery_lines_options,
    objectToFormData,
    pdfNames,
    position_options,
    primaryGreen,
    secondaryYellow,
} from "../../../constantVriables";
import FormTextAreaField from "../../../Components/FormTextAreaField";
import { useParams } from "react-router-dom";

const INITIAL_VALUE = {
    name: "",
    item_code: "",
    manufacturer: "",
    multiline_description: "",
    product_image: "",
    product_stitching_image: "",
    embroidery_lines: "",
    embroidery_lines_position: "",
    // wayne_logo: "",
    wayne_logo_price: 0.0,
    embroidery_lines_price: 0.0,
    wayne_logo_position: "",
    co_brand_logo_price: "",
    co_brand_logo_position: "",
    official_logo_price: "",
    official_logo_position: "",
    colors: "",
    link: "",
    product_sizes: [],
};

const EditProducts = () => {
    const [fields, setFields] = useState(INITIAL_VALUE);

    const { productId } = useParams();

    const [sizeArray, setSizeArray] = useState({
        fit: "",
        productLength: "",
        sizes: [],
    });

    const [isEdit, setIsEdit] = useState(false);

    const [editFieldsData, setEditFieldsData] = useState({});

    const [editIndx, setEditIndx] = useState(null);

    const [error, setError] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFields({ ...fields, [name]: value });
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditFieldsData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSizeChange = (e) => {
        const { name, value } = e.target;
        setSizeArray((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const { name } = e.target;
        setFields({ ...fields, [name]: e.target.files[0] });
    };

    const onEditSize = (indx) => {
        setIsEdit(true);
        console.log(fields.product_sizes[indx]);
        setEditIndx(indx);
        setEditFieldsData(fields.product_sizes[indx]);
    };

    const onUpdate = () => {
        console.log(fields.product_sizes[editIndx]);
        setFields((prev) => {
            return {
                ...prev,
                product_sizes: [
                    ...prev.product_sizes.map((item, index) => {
                        if (index === editIndx) {
                            return { ...item, ...editFieldsData };
                        } else {
                            return item;
                        }
                    }),
                ],
            };
        });
        setIsEdit(false);
    };

    useEffect(() => {
        const token = localStorage.getItem("x-wayne-health-token");

        axios
            .get("/api/admin/products/" + productId, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            })
            .then((data) => {
                console.log(data);
                if (data?.data) {
                    setFields(data.data);
                }
            })
            .catch((err) => console.log(err));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(fields);
        setError({});

        if (fields.product_sizes.length === 0) {
            toast.error("Please select at least one size", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                theme: "light",
            });
            return;
        }

        const formData = objectToFormData(fields);

        axios
            .post("/api/admin/products/custom-update/" + productId, formData, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((data) => {
                if (data?.data) {
                    console.log(data);
                    // localStorage.setItem(
                    //     "x-wayne-health-token",
                    //     data.data.token
                    // );
                    toast.success("Product created successfully", {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: false,
                        progress: undefined,
                        theme: "light",
                    });
                    // setFields(INITIAL_VALUE);
                    // navigate("/admin/all-products");
                }
            })
            .catch((err) => {
                console.log(err);
                if (err?.response?.data?.message) {
                    setError(err?.response?.data?.errors);
                    // toast.error("Incorrect field data", {
                    //     position: "top-right",
                    //     autoClose: 3000,
                    //     hideProgressBar: false,
                    //     closeOnClick: true,
                    //     pauseOnHover: true,
                    //     draggable: false,
                    //     progress: undefined,
                    //     theme: "light",
                    // });
                }
            });
    };

    const onAddSize = () => {
        setFields((prev) => ({
            ...prev,
            product_sizes: [...prev.product_sizes, sizeArray],
        }));
        setSizeArray({
            fit: "",
            productLength: "",
            sizes: [],
        });
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold text-[black] mb-6">
                Update Product
            </h1>

            <form className="grid grid-cols-1 gap-6">
                <div className="p-2 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <FormInputField
                        type="text"
                        id="name"
                        name="name"
                        label="Name"
                        value={fields.name}
                        placeholder="Enter First Name"
                        onChange={handleChange}
                        error={error?.name}
                    />
                    <FormInputField
                        type="text"
                        id="item_code"
                        name="item_code"
                        label="Item Code"
                        value={fields.item_code}
                        placeholder="Enter Last Name"
                        onChange={handleChange}
                        error={error?.item_code}
                    />
                    <FormInputField
                        type="text"
                        id="manufacturer"
                        name="manufacturer"
                        label="Manufacturer"
                        value={fields.manufacturer}
                        placeholder="Enter Company Name"
                        onChange={handleChange}
                        error={error?.manufacturer}
                    />
                    <FormTextAreaField
                        id="multiline_description"
                        name="multiline_description"
                        label="Multiline Description"
                        value={fields.multiline_description}
                        placeholder="Enter Phone"
                        onChange={handleChange}
                        error={error?.multiline_description}
                    />
                    <FormInputImageField
                        id="product_image"
                        name="product_image"
                        label="Product Image"
                        accept="image/png, image/jpeg"
                        value={fields.product_image}
                        placeholder="Enter Fax"
                        onChange={handleImageChange}
                        error={error?.product_image}
                    />
                    <FormInputImageField
                        id="product_stitching_image"
                        name="product_stitching_image"
                        label="Stitches Image"
                        accept="image/png, image/jpeg"
                        value={fields.product_stitching_image}
                        placeholder="Enter Username"
                        onChange={handleImageChange}
                        error={error?.product_stitching_image}
                    />
                    <FormSelectField
                        id="embroidery_lines"
                        name="embroidery_lines"
                        options={embroidery_lines_options}
                        value={fields.embroidery_lines}
                        onChange={handleChange}
                        error={error?.embroidery_lines}
                        label="Embroidery Lines"
                    />

                    <FormSelectField
                        id="embroidery_lines_position"
                        name="embroidery_lines_position"
                        label="Embroidery Lines Position"
                        value={fields.embroidery_lines_position}
                        options={position_options}
                        onChange={handleChange}
                        error={error?.embroidery_lines_position}
                    />

                    {/* <FormSelectField
                        id="wayne_logo"
                        name="wayne_logo"
                        label="Wayne Logo"
                        value={fields.wayne_logo}
                        placeholder="Enter Address Line 1"
                        onChange={handleChange}
                        error={error?.password}
                        options={position_options}
                    /> */}

                    <FormSelectField
                        id="wayne_logo_position"
                        name="wayne_logo_position"
                        label="Wayne Health Logo Position"
                        value={fields.wayne_logo_position}
                        placeholder="Enter City"
                        onChange={handleChange}
                        error={error?.wayne_logo_price}
                        options={position_options}
                    />

                    <FormInputField
                        type="text"
                        id="Wayne Logo Price"
                        name="wayne_logo_price"
                        label="Wayne Health Logo Price"
                        value={fields.wayne_logo_price}
                        placeholder="Enter Address Line 2"
                        onChange={handleChange}
                        error={error?.wayne_logo_position}
                    />

                    <FormInputField
                        type="text"
                        id="co_brand_logo_price"
                        name="co_brand_logo_price"
                        label="Co Brand Logo Price (DMC, KEI, Karmanos, Ilitch)"
                        value={fields.co_brand_logo_price}
                        placeholder="Enter State"
                        onChange={handleChange}
                        error={error?.co_brand_logo_price}
                    />

                    <FormSelectField
                        id="co_brand_logo_position"
                        name="co_brand_logo_position"
                        label="Co Brand Logo Position"
                        value={fields.co_brand_logo_position}
                        placeholder="Enter Co Brand Logo Position"
                        onChange={handleChange}
                        error={error?.co_brand_logo_position}
                        options={position_options}
                    />

                    <FormInputField
                        type="text"
                        id="official_logo_price"
                        name="official_logo_price"
                        label="Official Logo Price (Wayne Health, Wayne Health + KEI)"
                        value={fields.official_logo_price}
                        placeholder="Enter Country"
                        onChange={handleChange}
                        error={error?.official_logo_price}
                    />

                    <FormSelectField
                        id="official_logo_position"
                        name="official_logo_position"
                        label="Official Logo Position"
                        value={fields.official_logo_position}
                        placeholder="Enter Country"
                        onChange={handleChange}
                        error={error?.official_logo_position}
                        options={position_options}
                    />

                    <FormInputField
                        type="text"
                        id="colors"
                        name="colors"
                        label="Colors"
                        value={fields.colors}
                        placeholder="Enter Country"
                        onChange={handleChange}
                        error={error?.colors}
                    />

                    <FormSelectField
                        id="link"
                        name="link"
                        label="Link"
                        value={fields.link}
                        placeholder="Enter Country"
                        onChange={handleChange}
                        error={error?.link}
                        options={pdfNames}
                    />

                    {/* <FormInputField
                        type="text"
                        id="product_sizes"
                        name="product_sizes"
                        label="Product Sizes"
                        value={fields.product_sizes}
                        placeholder="Enter Country"
                        onChange={handleChange}
                        error={error?.country}
                    /> */}
                </div>

                <hr />

                <h3 className="text-2xl font-bold text-[black] mb-1">
                    Add Size
                </h3>

                <div className="p-2 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <FormInputField
                        type="text"
                        id="fit"
                        name="fit"
                        label="Fit"
                        value={sizeArray.fit}
                        placeholder="Enter First Name"
                        onChange={handleSizeChange}
                        error={error?.first_name}
                    />
                    <FormInputField
                        type="text"
                        id="productLength"
                        name="productLength"
                        label="Length"
                        value={sizeArray.productLength}
                        placeholder="Enter First Name"
                        onChange={handleSizeChange}
                        error={error?.first_name}
                    />
                    <FormInputField
                        type="text"
                        id="sizes"
                        name="sizes"
                        label="Sizes"
                        value={sizeArray.sizes}
                        placeholder="Enter First Name"
                        onChange={handleSizeChange}
                        error={error?.first_name}
                    />
                </div>

                {fields.product_sizes.map((item, indx) =>
                    isEdit && indx === editIndx ? (
                        <div
                            key={indx}
                            className="p-2 grid grid-cols-1 md:grid-cols-4 gap-6 mx-4"
                        >
                            <FormInputField
                                type="text"
                                id="fit"
                                name="fit"
                                label="Fit"
                                value={editFieldsData?.fit}
                                placeholder="Enter First Name"
                                onChange={handleEditChange}
                                error={error?.first_name}
                            />
                            <FormInputField
                                type="text"
                                id="productLength"
                                name="productLength"
                                label="Length"
                                value={editFieldsData?.productLength}
                                placeholder="Enter First Name"
                                onChange={handleEditChange}
                                error={error?.first_name}
                            />
                            <FormInputField
                                type="text"
                                id="sizes"
                                name="sizes"
                                label="Sizes"
                                value={editFieldsData?.sizes}
                                placeholder="Enter First Name"
                                onChange={handleEditChange}
                                error={error?.first_name}
                            />
                            <button
                                type="button"
                                onClick={() => onUpdate(indx)}
                            >
                                Update Size
                            </button>
                        </div>
                    ) : (
                        <div
                            key={indx}
                            className="p-2 grid grid-cols-1 md:grid-cols-4 gap-6 mx-4"
                        >
                            <span
                                className={`block font-medium text-sm text-gray-700`}
                            >
                                Fit: {item?.fit}
                            </span>
                            <span
                                className={`block font-medium text-sm text-gray-700`}
                            >
                                Length: {item?.productLength}
                            </span>
                            <span
                                className={`block font-medium text-sm text-gray-700 max-w-80`}
                            >
                                Sizes: {item?.sizes}
                            </span>
                            <button
                                type="button"
                                onClick={() => onEditSize(indx)}
                            >
                                Edit Size
                            </button>
                        </div>
                    )
                )}

                <div className="p-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <button
                        onClick={onAddSize}
                        type="button"
                        style={{ backgroundColor: secondaryYellow }}
                        className="block w-full bg-[#8c0327] hover:bg-[#6b0220] text-white font-bold py-3 px-4 rounded-full"
                    >
                        Add size
                    </button>
                    <button
                        onClick={handleSubmit}
                        type="submit"
                        style={{ backgroundColor: primaryGreen }}
                        className="block w-full bg-[#8c0327] hover:bg-[#6b0220] text-white font-bold py-3 px-4 rounded-full"
                    >
                        Update Product
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditProducts;
