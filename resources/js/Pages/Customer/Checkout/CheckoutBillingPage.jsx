import React, { useState } from "react";
import { primaryGreen, primaryYellow } from "../../../constantVriables";
import { Breadcrumbs } from "../../../Components/CheckoutStepper";
import FormInputField from "../../../Components/FormInputField";

const CheckoutBillingPage = ({ links, setCurrentPage, setOrderDetails }) => {
    const [fields, setFields] = useState({
        cost_center: "",
        comment: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFields({ ...fields, [name]: value });
    };

    const onContinueToOrderReview = () => {
        setCurrentPage(2);
        setOrderDetails((prev) => ({
            ...prev,
            cost_center: fields.cost_center,
            comment: fields.comment,
        }));
    };

    return (
        <div
            style={{ border: `1px ${primaryYellow} solid` }}
            className="bg-white shadow-md rounded-lg p-6 mt-8 max-w-7xl"
        >
            <Breadcrumbs setCurrentPage={setCurrentPage} links={links} />
            <h2 class="text-xl font-semibold mb-2 mt-6 ">Billing</h2>
            <div className="container mx-auto p-4">
                <p>
                    please enter your cost center number below, if you have
                    multiple cost centers please give details in the comments
                    field:
                </p>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 mt-8">
                    <div className="flex flex-col gap-2 border rounded-md p-4 w-full mx-auto max-w-2xl">
                        <FormInputField
                            id="cost_center"
                            name="cost_center"
                            label="Cost Center #:"
                            value={fields.cost_center}
                            onChange={handleChange}
                        />
                        <span className="mt-4">
                            Additional Order Information:{" "}
                        </span>

                        <FormInputField
                            id="comment"
                            name="comment"
                            label="Comment"
                            value={fields.comment}
                            onChange={handleChange}
                        />
                    </div>
                </div>
            </div>

            <div className="flex justify-end">
                <button
                    style={{ backgroundColor: primaryGreen }}
                    onClick={onContinueToOrderReview}
                    className="block w-2/5 bg-[#8c0327] hover:bg-[#6b0220] text-white font-bold py-3 px-4 rounded-full"
                >
                    Save And Continue To Order Review
                </button>
            </div>
        </div>
    );
};

export default CheckoutBillingPage;
