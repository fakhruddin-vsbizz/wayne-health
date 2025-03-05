import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import FormInputField from "../../../Components/FormInputField";
import { primaryGreen } from "../../../constantVriables";
import FormCheckboxInput from "../../../Components/FormCheckboxInput";
import moment from "moment";

const INITIAL_VALUE = {
    ship_to_name: "",
    ship_to_company: "",
    address_line_1: "",
    address_line_2: "",
    city: "",
    state: "",
    postal_code: "",
    country: "",
    is_default: "",
};

const UpdateOneShippingAddress = () => {
    const [fields, setFields] = useState(INITIAL_VALUE);

    const [error, setError] = useState({});

    const navigate = useNavigate();

    const location = useLocation();
    const { address } = location.state;
    console.log(address);

    useEffect(() => {
        if (address) {
            setFields(address);
        }
    }, [address]);

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

        const token = localStorage.getItem("x-wayne-health-token");

        axios
            .put(
                `/api/customer/account/shippingAddress`,
                JSON.stringify(fields),
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
                if (data?.data?.message) {
                    toast.error("At least one address must be default", {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: false,
                        progress: undefined,
                        theme: "light",
                    });
                } else if (data?.data) {
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
                    navigate("/customer/my-account/update-shipping-address");
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
            <div className="w-full flex flex-col items-center justify-center mb-4">
                <a href="https://www.alyko.com/" target="_blank">
                    <img src="/images/banner/welcome.png" alt="ALYKO banner" />
                </a>
            </div>
            <h1 className="text-3xl font-bold text-[black] mb-6">
                Update Shipping Address
            </h1>

            <form className="grid grid-cols-1 gap-6">
                <div className="p-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormInputField
                        type="text"
                        id="ship_to_name"
                        name="ship_to_name"
                        label="Ship to Name"
                        value={fields.ship_to_name}
                        placeholder="Enter Ship to Name"
                        onChange={handleChange}
                        error={error?.ship_to_name}
                    />
                    <FormInputField
                        type="text"
                        id="ship_to_company"
                        name="ship_to_company"
                        label="Ship To Company"
                        value={fields.ship_to_company}
                        placeholder="Enter Ship To Company"
                        onChange={handleChange}
                        error={error?.ship_to_company}
                    />
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
                        label="Zip Code"
                        value={fields.postal_code}
                        placeholder="Enter Zip Code"
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
                        disabled={address.is_default != null ? true : false}
                        label="Make this address default"
                        name="is_default"
                        value={fields.is_default}
                        onChange={handleCheckboxChange}
                        id="is_default"
                    />
                </div>

                <div className="p-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Link
                        to={`/customer/my-account/update-shipping-address`}
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
            <footer
                style={{
                    textAlign: "-webkit-center",
                }}
                className="pb-4 mt-8 flex items-center text-center"
            >
                <div className="w-full">
                    <hr className="border-black w-10/12 mb-4" />
                    <div className="flex gap-8 justify-center items-center">
                        <div>
                            <p>
                                Copyright © {moment().year()} www.upgmarket.com
                            </p>
                            <a
                                className="text-blue-600 underline"
                                target="_blank"
                                href="https://www.alyko.com/"
                            >
                                www.alyko.com
                            </a>
                        </div>
                        <div>
                            <Link
                                to="/customer/return-policy"
                                className="text-blue-500"
                            >
                                Return Policy
                            </Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default UpdateOneShippingAddress;
