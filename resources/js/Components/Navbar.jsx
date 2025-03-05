import React, { useContext } from "react";
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
import { AppContext } from "../Context/AuthContext";

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
        <NavLink
            // className={({ isActive }) =>
            //     isActive ? "font-medium active" : "font-medium"
            // }
            to={link}
            key={key}
        >
            <MenuItem>{title}</MenuItem>
        </NavLink>
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
                            className="flex items-center gap-2 py-2 pr-4 font-medium text-white"
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
                    {/* <MenuItem>React</MenuItem>
                    <MenuItem>TailwindCSS</MenuItem> */}
                </Collapse>
            </div>
        </React.Fragment>
    );
}

function NavList() {
    const customerLinks = [
        {
            title: "All Customers",
            link: "/admin/all-customers",
        },
        {
            title: "Create Customer",
            link: "/admin/create-customer",
        },
        // {
        //     title: "Testimonials",
        // },
        // {
        //     title: "Ecommerce",
        // },
    ];

    const productsLinks = [
        {
            title: "All Products",
            link: "/admin/all-products",
        },
        {
            title: "Create Product",
            link: "/admin/create-product",
        },
        // {
        //     title: "Testimonials",
        // },
        // {
        //     title: "Ecommerce",
        // },
    ];

    return (
        <List className="mb-6 mt-4 p-0 lg:mb-0 lg:mt-0 lg:flex-row lg:p-1">
            <NavLink
                to="/admin/orders"
                color="blue-gray"
                className={({ isActive }) =>
                    isActive ? "font-medium active" : "font-medium text-white"
                }
            >
                <ListItem className="flex items-center gap-2 py-2 pr-4">
                    Orders
                </ListItem>
            </NavLink>
            <NavListMenu title="Customer" links={customerLinks} />
            <NavListMenu title="Products" links={productsLinks} />
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

export function CustomNavBar() {
    const [openNav, setOpenNav] = React.useState(false);

    const navigate = useNavigate();

    const onLogout = () => {
        const token = localStorage.getItem("x-wayne-health-token");

        axios
            .post(
                "/api/admin/logout",
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
                    navigate("/admin/login");
                }
            })
            .catch((err) => {
                navigate("/admin/login");
                console.log(err);
            });
    };

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
            className="w-full max-w-none px-4 py-2 rounded-none"
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
                    className="mr-4 cursor-pointer lg:ml-2 w-28"
                />
                <div className="hidden lg:block">
                    <NavList />
                </div>
                <div className="hidden gap-2 lg:flex">
                    <div class="relative flex items-center lg:space-x-2 px-2">
                        <NavLink
                            to="/admin/update-admin-account"
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
                    {/* <Button size="sm">Get Started</Button> */}
                    <Button
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
