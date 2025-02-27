import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import FormInputField from "../../../Components/FormInputField";
import { toast } from "react-toastify";
import { primaryGreen } from "../../../constantVriables";
import moment from "moment";

const INITIAL_VALUE = {
    first_name: "",
    last_name: "",
    company_name: "",
    phone: "",
    fax: "",
    username: "",
    email: "",
    password: "",
    address_line_1: "",
    address_line_2: "",
    city: "",
    state: "",
    postal_code: "",
    country: "",
};

const AccountUpdate = () => {
    const [fields, setFields] = useState(INITIAL_VALUE);

    const [error, setError] = useState({});

    useEffect(() => {
        const token = localStorage.getItem("x-wayne-health-token");

        axios
            .get("/api/customer/account", {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            })
            .then((data) => {
                console.log(data.data);
                if (data?.data) {
                    setFields((prev) => ({ ...prev, ...data.data }));
                }
            })
            .catch((err) => console.log(err));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFields({ ...fields, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError({});
        const token = localStorage.getItem("x-wayne-health-token");
        axios
            .put("/api/customer/account", JSON.stringify(fields), {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            })
            .then((data) => {
                console.log(data);
                if (data?.data) {
                    // localStorage.setItem(
                    //     "x-wayne-health-token",
                    //     data.data.token
                    // );
                    toast.success("Details updates successfully", {
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

    return (
        <>
            <div className="container mx-auto p-4">
                <div className="w-full flex flex-col items-center justify-center mb-4">
                    <a href="https://www.alyko.com/" target="_blank">
                        <img
                            src="/images/banner/welcome.png"
                            alt="ALYKO banner"
                        />
                    </a>
                </div>
                <h1 className="text-3xl font-bold text-[black] mb-6">
                    Update Customer
                </h1>

                <form className="grid grid-cols-1 gap-6">
                    <div className="p-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormInputField
                            type="text"
                            id="first_name"
                            name="first_name"
                            label="First Name"
                            value={fields.first_name}
                            placeholder="Enter First Name"
                            onChange={handleChange}
                            error={error?.first_name}
                        />
                        <FormInputField
                            type="text"
                            id="last_name"
                            name="last_name"
                            label="Last Name"
                            value={fields.last_name}
                            placeholder="Enter Last Name"
                            onChange={handleChange}
                            error={error?.last_name}
                        />
                        <FormInputField
                            type="text"
                            id="company_name"
                            name="company_name"
                            label="Company Name"
                            value={fields.company_name}
                            placeholder="Enter Company Name"
                            onChange={handleChange}
                            error={error?.company_name}
                        />
                        <FormInputField
                            type="text"
                            id="phone"
                            name="phone"
                            label="Phone"
                            value={fields.phone}
                            placeholder="Enter Phone"
                            onChange={handleChange}
                            error={error?.phone}
                        />
                        <FormInputField
                            type="text"
                            id="fax"
                            name="fax"
                            label="Fax"
                            value={fields.fax}
                            placeholder="Enter Fax"
                            onChange={handleChange}
                            error={error?.fax}
                        />
                        <FormInputField
                            type="text"
                            id="username"
                            name="username"
                            label="Username"
                            value={fields.username}
                            placeholder="Enter Username"
                            onChange={handleChange}
                            error={error?.username}
                        />
                        <FormInputField
                            type="email"
                            id="email"
                            name="email"
                            label="Email"
                            value={fields.email}
                            placeholder="Enter Email"
                            onChange={handleChange}
                            error={error?.email}
                        />
                        <FormInputField
                            type="password"
                            id="password"
                            name="password"
                            label="Password"
                            value={fields.password}
                            placeholder="Enter Password"
                            onChange={handleChange}
                            error={error?.password}
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
                            label="Postal Code"
                            value={fields.postal_code}
                            placeholder="Enter Postal Code"
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
                    </div>

                    <div className="p-2 grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Link
                            to="/customer/my-account"
                            className="text-center block w-full bg-[#D91656] hover:bg-[#D70654] text-white font-bold py-3 px-4 rounded-full"
                        >
                            Back
                        </Link>
                        <button
                            onClick={handleSubmit}
                            type="submit"
                            style={{ backgroundColor: primaryGreen }}
                            className="block w-full bg-[#8c0327] hover:bg-[#6b0220] text-white font-bold py-3 px-4 rounded-full"
                        >
                            Update Customer
                        </button>
                    </div>
                </form>
            </div>
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
        </>
    );
};

export default AccountUpdate;
