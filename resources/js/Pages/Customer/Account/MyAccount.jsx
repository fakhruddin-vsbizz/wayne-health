import React, { useEffect, useState } from "react";
import { primaryGreen, primaryYellow } from "../../../constantVriables";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import axios from "axios";

const MyAccount = () => {
    const [token, setToken] = useState(
        localStorage.getItem("x-wayne-health-token")
    );

    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const getUser = async () => {
        try {
            const customer = await axios.get("/api/user/customer", {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            });

            setUser("customer");
            console.log(customer);
        } catch (error) {
            console.log(error);
            if (error?.response?.data?.message === "Unauthenticated.") {
                try {
                    const admin = await axios.get("/api/user/admin", {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            Accept: "application/json",
                            "Content-Type": "application/json",
                        },
                    });
                    setUser("admin");
                    navigate("/admin/orders");
                    console.log(admin);
                } catch (error) {
                    console.log(error);
                    setUser(null);
                    navigate("/login");
                }
            }
        }
    };

    useEffect(() => {
        console.log(user);
        if (token) {
            getUser();
        } else {
            navigate("/login");
        }
    }, [token]);
    return (
        <div class="container mx-auto p-6">
            <div className="w-full flex flex-col items-center justify-center mb-4">
                <a href="https://www.alyko.com/" target="_blank">
                    <img src="/images/banner/welcome.png" alt="ALYKO banner" />
                </a>
            </div>
            <div
                style={{ border: `1px ${primaryYellow} solid` }}
                class="bg-white shadow-md rounded-lg p-6"
            >
                <h1
                    style={{ color: primaryGreen }}
                    class="text-3xl font-bold mb-4"
                >
                    Account Overview
                </h1>
                <div class="flex flex-wrap p-4">
                    <div class="p-2 w-full">
                        <Link
                            to="/customer/my-account/update-account"
                            class="bg-gray-100 rounded flex p-4 h-full items-center"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                class="size-6 active mr-4 font-bold"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                />
                            </svg>
                            <span class="font-medium">Account</span>
                        </Link>
                    </div>
                    <div class="p-2 w-full">
                        <Link
                            to="/customer/my-account/update-shipping-address"
                            class="bg-gray-100 rounded flex p-4 h-full items-center"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                class="size-6 active mr-4 font-bold"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                />
                            </svg>
                            <span class="font-medium">Shipping</span>
                        </Link>
                    </div>
                    <div class="p-2 w-full">
                        <Link
                            to="/customer/my-account/order-status"
                            class="bg-gray-100 rounded flex p-4 h-full items-center"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                class="size-6 active mr-4 font-bold"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                />
                            </svg>
                            <span class="font-medium">Order Status</span>
                        </Link>
                    </div>
                </div>
            </div>
            <footer
                style={{
                    textAlign: "-webkit-center",
                }}
                className="mt-8 flex items-center text-center"
            >
                <div className="w-full">
                    <hr className="border-black w-3/4 mb-4" />
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

export default MyAccount;
