import React from "react";
import DownloadLink from "../../Components/DownloadLink";
import { primaryGreen, primaryYellow } from "../../constantVriables";
import moment from "moment";
import { Link } from "react-router-dom";

const InformationForms = () => {
    return (
        <div className="mt-8">
            <div className="w-full flex flex-col items-center justify-center mb-4">
                <a href="https://www.alyko.com/" target="_blank">
                    <img src="/images/banner/welcome.png" alt="ALYKO banner" />
                </a>
            </div>
            <div class="container mx-auto p-6">
                <div
                    style={{ border: `1px ${primaryYellow} solid` }}
                    class="bg-white shadow-md rounded-lg p-6 "
                >
                    <h2
                        style={{ color: primaryGreen }}
                        class="mb-4 text-xl font-semibold text-gray-900"
                    >
                        Information Forms:
                    </h2>
                    <ul class="max-w-md space-y-4 text-gray-500 list-inside">
                        <DownloadLink
                            link="/pdfs/information_forms/Lab Coats Order Information_0225.pdf"
                            text="Lab Coats Order Information"
                        />
                        <DownloadLink
                            link="/pdfs/information_forms/Cherokee Scrubs Order Information_0225.pdf"
                            text="Cherokee Scrubs Order Information"
                        />
                        <DownloadLink
                            link="/pdfs/information_forms/Wink Scrubs Order Information_0225.pdf"
                            text="Wink Scrubs Order Information"
                        />
                    </ul>
                </div>
            </div>
            <footer
                style={{
                    textAlign: "-webkit-center",
                }}
                className="mt-8 flex items-center text-center"
            >
                <div className="w-full">
                    <hr className="border-black w-3/4 mb-4" />
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
        </div>
    );
};

export default InformationForms;
