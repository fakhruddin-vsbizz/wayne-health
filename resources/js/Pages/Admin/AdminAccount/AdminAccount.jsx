import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import FormInputField from "../../../Components/FormInputField";
import { toast } from "react-toastify";
import { primaryGreen } from "../../../constantVriables";
import moment from "moment";

const INITIAL_VALUE = {
    name: "",
    username: "",
    email: "",
    password: "",
};

const AdminAccountUpdate = () => {
    const [fields, setFields] = useState(INITIAL_VALUE);

    const [error, setError] = useState({});

    useEffect(() => {
        const token = localStorage.getItem("x-wayne-health-token");

        axios
            .get("/api/user/admin", {
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
            .put("/api/admin/update-admin", JSON.stringify(fields), {
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
                <h1 className="text-3xl font-bold text-[black] mb-6">
                    Update Admin
                </h1>

                <form className="grid grid-cols-1 gap-6">
                    <div className="p-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormInputField
                            type="text"
                            id="name"
                            name="name"
                            label="Name"
                            value={fields.name}
                            placeholder="Enter Name"
                            onChange={handleChange}
                            error={error?.name}
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
                    </div>

                    <div className="p-2 grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Link
                            to="/admin/orders"
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
                            Update Admin
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default AdminAccountUpdate;
