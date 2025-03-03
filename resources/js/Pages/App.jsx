import React from "react";

import GuestRouter from "../router/GuestRouter";
import { NavLink } from "react-router-dom";
import AdminRouter from "../router/AdminRouter";
import { ToastContainer } from "react-toastify";
import { BrowserRouter } from "react-router-dom";

const App = () => {
    return (
        <div>
            <ToastContainer />
            {/* <h1>App</h1>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/admin/login">Admin Login</NavLink> */}
            <BrowserRouter>
                <GuestRouter />
            </BrowserRouter>
            {/* <AdminRouter /> */}
        </div>
    );
};

export default App;
