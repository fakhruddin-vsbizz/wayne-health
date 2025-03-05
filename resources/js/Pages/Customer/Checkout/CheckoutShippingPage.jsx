import FormInputField from "../../../Components/FormInputField";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import FormRadioInput from "../../../Components/FormRadioInput";
import { primaryGreen, primaryYellow } from "../../../constantVriables";
import { Breadcrumbs } from "../../../Components/CheckoutStepper";
import { CustomModal } from "../../../Components/CustomModal";
import FormCheckboxInput from "../../../Components/FormCheckboxInput";

const INITIAL_VALUE = {
    ship_to_name: "",
    ship_to_company: "",
    address_line_1: "",
    address_line_2: "",
    city: "",
    state: "",
    postal_code: "",
    country: "",
};

const CheckoutShippingPage = ({ links, setCurrentPage, setOrderDetails }) => {
    const [fields, setFields] = useState(INITIAL_VALUE);

    const [defaultAddress, setDefaultAddress] = useState({});

    const [selectedDefaultAddressId, setSelectedDefaultAddressId] = useState(0);

    const [deleteAddress, setDeleteAddress] = useState("");

    const [openModal, setOpenModal] = React.useState(false);

    const [enter_new_address, setEnter_new_address] = useState("");

    const [rows, setRows] = useState([]);

    const [error, setError] = useState({});

    const [isUpdated, setIsUpdated] = useState(false);

    const [customer, setCustomer] = useState("");

    const { cartId } = useParams();

    const handleCheckboxChange = (e) => {
        setEnter_new_address((prev) => (prev !== "on" ? "on" : ""));
    };

    useEffect(() => {
        const token = localStorage.getItem("x-wayne-health-token");
        if (!customer.id && token) {
            axios
                .get("/api/user/customer", {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + token,
                    },
                })
                .then((data) => {
                    if (data?.data) {
                        setCustomer(data.data);
                    }
                    console.log(data);
                });
        }
    }, []);

    useEffect(() => {
        if (customer.id) {
            const token = localStorage.getItem("x-wayne-health-token");

            axios
                .get("/api/admin/customer/shipping-address/" + customer.id, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                })
                .then((data) => {
                    console.log(data);
                    if (data?.data) {
                        setRows(data.data);
                        setDefaultAddress(
                            data.data.filter(
                                (fItem) => fItem.is_default === "on"
                            )[0]
                        );
                    }
                })
                .catch((err) => console.log(err));
        }
    }, [customer.id, isUpdated]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFields({ ...fields, [name]: value });
    };

    const handleDeleteAddress = () => {
        console.log(deleteAddress.id);

        const token = localStorage.getItem("x-wayne-health-token");

        axios
            .delete("/api/customer/shipping-address/" + deleteAddress.id, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                },
            })
            .then((data) => {
                console.log(data);
                // console.log(data.data.cartItems);
                if (data?.data?.success) {
                    setIsUpdated((prev) => !prev);
                    setOpenModal(false);
                    toast.success(data?.data?.success);
                    // setCartId(data.data.cartId);
                    // setTotal(data.data.total);
                }
            })
            .catch((err) => console.log(err));
    };

    const handleSetDefault = () => {
        console.log(selectedDefaultAddressId);

        const token = localStorage.getItem("x-wayne-health-token");

        axios
            .get(
                "/api/customer/shipping-address/set-selected-default/" +
                    selectedDefaultAddressId,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: "application/json",
                    },
                }
            )
            .then((data) => {
                console.log(data);
                // console.log(data.data.cartItems);
                if (data?.data) {
                    setIsUpdated((prev) => !prev);
                    setOpenModal(false);
                    setEnter_new_address("");
                    // setCartId(data.data.cartId);
                    // setTotal(data.data.total);
                }
            })
            .catch((err) => console.log(err));
    };

    const onContinueToBilling = () => {
        setCurrentPage(1);
        setOrderDetails((prev) => ({
            ...prev,
            shippingAddress: defaultAddress,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // /customer/shipping-address/{customer}/store
        setError({});
        axios
            .post(
                `/api/admin/customer/shipping-address/${customer.id}/store/with-default`,
                JSON.stringify(fields),
                {
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                }
            )
            .then((data) => {
                if (data?.data) {
                    // localStorage.setItem(
                    //     "x-wayne-health-token",
                    //     data.data.token
                    // );
                    toast.success("Shipping address created successfully", {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: false,
                        progress: undefined,
                        theme: "light",
                    });
                    setFields(INITIAL_VALUE);
                    setIsUpdated((prev) => !prev);
                    setEnter_new_address("");
                    // navigate("/customer/home");
                }
            })
            .catch((err) => {
                console.log(err);
                if (err?.response?.data?.message) {
                    setError(err?.response?.data?.errors);
                    // toast.error("Incorrect field data", {
                    //     position: "top-right",
                    //     autoClose: 3000,
                    //     hideProgressBar: false,
                    //     closeOnClick: true,
                    //     pauseOnHover: true,
                    //     draggable: false,
                    //     progress: undefined,
                    //     theme: "light",
                    // });
                }
            });
    };

    // useEffect(() => {
    //     const steps = document.querySelectorAll(".step");
    //     const nextBtn = document.getElementById("next-btn");
    //     const prevBtn = document.getElementById("prev-btn");
    //     const indicators = [
    //         document.getElementById("indicator-1"),
    //         document.getElementById("indicator-2"),
    //         document.getElementById("indicator-3"),
    //     ];
    //     const lines = [
    //         document.getElementById("line-1"),
    //         document.getElementById("line-2"),
    //     ];
    //     const progressBar = document.getElementById("progress-bar");
    //     let currentStep = 0;

    //     function updateIndicators(stepIndex) {
    //         indicators.forEach((indicator, index) => {
    //             indicator.classList.toggle("bg-purple-600", index <= stepIndex);
    //             indicator.classList.toggle("text-white", index <= stepIndex);
    //             indicator.classList.toggle("bg-gray-300", index > stepIndex);
    //             indicator.classList.toggle("text-gray-600", index > stepIndex);
    //         });

    //         lines.forEach((line, index) => {
    //             line.classList.toggle("bg-purple-600", index < stepIndex);
    //             line.classList.toggle("bg-gray-300", index >= stepIndex);
    //         });
    //     }

    //     function updateProgressBar(stepIndex) {
    //         const progressPercentage = ((stepIndex + 1) / steps.length) * 100;
    //         progressBar.style.width = `${progressPercentage}%`;
    //     }

    //     function showStep(index) {
    //         steps.forEach((step, i) => {
    //             step.classList.toggle("hidden", i !== index);
    //         });
    //         console.log(index);
    //         prevBtn.classList.toggle("hidden", index === 0);
    //         nextBtn.textContent =
    //             index === 0
    //                 ? "Save And Continue To Billing"
    //                 : index === 1
    //                 ? "Save And Continue To Billing"
    //                 : index === steps.length - 1
    //                 ? "Submit"
    //                 : "Next";
    //         updateIndicators(index);
    //         updateProgressBar(index);
    //     }

    //     nextBtn.addEventListener("click", () => {
    //         if (currentStep < steps.length - 1) {
    //             currentStep++;
    //             showStep(currentStep);
    //         } else {
    //             alert("Form Submitted!");
    //         }
    //     });

    //     prevBtn.addEventListener("click", () => {
    //         if (currentStep > 0) {
    //             currentStep--;
    //             showStep(currentStep);
    //         }
    //     });

    //     showStep(currentStep);
    // }, []);

    return (
        <>
            <div
                style={{ border: `1px ${primaryYellow} solid` }}
                class="bg-white shadow-md rounded-lg p-6 mt-8 max-w-5xl"
            >
                <Breadcrumbs setCurrentPage={setCurrentPage} links={links} />
                <h2 class="text-xl font-semibold mb-2 mt-6 ">Ship to</h2>
                <div className="container mx-auto p-4">
                    <p>
                        Please let us know where we should ship your purchase.
                        For convenience, your account address has been filled in
                        below.
                    </p>
                    <p>
                        Your shipping charges will be calculated based on this
                        address. The shipping amount will be added to the
                        invoice, but will not be shown on the order review page.
                    </p>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 mt-8">
                        <div className="flex flex-col gap-2 border rounded-md p-4 w-full mx-auto max-w-2xl">
                            <span>Name: {defaultAddress.ship_to_name}</span>
                            <span>
                                Company: {defaultAddress.ship_to_company}
                            </span>
                            <span>
                                Address 1: {defaultAddress?.address_line_1}
                            </span>
                            <span>
                                Address 2: {defaultAddress?.address_line_2}
                            </span>
                            <span>City: {defaultAddress?.city} </span>
                            <span>State: {defaultAddress?.state} </span>
                            <span>Country: {defaultAddress?.country} </span>
                            <span>Zip: {defaultAddress?.postal_code} </span>
                        </div>
                    </div>

                    <div className="flex justify-start">
                        <button
                            style={{ backgroundColor: primaryGreen }}
                            onClick={onContinueToBilling}
                            className="block w-2/5 bg-[#8c0327] hover:bg-[#6b0220] text-white font-bold mt-4 py-3 px-4 rounded-full"
                        >
                            Save And Continue To Billing
                        </button>
                    </div>

                    <FormCheckboxInput
                        id="enter_new_address"
                        name="enter_new_address"
                        label="Enter A New Shipping Address"
                        value={enter_new_address}
                        labelClass="text-xl"
                        inputClass="w-5 h-5"
                        divClass="ml-8 mt-8"
                        onChange={handleCheckboxChange}
                    />

                    {enter_new_address === "on" ? (
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <form>
                                <h6 className="text-xl font-bold text-[black] mt-6">
                                    Add New Shipping Addresses
                                </h6>
                                <div className="p-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <FormInputField
                                        type="text"
                                        id="ship_to_name"
                                        name="ship_to_name"
                                        label="Ship To Name"
                                        value={fields.ship_to_name}
                                        placeholder="Enter Address Line 1"
                                        onChange={handleChange}
                                        error={error?.ship_to_name}
                                    />
                                    <FormInputField
                                        type="text"
                                        id="ship_to_company"
                                        name="ship_to_company"
                                        label="Company"
                                        value={fields.ship_to_company}
                                        placeholder="Enter Address Line 1"
                                        onChange={handleChange}
                                        error={error?.ship_to_company}
                                    />
                                    <FormInputField
                                        type="text"
                                        id="address_line_1"
                                        name="address_line_1"
                                        label="Address Line 1"
                                        value={fields.address_line_1}
                                        placeholder="Enter Address Line 1"
                                        onChange={handleChange}
                                        error={error?.address_line_1}
                                    />
                                    <FormInputField
                                        type="text"
                                        id="address_line_2"
                                        name="address_line_2"
                                        label="Address Line 2"
                                        value={fields.address_line_2}
                                        placeholder="Enter Address Line 2"
                                        onChange={handleChange}
                                        error={error?.address_line_2}
                                    />
                                    <FormInputField
                                        type="text"
                                        id="city"
                                        name="city"
                                        label="City"
                                        value={fields.city}
                                        placeholder="Enter City"
                                        onChange={handleChange}
                                        error={error?.city}
                                    />
                                    <FormInputField
                                        type="text"
                                        id="state"
                                        name="state"
                                        label="State"
                                        value={fields.state}
                                        placeholder="Enter State"
                                        onChange={handleChange}
                                        error={error?.state}
                                    />
                                    <FormInputField
                                        type="text"
                                        id="postal_code"
                                        name="postal_code"
                                        label="Zip Code"
                                        value={fields.postal_code}
                                        placeholder="Enter Zip Code"
                                        onChange={handleChange}
                                        error={error?.postal_code}
                                    />
                                    <FormInputField
                                        type="text"
                                        id="country"
                                        name="country"
                                        label="Country"
                                        value={fields.country}
                                        placeholder="Enter Country"
                                        onChange={handleChange}
                                        error={error?.country}
                                    />
                                </div>

                                <div className="p-2 grid grid-cols-1 md:grid-cols-1 gap-6">
                                    <button
                                        onClick={handleSubmit}
                                        style={{
                                            backgroundColor: primaryGreen,
                                        }}
                                        type="submit"
                                        className="block w-full bg-[#8c0327] hover:bg-[#6b0220] text-white font-bold py-3 px-4 rounded-full"
                                    >
                                        Add New Location
                                    </button>
                                </div>
                            </form>
                            <div className="mt-6">
                                <h1 className="text-xl font-bold text-[black]">
                                    Change My Default Shipping Address
                                </h1>
                                <div>
                                    <FormRadioInput
                                        name="selectedDefaultAddressId"
                                        setDeleteAddress={setDeleteAddress}
                                        fieldData={selectedDefaultAddressId}
                                        setFieldData={
                                            setSelectedDefaultAddressId
                                        }
                                        setOpen={setOpenModal}
                                        rows={rows}
                                    />
                                </div>
                                <div className="flex justify-start">
                                    <button
                                        style={{
                                            backgroundColor: primaryGreen,
                                        }}
                                        onClick={handleSetDefault}
                                        className="block w-full bg-[#8c0327] hover:bg-[#6b0220] text-white font-bold py-3 px-4 rounded-full"
                                    >
                                        Set Selected Address As Default
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : null}
                </div>
            </div>
            <CustomModal
                open={openModal}
                setOpen={setOpenModal}
                heading="Delete Address?"
                handleOkay={handleDeleteAddress}
            >
                <p>Are you sure you want to delete this address?</p>
                <p className="mt-2">Address:</p>
                <p>
                    {deleteAddress.ship_to_name},{" "}
                    {deleteAddress.ship_to_company},{" "}
                    {deleteAddress.address_line_1},{" "}
                    {deleteAddress.address_line_2}
                </p>
            </CustomModal>
        </>
    );
};

export default CheckoutShippingPage;
