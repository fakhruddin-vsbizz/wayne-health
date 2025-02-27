import React, { useState } from "react";
import FormInputField from "../../../../Components/FormInputField";
import axios from "axios";
import { toast } from "react-toastify";
import { primaryGreen, secondaryYellow } from "../../../../constantVriables";

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

const CreateCustomer = () => {
    const [fields, setFields] = useState(INITIAL_VALUE);

    const [error, setError] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFields({ ...fields, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError({});
        axios
            .post("/api/customer/register", JSON.stringify(fields), {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            })
            .then((data) => {
                if (data?.data?.token) {
                    // localStorage.setItem(
                    //     "x-wayne-health-token",
                    //     data.data.token
                    // );
                    toast.success("Customer created successfully", {
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

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold text-[black] mb-6">
                Create Customer
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

                <div className="col-span-full mt-6 p-2">
                    <button
                        onClick={handleSubmit}
                        type="submit"
                        style={{ backgroundColor: primaryGreen }}
                        className="block w-full bg-[#8c0327] hover:bg-[#6b0220] text-white font-bold py-3 px-4 rounded-full"
                    >
                        Create Customer
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateCustomer;

{
    /* <>
    <div className="p-2">
        <input
            type="text"
            id="location"
            name="location"
            placeholder="Location"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8c0327] focus:ring-[#8c0327] focus:ring-opacity-50 p-2"
            style={{ backgroundColor: "#f6f6f6" }}
        />
    </div>

    <div className="p-2 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
            <input
                type="text"
                id="organizer-name"
                name="organizer-name"
                placeholder="Organizer Name"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8c0327] focus:ring-[#8c0327] focus:ring-opacity-50 p-2"
                style={{ backgroundColor: "#f6f6f6" }}
            />
        </div>

        <div>
            <input
                type="email"
                id="organizer-email"
                name="organizer-email"
                placeholder="Organizer Email"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8c0327] focus:ring-[#8c0327] focus:ring-opacity-50 p-2"
                style={{ backgroundColor: "#f6f6f6" }}
            />
        </div>
    </div>

    <div className="p-2">
        <input
            type="text"
            id="organizer-address"
            name="organizer-address"
            placeholder="Organizer Address"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8c0327] focus:ring-[#8c0327] focus:ring-opacity-50 p-2"
            style={{ backgroundColor: "#f6f6f6" }}
        />
    </div>

    <div className="p-2 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex items-center bg-[#f6f6f6] rounded-md p-2">
            <span className="flex-shrink-0 flex items-center mr-3 text-gray-500">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 3v2M19 3v2M5 10h14M4 21h16a1 1 0 001-1V8a1 1 0 00-1-1H4a1 1 0 00-1 1v12a1 1 0 001 1z"
                    ></path>
                </svg>
                <span className="ml-2">Start Date</span>
            </span>
            <input
                type="datetime-local"
                id="start-date"
                name="start-date"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8c0327] focus:ring-[#8c0327] focus:ring-opacity-50 p-2"
                style={{ backgroundColor: "#f6f6f6" }}
            />
        </div>

        <div className="flex items-center bg-[#f6f6f6] rounded-md p-2">
            <span className="flex-shrink-0 flex items-center mr-3 text-gray-500">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 3v2M19 3v2M5 10h14M4 21h16a1 1 0 001-1V8a1 1 0 00-1-1H4a1 1 0 00-1 1v12a1 1 0 001 1z"
                    ></path>
                </svg>
                <span className="ml-2">End Date</span>
            </span>
            <input
                type="datetime-local"
                id="end-date"
                name="end-date"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8c0327] focus:ring-[#8c0327] focus:ring-opacity-50 p-2"
                style={{ backgroundColor: "#f6f6f6" }}
            />
        </div>
    </div>

    <div className="p-2 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex items-center bg-[#f6f6f6] rounded-md">
            <select
                id="status"
                name="status"
                className="block w-full h-12 rounded-md border-gray-300 shadow-sm focus:border-[#8c0327] focus:ring-[#8c0327] focus:ring-opacity-50"
                style={{ backgroundColor: "#f6f6f6", padding: 0 }}
            >
                <option value="">Select Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
            </select>
        </div>

        <div>
            <input
                type="text"
                id="tags"
                name="tags"
                placeholder="Tags (comma-separated)"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8c0327] focus:ring-[#8c0327] focus:ring-opacity-50 h-12"
                style={{ backgroundColor: "#f6f6f6" }}
            />
        </div>
    </div>
</>; */
}
