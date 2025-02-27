import React, { useEffect, useState } from "react";
import {
    Navbar,
    Collapse,
    Typography,
    Button,
    IconButton,
    List,
    ListItem,
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
} from "@material-tailwind/react";
import {
    ChevronDownIcon,
    Bars3Icon,
    XMarkIcon,
    ChevronUpIcon,
} from "@heroicons/react/24/outline";
import { Link, NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import CartListItem from "./CartListItem";
import { primaryYellow } from "../constantVriables";

// const nestedMenuItems = [
//     {
//         title: "Hero",
//     },
//     {
//         title: "Features",
//     },
//     {
//         title: "Testimonials",
//     },
//     {
//         title: "Ecommerce",
//     },
// ];

function NavListMenu({ title, links }) {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const [openNestedMenu, setopenNestedMenu] = React.useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
    const renderItems = links.map(({ title, link }, key) => (
        <Link to={link} key={key}>
            <MenuItem>{title}</MenuItem>
        </Link>
    ));

    return (
        <React.Fragment>
            <Menu
                open={isMenuOpen}
                handler={setIsMenuOpen}
                placement="bottom"
                allowHover={true}
            >
                <MenuHandler>
                    <Typography
                        as="div"
                        variant="small"
                        className="font-medium"
                    >
                        <ListItem
                            className="flex items-center gap-2 py-2 pr-4 font-medium text-gray-900"
                            selected={isMenuOpen || isMobileMenuOpen}
                            onClick={() => setIsMobileMenuOpen((cur) => !cur)}
                        >
                            {title}
                            <ChevronDownIcon
                                strokeWidth={2.5}
                                className={`hidden h-3 w-3 transition-transform lg:block ${
                                    isMenuOpen ? "rotate-180" : ""
                                }`}
                            />
                            <ChevronDownIcon
                                strokeWidth={2.5}
                                className={`block h-3 w-3 transition-transform lg:hidden ${
                                    isMobileMenuOpen ? "rotate-180" : ""
                                }`}
                            />
                        </ListItem>
                    </Typography>
                </MenuHandler>
                <MenuList className="hidden rounded-xl lg:block">
                    {/* <Menu
                        placement="right-start"
                        allowHover
                        offset={15}
                        open={openNestedMenu}
                        handler={setopenNestedMenu}
                    >
                        <MenuHandler className="flex items-center justify-between">
                            <MenuItem>
                                Figma
                                <ChevronUpIcon
                                    strokeWidth={2.5}
                                    className={`h-3.5 w-3.5 transition-transform ${
                                        isMenuOpen ? "rotate-90" : ""
                                    }`}
                                />
                            </MenuItem>
                        </MenuHandler>
                        <MenuList className="rounded-xl">
                            {renderItems}
                        </MenuList>
                    </Menu> */}
                    {renderItems}
                    {/* <MenuItem>React</MenuItem>
                    <MenuItem>TailwindCSS</MenuItem> */}
                </MenuList>
            </Menu>
            <div className="block lg:hidden">
                <Collapse open={isMobileMenuOpen}>
                    {/* <Menu
                        placement="bottom"
                        allowHover
                        offset={6}
                        open={openNestedMenu}
                        handler={setopenNestedMenu}
                    >
                        <MenuHandler className="flex items-center justify-between">
                            <MenuItem>
                                Figma
                                <ChevronUpIcon
                                    strokeWidth={2.5}
                                    className={`h-3.5 w-3.5 transition-transform ${
                                        isMenuOpen ? "rotate-90" : ""
                                    }`}
                                />
                            </MenuItem>
                        </MenuHandler>
                        <MenuList className="block rounded-xl lg:hidden">
                            {renderItems}
                        </MenuList>
                    </Menu> */}
                    <MenuItem>React</MenuItem>
                    <MenuItem>TailwindCSS</MenuItem>
                </Collapse>
            </div>
        </React.Fragment>
    );
}

function NavList() {
    // const customerLinks = [
    //     {
    //         title: "All Customers",
    //         link: "/admin/all-customers",
    //     },
    //     {
    //         title: "Create Customer",
    //         link: "/admin/create-customer",
    //     },
    //     // {
    //     //     title: "Testimonials",
    //     // },
    //     // {
    //     //     title: "Ecommerce",
    //     // },
    // ];

    // const productsLinks = [
    //     {
    //         title: "All Products",
    //         link: "/admin/all-products",
    //     },
    //     {
    //         title: "Create Customer",
    //         link: "/admin/create-product",
    //     },
    //     // {
    //     //     title: "Testimonials",
    //     // },
    //     // {
    //     //     title: "Ecommerce",
    //     // },
    // ];

    return (
        <List className="mb-6 mt-4 p-0 lg:mb-0 lg:mt-0 lg:flex-row lg:p-1">
            <NavLink
                to="/customer/home"
                color="blue-gray"
                className={({ isActive }) =>
                    isActive
                        ? "font-medium active text-white"
                        : "font-medium text-white"
                }
            >
                <ListItem className="flex items-center gap-2 py-2 pr-4">
                    Home
                </ListItem>
            </NavLink>
            <NavLink
                to="/customer/about"
                color="blue-gray"
                className={({ isActive }) =>
                    isActive
                        ? "font-medium active text-white"
                        : "font-medium text-white"
                }
            >
                <ListItem className="flex items-center gap-2 py-2 pr-4">
                    About
                </ListItem>
            </NavLink>
            <NavLink
                to="/customer/contact"
                color="blue-gray"
                className={({ isActive }) =>
                    isActive
                        ? "font-medium active text-white"
                        : "font-medium text-white"
                }
            >
                <ListItem className="flex items-center gap-2 py-2 pr-4">
                    Contact
                </ListItem>
            </NavLink>
            <NavLink
                to="/customer/size-charts"
                color="blue-gray"
                className={({ isActive }) =>
                    isActive
                        ? "font-medium active text-white"
                        : "font-medium text-white"
                }
            >
                <ListItem className="flex items-center gap-2 py-2 pr-4">
                    Size Charts
                </ListItem>
            </NavLink>
            <NavLink
                to="/customer/information-forms"
                color="blue-gray"
                className={({ isActive }) =>
                    isActive
                        ? "font-medium active text-white"
                        : "font-medium text-white"
                }
            >
                <ListItem className="flex items-center gap-2 py-2 pr-4">
                    Information Forms
                </ListItem>
            </NavLink>
            {/* <NavListMenu title="Customer" links={customerLinks} />
            <NavListMenu title="Products" links={productsLinks} /> */}
            {/* <Typography
                as="a"
                href="#"
                variant="small"
                color="blue-gray"
                className="font-medium"
            >
                <ListItem className="flex items-center gap-2 py-2 pr-4">
                    Account
                </ListItem>
            </Typography> */}
        </List>
    );
}

export function CustomerNavBar({ isUpdated, setIsUpdated }) {
    const [openNav, setOpenNav] = React.useState(false);

    const [isCartActive, setIsCartActive] = useState();

    const [cartItems, setCartItems] = useState([]);

    const [cartId, setCartId] = useState("");

    // const [isUpdated, setIsUpdated] = useState(false);

    const [totalQuantity, setTotalQuantity] = useState(0);

    const navigate = useNavigate();

    const onLogout = () => {
        const token = localStorage.getItem("x-wayne-health-token");

        axios
            .post(
                "/api/customer/logout",
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                }
            )
            .then((data) => {
                console.log(data);
                if (data?.data?.success) {
                    localStorage.removeItem("x-wayne-health-type");
                    localStorage.removeItem("x-wayne-health-token");

                    toast.success(data.data.success, {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: false,
                        progress: undefined,
                        theme: "light",
                    });
                    navigate("/login");
                }
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        const token = localStorage.getItem("x-wayne-health-token");
        axios
            .get("/api/customer/cart", {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                },
            })
            .then((data) => {
                console.log(data);
                if (data?.data) {
                    setCartItems(data.data.cartItems);
                    setCartId(data.data.cartId);
                    setTotalQuantity(data.data.totalQuantity);
                }
            })
            .catch((err) => console.log(err));
    }, [isUpdated, totalQuantity]);

    useEffect(() => {
        document.addEventListener("DOMContentLoaded", function () {
            const btn = document.getElementById("myCartDropdownButton1");

            if (btn) {
                btn.click();
            }
        });
    }, []);

    React.useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 960 && setOpenNav(false)
        );
    }, []);

    return (
        <Navbar
            style={{
                background: "#347928",
            }}
            className="w-full max-w-none px-4 py-2 rounded-none outline-none"
        >
            <div className="flex items-center justify-between text-blue-gray-900">
                {/* <Typography
                    as="a"
                    href="#"
                    variant="h6"
                    className="mr-4 cursor-pointer py-1.5 lg:ml-2"
                >
                    Material Tailwind
                </Typography> */}
                <img
                    src="/images/logos/wayne-logo.png"
                    alt=""
                    className="mr-4 cursor-pointer lg:ml-2 w-36"
                />
                <div className="hidden lg:block">
                    <NavList />
                </div>
                <div>
                    <h1
                        style={{
                            color: primaryYellow,
                        }}
                        className="font-semibold"
                    >
                        Questions?
                    </h1>
                    <p className="text-white">tasneem@alyko.com</p>
                    <p className="text-white">248-813-9000</p>
                </div>
                <div className="hidden gap-6 lg:flex items-center">
                    <div class="relative flex items-center lg:space-x-2 px-2">
                        {totalQuantity !== 0 ? (
                            <span className="absolute top-1 left-5 bg-red-600 text-white flex items-center justify-center rounded-full w-4 h-4 text-sm">
                                {totalQuantity}
                            </span>
                        ) : null}
                        <NavLink
                            to="/customer/cart"
                            className={({ isActive }) => {
                                setIsCartActive(isActive);
                                return isActive
                                    ? "inline-flex items-center active rounded-lg justify-center p-2 hover:bg-transparent dark:hover:bg-gray-700 text-sm font-medium leading-none text-gray-900 dark:text-white"
                                    : "inline-flex items-center rounded-lg justify-center p-2 hover:bg-transparent dark:hover:bg-gray-700 text-sm font-medium leading-none text-gray-900 dark:text-white";
                            }}
                        >
                            <svg
                                class="w-7 h-7 lg:me-1"
                                width="800px"
                                height="800px"
                                viewBox="-0.5 0 25 25"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M18.5996 21.57C19.7042 21.57 20.5996 20.6746 20.5996 19.57C20.5996 18.4654 19.7042 17.57 18.5996 17.57C17.495 17.57 16.5996 18.4654 16.5996 19.57C16.5996 20.6746 17.495 21.57 18.5996 21.57Z"
                                    stroke={
                                        isCartActive ? "#f8cc1b" : "#ffffff"
                                    }
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                />
                                <path
                                    d="M8.59961 21.57C9.70418 21.57 10.5996 20.6746 10.5996 19.57C10.5996 18.4654 9.70418 17.57 8.59961 17.57C7.49504 17.57 6.59961 18.4654 6.59961 19.57C6.59961 20.6746 7.49504 21.57 8.59961 21.57Z"
                                    stroke={
                                        isCartActive ? "#f8cc1b" : "#ffffff"
                                    }
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                />
                                <path
                                    d="M2 3.55997C2 3.55997 6.64 3.49997 6 7.55997L5.31006 11.62C5.20774 12.1068 5.21778 12.6105 5.33954 13.0929C5.46129 13.5752 5.69152 14.0234 6.01263 14.4034C6.33375 14.7833 6.73733 15.0849 7.19263 15.2854C7.64793 15.4858 8.14294 15.5797 8.64001 15.56H16.64C17.7479 15.5271 18.8119 15.1196 19.6583 14.404C20.5046 13.6884 21.0834 12.7069 21.3 11.62L21.9901 7.50998C22.0993 7.0177 22.0939 6.50689 21.9744 6.017C21.8548 5.52712 21.6242 5.07126 21.3005 4.68467C20.9767 4.29807 20.5684 3.99107 20.1071 3.78739C19.6458 3.58371 19.1438 3.48881 18.64 3.50998H9.94"
                                    stroke={
                                        isCartActive ? "#f8cc1b" : "#ffffff"
                                    }
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                />
                            </svg>
                            {/* <svg
                                class="w-5 h-5 lg:me-1"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312"
                                />
                            </svg> */}
                            <span
                                style={{
                                    color: isCartActive ? "#f8cc1b" : "#ffffff",
                                }}
                                className="hidden sm:flex text-white"
                            >
                                Cart
                            </span>
                        </NavLink>
                        <NavLink
                            to="/customer/my-account"
                            color="blue-gray"
                            className={({ isActive }) =>
                                isActive
                                    ? "font-normal active text-white text-sm"
                                    : "font-normal text-white text-sm"
                            }
                        >
                            My Account
                        </NavLink>
                    </div>
                    <Button
                        style={{ padding: "0rem 1rem", height: "2rem" }}
                        className="text-white border-white"
                        variant="outlined"
                        size="sm"
                        onClick={onLogout}
                    >
                        Log Out
                    </Button>
                </div>
                <IconButton
                    variant="text"
                    className="lg:hidden"
                    onClick={() => setOpenNav(!openNav)}
                >
                    {openNav ? (
                        <XMarkIcon className="h-6 w-6" strokeWidth={2} />
                    ) : (
                        <Bars3Icon className="h-6 w-6" strokeWidth={2} />
                    )}
                </IconButton>
            </div>
            <Collapse open={openNav}>
                <NavList />
                <div className="flex w-full flex-nowrap items-center gap-2 lg:hidden">
                    <Button size="sm" fullWidth>
                        Get Started
                    </Button>
                    <Button variant="outlined" size="sm" fullWidth>
                        Log In
                    </Button>
                </div>
            </Collapse>
        </Navbar>
    );
}
