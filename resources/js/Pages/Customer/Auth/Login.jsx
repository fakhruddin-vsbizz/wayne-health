import React, { useState } from "react";
import InputField from "../../../Components/InputField";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { primaryGradient, primaryGreen } from "../../../constantVriables";

const CustomerLogin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    // const [remember, setRemember] = useState(false);
    const [error, setError] = useState(null);
    const [status, setStatus] = useState(null);

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            username: username,
            password: password,
        };

        axios
            .post("/api/customer/login", JSON.stringify(data), {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            })
            .then((data) => {
                console.log(data);
                if (data?.data?.token) {
                    localStorage.setItem(
                        "x-wayne-health-token",
                        data.data.token
                    );
                    // localStorage.setItem("x-wayne-health-type", "1001");
                    // console.log(data.data.token);
                    // setToken(data.data.token);
                    // setUserType("1001");
                    toast.success("Login successful", {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: false,
                        progress: undefined,
                        theme: "light",
                    });
                    navigate("/customer/home");
                } else {
                    console.log(data);
                    toast.error(data?.data?.message || "Invalid credentials", {
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
            .catch((err) => {
                console.log(err);
                if (err?.response?.data?.message) {
                    toast.error("Incorrect username", {
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
            });
    };
    return (
        <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
            <div
                style={{ width: "450px" }}
                className="relative py-3 sm:max-w-xl sm:mx-auto"
            >
                <div
                    style={{ ...primaryGradient }}
                    className="absolute inset-0 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"
                ></div>
                <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                    {status && (
                        <div className="mb-4 text-green-800">{status}</div>
                    )}

                    {error && (
                        <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div>
                            <img
                                width="250px"
                                className="mb-4"
                                src="/images/logos/wayne-logo.png"
                                alt="wayne health logo"
                            />
                        </div>

                        {/* Username Field - Using InputField component */}
                        <InputField
                            label="Username"
                            value={username}
                            error={error}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            autoFocus
                        />

                        {/* Password Field - Using InputField component */}
                        <InputField
                            label="Password"
                            value={password}
                            error={error}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            required
                        />

                        {/* Remember Me */}
                        {/* <div className="block mt-4">
                            <label
                                htmlFor="remember_me"
                                className="inline-flex items-center"
                            >
                                <input
                                    id="remember_me"
                                    type="checkbox"
                                    className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                    name="remember"
                                    checked={remember}
                                    onChange={() => setRemember(!remember)}
                                />
                                <span className="ms-2 text-sm text-gray-600">
                                    Remember me
                                </span>
                            </label>
                        </div> */}
                        <div className="block mt-4">
                            {/* <a
                                href="/password-reset"
                                className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Forgot your password?
                            </a> */}
                            <a
                                href="mailto:info@alyko.com"
                                className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Forgot password? contact info@alyko.com
                            </a>
                            {/* <span
                                href="/password-reset"
                                className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Forgot password? contact info@alyko.com
                            </span> */}
                        </div>

                        <div className="w-full flex justify-center mt-4">
                            <button
                                style={{ backgroundColor: primaryGreen }}
                                type="submit"
                                className="ms-3 w-full bg-indigo-600 text-white rounded-md py-2"
                            >
                                Log in
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CustomerLogin;
