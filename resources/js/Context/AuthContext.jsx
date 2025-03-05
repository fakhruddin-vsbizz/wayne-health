import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

export default function AppProvider(props) {
    const [token, setToken] = useState(
        localStorage.getItem("x-wayne-health-token")
    );

    const [user, setUser] = useState(null);

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
                    console.log(admin);
                } catch (error) {
                    console.log(error);
                    setUser(null);
                }
            }
        }
    };

    useEffect(() => {
        if (token) {
            getUser();
        }
    }, [token]);

    return (
        <AppContext.Provider value={{ token, setToken, user }}>
            {props.children}
        </AppContext.Provider>
    );
}
