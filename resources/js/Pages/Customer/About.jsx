import React from "react";
import { primaryGreen, primaryYellow } from "../../constantVriables";
import moment from "moment";
import { Link } from "react-router-dom";

const About = () => {
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
                    <h1
                        style={{ color: primaryGreen }}
                        class="text-3xl font-bold mb-4"
                    >
                        About Us
                    </h1>
                    <p class="mb-4">
                        Welcome to ALYKO Enterprises LLC, your trusted partner
                        in fulfilling all your marketing and corporate apparel
                        needs. We specialize in providing high-quality branded
                        apparel, uniforms, and promotional products that help
                        businesses make a lasting impression and foster a
                        professional, cohesive image. Founded on the principles
                        of reliability, creativity, and customer satisfaction,
                        we understand that the right apparel and promotional
                        materials can elevate your brand identity and enhance
                        your company's presence in any industry. Whether you're
                        outfitting your team with customized uniforms, designing
                        a promotional product campaign, or outfitting your
                        company for a major event, we have the expertise and
                        experience to bring your vision to life.
                    </p>
                    <h2
                        style={{ color: primaryGreen }}
                        class="text-2xl font-semibold mb-2"
                    >
                        Our Mission
                    </h2>
                    <p class="mb-4">
                        At ALYKO Enterprises LLC, our mission is to empower
                        businesses by delivering exceptional, branded apparel
                        and marketing solutions that meet both functional and
                        aesthetic needs. We are committed to providing
                        high-quality products that represent your company with
                        pride while supporting your unique branding efforts.
                    </p>
                    <h2
                        style={{ color: primaryGreen }}
                        class="text-2xl font-semibold mb-2"
                    >
                        We Offer
                    </h2>
                    <p class="mb-4">
                        ALYKO Enterprises LLC is an established B2B company that
                        satisfies all your marketing and corporate
                        apparel/uniform needs. Browse our website at
                        www.alyko.com or contact us for your specific
                        requirements of:
                    </p>
                    <ul>
                        <li>
                            <p class="mb-2"> Uniforms </p>{" "}
                        </li>
                        <li>
                            <p class="mb-2"> Corporate Apparel </p>{" "}
                        </li>
                        <li>
                            <p class="mb-2"> Promotional Products </p>{" "}
                        </li>
                        <li>
                            <p class="mb-2"> Trade Show Displays and Signs </p>{" "}
                        </li>
                    </ul>
                    <p class="font-semibold">
                        We are a certified MMBDC member and have been in
                        business for over 23 years.
                    </p>
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

export default About;
