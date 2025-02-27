import React, { useState } from "react";
import { Breadcrumbs } from "../../Components/CheckoutStepper";
import CheckoutShippingPage from "./Checkout/CheckoutShippingPage";
import CheckoutBillingPage from "./Checkout/CheckoutBillingPage";
import OrderReview from "./Checkout/OrderReview";

const links = [
    {
        title: "Shipping",
        link: "/customer/checkout/shipping",
        active: true,
        pageIndx: 0,
    },
    {
        title: "Billing",
        link: "/customer/checkout/billing",
        active: true,
        pageIndx: 1,
    },
    {
        title: "Order Review",
        link: "/customer/checkout/order-review",
        active: true,
        pageIndx: 2,
    },
];

const Checkout = ({ setCartIsUpdated }) => {
    const [currentPage, setCurrentPage] = useState(0);

    const [orderDetails, setOrderDetails] = useState({
        shippingAddress: {},
        cost_center: "",
        comment: "",
    });

    return (
        <div className="flex justify-center my-4 mb-8">
            {currentPage === 2 ? (
                <OrderReview
                    orderDetails={orderDetails}
                    setCurrentPage={setCurrentPage}
                    links={links}
                    setCartIsUpdated={setCartIsUpdated}
                />
            ) : currentPage === 1 ? (
                <CheckoutBillingPage
                    setOrderDetails={setOrderDetails}
                    setCurrentPage={setCurrentPage}
                    links={links}
                />
            ) : (
                <CheckoutShippingPage
                    setOrderDetails={setOrderDetails}
                    setCurrentPage={setCurrentPage}
                    links={links}
                />
            )}
        </div>
    );
};

export default Checkout;

// <div class="min-h-screen my-8 flex items-center justify-center">
//     <div
//         style={{ border: `1px ${primaryYellow} solid` }}
//         class="w-full max-w-7xl bg-white shadow-lg rounded-lg p-8"
//     >
//         <div class="flex items-center justify-between mb-8">
//             <div class="flex items-center gap-4 w-full">
//                 <div class="relative flex-1 flex items-center">
//                     <div
//                         id="indicator-1"
//                         class="w-10 h-10 flex items-center justify-center bg-purple-600 text-white rounded-full transition-colors duration-300"
//                     >
//                         1
//                     </div>
//                     <div
//                         id="line-1"
//                         class="absolute w-full h-1 bg-gray-300 left-0 top-1/2 transform translate-y-[-50%] z-[-1] transition-colors duration-300"
//                     ></div>
//                 </div>

//                 <div class="relative flex-1 flex items-center">
//                     <div
//                         id="indicator-2"
//                         class="w-10 h-10 flex items-center justify-center bg-gray-300 text-gray-600 rounded-full transition-colors duration-300"
//                     >
//                         2
//                     </div>
//                     <div
//                         id="line-2"
//                         class="absolute w-full h-1 bg-gray-300 left-0 top-1/2 transform translate-y-[-50%] z-[-1] transition-colors duration-300"
//                     ></div>
//                 </div>

//                 <div>
//                     <div
//                         id="indicator-3"
//                         class="w-10 h-10 flex items-center justify-center bg-gray-300 text-gray-600 rounded-full transition-colors duration-300"
//                     >
//                         3
//                     </div>
//                 </div>
//             </div>
//         </div>

//         <div class="w-full bg-gray-200 rounded-full h-2 mb-8">
//             <div
//                 id="progress-bar"
//                 class="bg-purple-600 h-2 rounded-full transition-all duration-300"
//                 style={{ width: "0%;" }}
//             ></div>
//         </div>

//         <form id="multi-step-form">
//             <div id="step-1" class="step">
//                 <h2 class="text-xl font-semibold mb-4">
//                     Step 1: Ship to
//                 </h2>
//                 <div className="container mx-auto p-4">
//                     <p>
//                         Please let us know where we should ship your
//                         purchase. For convenience, your account address
//                         has been filled in below.
//                     </p>
//                     <p>
//                         Your shipping charges will be calculated based
//                         on this address. The shipping amount will be
//                         added to the invoice, but will not be shown on
//                         the order review page.
//                     </p>
//                     <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 mt-8">
//                         <div className="flex flex-col gap-2 border rounded-md p-4 w-full mx-auto max-w-2xl">
//                             <span>Name: </span>
//                             <span>Company: </span>
//                             <span>Address 1: </span>
//                             <span>Address 2: </span>
//                             <span>City: </span>
//                             <span>State: </span>
//                             <span>Country: </span>
//                             <span>Zip: </span>
//                         </div>
//                     </div>

