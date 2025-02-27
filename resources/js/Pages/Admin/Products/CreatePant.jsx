import React, { useState } from "react";
import FormInputField from "../../../Components/FormInputField";
import FormTextAreaField from "../../../Components/FormTextAreaField";
import FormInputImageField from "../../../Components/FormInputImageField";
import FormSelectField from "../../../Components/FormSelectField";
import {
    embroidery_lines_options,
    objectToFormData,
    pdfNames,
    position_options,
    primaryGreen,
    primaryYellow,
    secondaryYellow,
} from "../../../constantVriables";
import { toast } from "react-toastify";

const INITIAL_VALUE = {
    name: "",
    item_code: "",
    manufacturer: "",
    multiline_description: "",
    product_image: "",
    product_stitching_image: "",
    embroidery_lines_price: 0.0,
    wayne_logo_price: 0.0,
    // wayne_logo: "",
    starts_at: "",
    colors: "",
    link: "",
    product_sizes: [],
};

const CreatePant = () => {
    const [fields, setFields] = useState(INITIAL_VALUE);

    const [sizeArray, setSizeArray] = useState({
        inseam: "",
        sizes: [],
    });

    const [error, setError] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFields({ ...fields, [name]: value });
    };

    const handleSizeChange = (e) => {
        const { name, value } = e.target;
        setSizeArray((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const { name } = e.target;
        setFields({ ...fields, [name]: e.target.files[0] });
    };

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
            .post("/api/admin/products", formData, {
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
                    setFields(INITIAL_VALUE);
                    // navigate("/customer/home");
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
            product_sizes: [
                ...prev.product_sizes,
                {
                    inseam:
                        sizeArray.inseam !== "" ? sizeArray.inseam.trim() : "",
                    sizes: sizeArray.sizes,
                },
            ],
        }));
        setSizeArray({
            inseam: "",
            sizes: [],
        });
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold text-[black] mb-6">
                Create Product
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

                    <FormInputField
                        type="text"
                        id="starts_at"
                        name="starts_at"
                        label="Starts At"
                        value={fields.starts_at}
                        placeholder="Starts At"
                        onChange={handleChange}
                        error={error?.starts_at}
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
                        id="inseam"
                        name="inseam"
                        label="Inseam"
                        value={sizeArray.inseam}
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

                {fields.product_sizes.map((item, indx) => (
                    <div
                        key={indx}
                        className="p-2 grid grid-cols-1 md:grid-cols-3 gap-6 mx-4"
                    >
                        <span
                            className={`block font-medium text-sm text-gray-700`}
                        >
                            Inseam: {item?.inseam}
                        </span>
                        <span
                            className={`block font-medium text-sm text-gray-700 max-w-80`}
                        >
                            Sizes: {item?.sizes}
                        </span>
                    </div>
                ))}

                <div className="p-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <button
                        onClick={onAddSize}
                        style={{ backgroundColor: secondaryYellow }}
                        type="button"
                        className="block w-full bg-[#8c0327] hover:bg-[#6b0220] text-white font-bold py-3 px-4 rounded-full"
                    >
                        Add size
                    </button>
                    <button
                        onClick={handleSubmit}
                        style={{ backgroundColor: primaryGreen }}
                        type="submit"
                        className="block w-full bg-[#8c0327] hover:bg-[#6b0220] text-white font-bold py-3 px-4 rounded-full"
                    >
                        Create Product
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreatePant;
