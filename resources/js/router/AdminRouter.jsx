import React from "react";
import { Routes, Route } from "react-router-dom";
import Notfound from "../Pages/Notfound";
import CreateProduct from "../Pages/Admin/Products/CreateProduct";
import CreateCustomer from "../Pages/Admin/Auth/Customers/CreateCustomer";
import AllProducts from "../Pages/Admin/Products/AllProducts";
import AllCustomers from "../Pages/Admin/Auth/Customers/AllCustomers";
import { CustomNavBar } from "../Components/Navbar";
import Home from "../Pages/Admin/Home";

const AdminRouter = () => {
    return (
        <Routes path="admin" element={<CustomNavBar />}>
            <Route path="admin/home" element={<Home />} />
            <Route path="create-product" element={<CreateProduct />} />
            <Route path="all-products" element={<AllProducts />} />
            <Route path="create-customer" element={<CreateCustomer />} />
            <Route path="all-customers" element={<AllCustomers />} />
            {/* <Route path="/admin/login" element={<AdminLogin />} /> */}
            {/* <Route path="/*" element={<Notfound />} /> */}
        </Routes>
    );
};

export default AdminRouter;
