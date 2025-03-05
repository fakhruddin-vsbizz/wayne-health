import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import FormInputField from "../../../../../Components/FormInputField";
import FormCheckboxInput from "../../../../../Components/FormCheckboxInput";
import { toast } from "react-toastify";
import axios from "axios";
import { primaryGreen } from "../../../../../constantVriables";

const INITIAL_VALUE = {
    address_line_1: "",
    address_line_2: "",
    city: "",
    state: "",
    postal_code: "",
    country: "",
    is_default: "",
};

const EditShippingAddress = () => {
    const [fields, setFields] = useState(INITIAL_VALUE);

    const [error, setError] = useState({});

    const { customerId, addressId } = useParams();

    const [currentAddress, setCurrentAddress] = useState({});

    useEffect(() => {
        if (addressId) {
            const token = localStorage.getItem("x-wayne-health-token");

            axios
                .get(
                    "/api/admin/customer/shipping-address/" +
                        addressId +
                        "/show",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            Accept: "application/json",
                            "Content-Type": "application/json",
                        },
                    }
                )
                .then((data) => {
                    console.log(data);
                    if (data?.data) {
                        setFields(data.data);
                        setCurrentAddress(data.data);
                    }
                })
                .catch((err) => console.log(err));
        }
    }, [addressId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFields({ ...fields, [name]: value });
    };

    const handleCheckboxChange = (e) => {
        setFields((prev) => ({
            ...prev,
            is_default: prev.is_default !== "on" ? "on" : "",
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios
            .put(
                `/api/admin/customer/shipping-address/${customerId}/${addressId}`,
                JSON.stringify(fields),
                {
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                }
            )
            .then((data) => {
                if (data?.data) {
                    // localStorage.setItem(
                    //     "x-wayne-health-token",
                    //     data.data.token
                    // );
                    toast.success("Shipping address updated successfully", {
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
                    navigate(
                        "/admin/create-customer-shipping-address/" + customerId
                    );
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

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold text-[black] mb-6">
                Update Shipping Address
            </h1>

            <form className="grid grid-cols-1 gap-6">
                <div className="p-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormInputField
                        type="text"
                        id="address_line_1"
                        name="address_line_1"
                        label="Address Line 1"
                        value={fields.address_line_1}
                        placeholder="Enter Address Line 1"
                        onChange={handleChange}
                        error={error?.address_line_1}
                    />
                    <FormInputField
                        type="text"
                        id="address_line_2"
                        name="address_line_2"
                        label="Address Line 2"
                        value={fields.address_line_2}
                        placeholder="Enter Address Line 2"
                        onChange={handleChange}
                        error={error?.address_line_2}
                    />
                    <FormInputField
                        type="text"
                        id="city"
                        name="city"
                        label="City"
                        value={fields.city}
                        placeholder="Enter City"
                        onChange={handleChange}
                        error={error?.city}
                    />
                    <FormInputField
                        type="text"
                        id="state"
                        name="state"
                        label="State"
                        value={fields.state}
                        placeholder="Enter State"
                        onChange={handleChange}
                        error={error?.state}
                    />
                    <FormInputField
                        type="text"
                        id="postal_code"
                        name="postal_code"
                        label="Zip code"
                        value={fields.postal_code}
                        placeholder="Enter Zip code"
                        onChange={handleChange}
                        error={error?.postal_code}
                    />
                    <FormInputField
                        type="text"
                        id="country"
                        name="country"
                        label="Country"
                        value={fields.country}
                        placeholder="Enter Country"
                        onChange={handleChange}
                        error={error?.country}
                    />
                    <FormCheckboxInput
                        disabled={
                            currentAddress.is_default != null ? true : false
                        }
                        label="Make this address default"
                        name="is_default"
                        value={fields.is_default}
                        onChange={handleCheckboxChange}
                        id="is_default"
                    />
                </div>

                <div className="p-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Link
                        to={`/admin/create-customer-shipping-address/${customerId}`}
                        // style={{ backgroundColor: secondaryYellow }}
                        className="text-center block w-full bg-[#D91656] hover:bg-[#D70654] text-white font-bold py-3 px-4 rounded-full"
                    >
                        Back
                    </Link>
                    <button
                        onClick={handleSubmit}
                        style={{ backgroundColor: primaryGreen }}
                        type="submit"
                        className="block w-full bg-[#8c0327] hover:bg-[#6b0220] text-white font-bold py-3 px-4 rounded-full"
                    >
                        Update Shipping Address
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditShippingAddress;
