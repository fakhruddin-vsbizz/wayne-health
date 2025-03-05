import { Link, Outlet, useNavigate } from "react-router";
import { CustomerNavBar } from "../Components/CustomerNavBar";
import moment from "moment";
import { AppContext } from "../Context/AuthContext";
import { useContext, useEffect, useState } from "react";
import axios from "axios";

export default function CustomerLayout({ isUpdated, setIsUpdated }) {
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
        <div>
            <CustomerNavBar isUpdated={isUpdated} setIsUpdated={setIsUpdated} />
            {/* will either be <Home/> or <Settings/> */}
            <Outlet />
        </div>
    );
}
