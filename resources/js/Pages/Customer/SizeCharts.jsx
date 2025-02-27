import React from "react";
import DownloadLink from "../../Components/DownloadLink";
import { primaryGreen, primaryYellow } from "../../constantVriables";
import moment from "moment";
import { Link } from "react-router-dom";

const SizeCharts = () => {
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
                        Size Charts:
                    </h2>

                    <div>
                        <p className="mb-4 text-lg ml-2">Lab Coats: </p>

                        <ul class="max-w-md space-y-4 text-gray-500 list-inside ml-8">
                            <DownloadLink
                                link="/pdfs/size_charts/Cherokee Lab Coat Size Chart.pdf"
                                text="Cherokee Lab Coat Size Chart"
                            />
                            <DownloadLink
                                link="/pdfs/size_charts/Landau Lab Coat Size Chart.pdf"
                                text="Landau Lab Coat Size Chart"
                            />
                            <DownloadLink
                                link="/pdfs/size_charts/Medline Lab Coats Size Charts.pdf"
                                text="Medline Lab Coats Size Charts"
                            />
                            <DownloadLink
                                link="/pdfs/size_charts/Wink Lab Coat Size Chart.pdf"
                                text="Wink Lab Coat Size Chart"
                            />
                        </ul>
                    </div>
                    <div>
                        <p className="mb-4 text-lg ml-2">Scrubs: </p>

                        <ul class="max-w-md space-y-4 text-gray-500 list-inside ml-8">
                            <DownloadLink
                                link="/pdfs/size_charts/Cherokee Scrubs Size Charts.pdf"
                                text="Cherokee Scrubs Size Charts"
                            />
                            <DownloadLink
                                link="/pdfs/size_charts/Wink Scrubs Size Charts.pdf"
                                text="Wink Scrubs Size Charts"
                            />
                        </ul>
                    </div>
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

export default SizeCharts;
