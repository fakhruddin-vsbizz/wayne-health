import React, { useContext, useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import CustomerLogin from "../Pages/Customer/Auth/Login";
import AdminLogin from "../Pages/Admin/Auth/Login";
import Notfound from "../Pages/Notfound";
import Home from "../Pages/Admin/Home";
import CreateProduct from "../Pages/Admin/Products/CreateProduct";
import AllProducts from "../Pages/Admin/Products/AllProducts";
import CreateCustomer from "../Pages/Admin/Auth/Customers/CreateCustomer";
import AllCustomers from "../Pages/Admin/Auth/Customers/AllCustomers";
import AdminLayout from "../Layouts/AdminLayout";
import EditCustomer from "../Pages/Admin/Auth/Customers/EditCustomer";
import CreateShippingAddress from "../Pages/Admin/Auth/Customers/ShippingAddress/CreateShippingAddress";
import EditShippingAddress from "../Pages/Admin/Auth/Customers/ShippingAddress/EditShippingAddress";
import EditProducts from "../Pages/Admin/Products/EditProducts";
import CustomerHome from "../Pages/Customer/Home";
import CustomerLayout from "../Layouts/CustomerLayout";
import ProductPage from "../Pages/Customer/Product";
import CartPage from "../Pages/Customer/Cart";
import EditCartItem from "../Pages/Customer/EditCartitem";
import Checkout from "../Pages/Customer/Checkout";
import Contact from "../Pages/Customer/Contact";
import About from "../Pages/Customer/About";
import Download from "../Pages/Customer/InformationForms";
import InformationForms from "../Pages/Customer/InformationForms";
import SizeCharts from "../Pages/Customer/SizeCharts";
import CreateLabCoat from "../Pages/Admin/Products/CreateLabCoat";
import CreateTop from "../Pages/Admin/Products/CreateTop";
import CreatePant from "../Pages/Admin/Products/CreatePant";
import AllOrders from "../Pages/Admin/Orders/AllOrders";
import UpdateOrder from "../Pages/Admin/Orders/UpdateOrder";
import OrderConfirmation from "../Pages/Customer/Checkout/OrderConfirmation";
import MyAccount from "../Pages/Customer/Account/MyAccount";
import AccountUpdate from "../Pages/Customer/Account/AccountUpdate";
import CustomerOrderStatus from "../Pages/Customer/Account/CustomerOrderStatus";
import ShippingUpdate from "../Pages/Customer/Account/ShippingUpdate";
import UpdateOneShippingAddress from "../Pages/Customer/Account/UpdateOneShippingAddress";
import ReturnPolicy from "../Pages/Customer/ReturnPolicy";
import axios from "axios";
import EditLabCoat from "../Pages/Admin/Products/EditLabCoat";
import EditTop from "../Pages/Admin/Products/EditTop";
import EditPant from "../Pages/Admin/Products/EditPant";
import SingleCustomerOrders from "../Pages/Admin/Orders/SingleCustomerOrders";
import AdminAccountUpdate from "../Pages/Admin/AdminAccount/AdminAccount";

// const getUser = (setCustomer, setAdmin, token) => {
//     axios
//         .get("/api/customer/tokenTest", {
//             header: {
//                 Authorization: `Bearer ${token}`,
//                 Accept: "application/json",
//             },
//         })
//         .then((data) => {
//             console.log(data);
//             if (data?.data?.user) {
//                 console.log(data);
//                 setCustomer(data.data.user);
//             }
//         })
//         .catch((err) => {
//             console.log(err);
//             if (err.response.data.message) {
//                 axios
//                     .get("/api/admin/tokenTest", {
//                         header: {
//                             Authorization: `Bearer ${token}`,
//                             "Content-Type": "application/json",
//                             Accept: "application/json",
//                         },
//                     })
//                     .then((data) => {
//                         if (data?.data?.user) {
//                             console.log(data);
//                             setAdmin(data.data.user);
//                         } else {
//                             console.log(data);
//                             setAdmin(null);
//                         }
//                     })
//                     .catch((err) => {
//                         console.log(err);
//                         setAdmin(null);
//                     });

//                 setCustomer(null);
//             }
//             setCustomer(null);
//         });
// };

const GuestRouter = () => {
    // const [customer, setCustomer] = useState(null);

    // const [admin, setAdmin] = useState(null);

    // const [token, setToken] = useState(
    //     localStorage.getItem("x-wayne-health-token")
    // );

    // const [userType, setUserType] = useState(
    //     localStorage.getItem("x-wayne-health-type")
    // );

    const [isUpdated, setIsUpdated] = useState(false);

    // useEffect(() => {
    //     if (!token) {
    //         setCustomer(null);
    //         setAdmin(null);
    //     } else if (token !== null) {
    //         // const newToken = localStorage.getItem("x-wayne-health-token");
    //         getUser(setCustomer, setAdmin, token);
    //     }
    // }, [token]);

    return (
        <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<CustomerLogin />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            {/* <Route path="/*" element={<Notfound />} /> */}
            <Route path="admin" element={<AdminLayout />}>
                <Route path="orders" element={<AllOrders />} />
                {/* <Route path="all-orders" element={<AllOrders />} /> */}
                <Route
                    path="orders/update/:orderId"
                    element={<UpdateOrder />}
                />
                <Route path="all-products" element={<AllProducts />} />
                <Route path="create-product" element={<CreateProduct />} />
                <Route
                    path="create-product/lab-coat"
                    element={<CreateLabCoat />}
                />
                <Route
                    path="create-product/lab-coat/:productId"
                    element={<EditLabCoat />}
                />
                <Route
                    path="update-admin-account"
                    element={<AdminAccountUpdate />}
                />
                <Route path="create-product/top" element={<CreateTop />} />
                <Route
                    path="create-product/top/:productId"
                    element={<EditTop />}
                />
                <Route
                    path="single-customer-order/:customerId"
                    element={<SingleCustomerOrders />}
                />
                <Route path="create-product/pant" element={<CreatePant />} />
                <Route
                    path="create-product/pant/:productId"
                    element={<EditPant />}
                />
                <Route
                    path="edit-product/:productId"
                    element={<EditProducts />}
                />
                <Route path="all-customers" element={<AllCustomers />} />
                <Route path="create-customer" element={<CreateCustomer />} />
                <Route
                    path="edit-customer/:customerId"
                    element={<EditCustomer />}
                />
                <Route
                    path="create-customer-shipping-address/:customerId"
                    element={<CreateShippingAddress />}
                />
                <Route
                    path="edit-customer-shipping-address/:customerId/:addressId"
                    element={<EditShippingAddress />}
                />
                {/* <Route path="/admin/login" element={<AdminLogin />} /> */}
                {/* <Route path="/*" element={<Notfound />} /> */}
            </Route>
            <Route
                path="customer"
                element={
                    <CustomerLayout
                        isUpdated={isUpdated}
                        setIsUpdated={setIsUpdated}
                    />
                }
            >
                <Route path="home" element={<CustomerHome />} />
                <Route path="contact" element={<Contact />} />
                <Route path="about" element={<About />} />
                <Route path="return-policy" element={<ReturnPolicy />} />
                <Route
                    path="information-forms"
                    element={<InformationForms />}
                />
                <Route path="size-charts" element={<SizeCharts />} />
                <Route path="my-account" element={<MyAccount />} />
                <Route
                    path="my-account/update-account"
                    element={<AccountUpdate />}
                />
                <Route
                    path="my-account/update-shipping-address"
                    element={<ShippingUpdate />}
                />
                <Route
                    path="my-account/update-one-shipping-address"
                    element={<UpdateOneShippingAddress />}
                />
                <Route
                    path="my-account/order-status"
                    element={<CustomerOrderStatus />}
                />
                <Route
                    path="product/:productId"
                    element={<ProductPage setCartIsUpdated={setIsUpdated} />}
                />
                <Route
                    path="cart"
                    element={<CartPage setCartIsUpdated={setIsUpdated} />}
                />
                <Route
                    path="edit-cartItem/:cartItemId"
                    element={<EditCartItem />}
                />
                <Route
                    path="checkout"
                    element={<Checkout setCartIsUpdated={setIsUpdated} />}
                />
                <Route
                    path="order-confirmation"
                    element={<OrderConfirmation />}
                />
            </Route>
        </Routes>
    );
};

export default GuestRouter;
