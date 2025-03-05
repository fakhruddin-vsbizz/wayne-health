import React, { useEffect, useState } from "react";
import DownloadLink from "../../Components/DownloadLink";
import { primaryGreen, primaryYellow } from "../../constantVriables";
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const InformationForms = () => {
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
        <div className="mt-8">
            <div className="w-full flex flex-col items-center justify-center mb-4">
                <a href="https://www.alyko.com/" target="_blank">
                    <img src="/images/banner/welcome.png" alt="ALYKO banner" />
                </a>
            </div>
            <div class="container mx-auto p-6">
                <div
                    style={{ border: `1px ${primaryYellow} solid` }}
                    class="bg-white shadow-md rounded-lg p-6 "
                >
                    <h2
                        style={{ color: primaryGreen }}
                        class="mb-4 text-xl font-semibold text-gray-900"
                    >
                        Information Forms:
                    </h2>
                    <ul class="max-w-md space-y-4 text-gray-500 list-inside">
                        <DownloadLink
                            link="/pdfs/information_forms/Lab Coats Order Information_0225.pdf"
                            text="Lab Coats Order Information"
                        />
                        <DownloadLink
                            link="/pdfs/information_forms/Cherokee Scrubs Order Information_0225.pdf"
                            text="Cherokee Scrubs Order Information"
                        />
                        <DownloadLink
                            link="/pdfs/information_forms/Wink Scrubs Order Information_0225.pdf"
                            text="Wink Scrubs Order Information"
                        />
                    </ul>
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

export default InformationForms;
