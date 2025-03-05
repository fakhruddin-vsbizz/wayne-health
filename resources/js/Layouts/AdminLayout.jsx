import { Outlet, useNavigate } from "react-router";
import { CustomNavBar } from "../Components/Navbar";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../Context/AuthContext";
import axios from "axios";

export default function AdminLayout() {
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
            navigate("/customer/home");

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
            <CustomNavBar />
            {/* will either be <Home/> or <Settings/> */}
            <Outlet />
        </div>
    );
}
