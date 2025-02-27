import React from "react";
import { primaryYellow } from "../../constantVriables";
import moment from "moment";
import { Link } from "react-router-dom";

const ReturnPolicy = () => {
    return (
        <>
            <div class="container mx-auto p-6">
                <div className="w-full flex flex-col items-center justify-center mb-4">
                    <a href="https://www.alyko.com/" target="_blank">
                        <img
                            src="/images/banner/welcome.png"
                            alt="ALYKO banner"
                        />
                    </a>
                </div>
                <div
                    style={{ border: `1px ${primaryYellow} solid` }}
                    class="bg-white shadow-md rounded-lg p-6"
                >
                    <div className="mx-4 my-8 text-black">
                        <hr className="border-black w-1/3 mb-4" />
                        <p className="mb-3">
                            Return Policy & Disclaimers: - Garments are not
                            returnable.
                        </p>
                        <ul className="list-disc">
                            <li className="ml-10">
                                <p>
                                    Please make sure the size is correct, and
                                    all personalization information and
                                    spellings are checked prior to placing the
                                    order.
                                </p>
                            </li>
                            <li className="ml-10">
                                <p>
                                    Turn garments inside out and wash according
                                    to the manufacturer's laundering
                                    instructions. We are not responsible for
                                    incorrectly laundered garments.
                                </p>
                            </li>
                        </ul>
                        <hr className="border-black w-1/3 mt-4" />
                    </div>
                </div>
            </div>
            <footer
                style={{
                    textAlign: "-webkit-center",
                }}
                className="pb-4 mt-8 flex items-center text-center"
            >
                <div className="w-full">
                    <hr className="border-black w-10/12 mb-4" />
                    <div className="flex gap-8 justify-center items-center">
                        <div>
                            <p>
                                Copyright © {moment().year()} www.upgmarket.com
                            </p>
                            <a
                                className="text-blue-600 underline"
                                target="_blank"
                                href="https://www.alyko.com/"
                            >
                                www.alyko.com
                            </a>
                        </div>
                        <div>
                            <Link
                                to="/customer/return-policy"
                                className="text-blue-500"
                            >
                                Return Policy
                            </Link>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default ReturnPolicy;