//                     <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
//                         <form className="grid grid-cols-1 gap-6">
//                             <h1 className="text-xl font-bold text-[black] mt-6 mb-1 ">
//                                 Add New Shipping Addresses
//                             </h1>
//                             <div className="p-2 grid grid-cols-1 md:grid-cols-2 gap-6">
//                                 <FormInputField
//                                     type="text"
//                                     id="address_line_1"
//                                     name="address_line_1"
//                                     label="Address Line 1"
//                                     value={fields.address_line_1}
//                                     placeholder="Enter Address Line 1"
//                                     onChange={handleChange}
//                                     error={error?.address_line_1}
//                                 />
//                                 <FormInputField
//                                     type="text"
//                                     id="address_line_2"
//                                     name="address_line_2"
//                                     label="Address Line 2"
//                                     value={fields.address_line_2}
//                                     placeholder="Enter Address Line 2"
//                                     onChange={handleChange}
//                                     error={error?.address_line_2}
//                                 />
//                                 <FormInputField
//                                     type="text"
//                                     id="city"
//                                     name="city"
//                                     label="City"
//                                     value={fields.city}
//                                     placeholder="Enter City"
//                                     onChange={handleChange}
//                                     error={error?.city}
//                                 />
//                                 <FormInputField
//                                     type="text"
//                                     id="state"
//                                     name="state"
//                                     label="State"
//                                     value={fields.state}
//                                     placeholder="Enter State"
//                                     onChange={handleChange}
//                                     error={error?.state}
//                                 />
//                                 <FormInputField
//                                     type="text"
//                                     id="postal_code"
//                                     name="postal_code"
//                                     label="Postal Code"
//                                     value={fields.postal_code}
//                                     placeholder="Enter Postal Code"
//                                     onChange={handleChange}
//                                     error={error?.postal_code}
//                                 />
//                                 <FormInputField
//                                     type="text"
//                                     id="country"
//                                     name="country"
//                                     label="Country"
//                                     value={fields.country}
//                                     placeholder="Enter Country"
//                                     onChange={handleChange}
//                                     error={error?.country}
//                                 />
//                             </div>

//                             <div className="p-2 grid grid-cols-1 md:grid-cols-1 gap-6">
//                                 <button
//                                     onClick={handleSubmit}
//                                     type="submit"
//                                     className="block w-full bg-[#8c0327] hover:bg-[#6b0220] text-white font-bold py-3 px-4 rounded-full"
//                                 >
//                                     Create New Shipping Address
//                                 </button>
//                             </div>
//                         </form>
//                         <div>
//                             <h1 className="text-xl font-bold text-[black] my-6 ">
//                                 Select From Existing Shipping Addresses
//                             </h1>
//                             <div>
//                                 <FormRadioInput rows={rows} />
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             <div id="step-2" class="step hidden">
//                 <h2 class="text-xl font-semibold mb-4">
//                     Step 2: Address
//                 </h2>
//                 <div class="space-y-4">
//                     <input
//                         type="text"
//                         placeholder="Street Address"
//                         class="w-full border border-gray-300 rounded-lg p-3 focus:outline-purple-500"
//                     />
//                     <input
//                         type="text"
//                         placeholder="City"
//                         class="w-full border border-gray-300 rounded-lg p-3 focus:outline-purple-500"
//                     />
//                     <input
//                         type="text"
//                         placeholder="Postal Code"
//                         class="w-full border border-gray-300 rounded-lg p-3 focus:outline-purple-500"
//                     />
//                 </div>
//             </div>

//             <div id="step-3" class="step hidden">
//                 <h2 class="text-xl font-semibold mb-4">
//                     Step 3: Review & Submit
//                 </h2>
//                 <p class="mb-4">
//                     Please review your information before submitting.
//                 </p>
//                 <ul class="list-disc pl-5 space-y-2">
//                     <li>
//                         <strong>Name:</strong>{" "}
//                         <span id="review-name">John Doe</span>
//                     </li>
//                     <li>
//                         <strong>Email:</strong>{" "}
//                         <span id="review-email">
//                             john.doe@example.com
//                         </span>
//                     </li>
//                     <li>
//                         <strong>Address:</strong>{" "}
//                         <span id="review-address">
//                             123 Main St, City, 12345
//                         </span>
//                     </li>
//                 </ul>
//             </div>

//             <div class="flex justify-between mt-8">
//                 <button
//                     id="prev-btn"
//                     type="button"
//                     class="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hidden"
//                 >
//                     Previous
//                 </button>
//                 <button
//                     id="next-btn"
//                     type="button"
//                     class="bg-purple-600 text-white px-6 py-2 rounded-lg"
//                 >
//                     Next
//                 </button>
//             </div>
//         </form>
//     </div>
// </div>
