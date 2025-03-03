import React, { useEffect, useState } from "react";
import ItemCard from "../../Components/ItemCard";
import { Link } from "react-router-dom";
import moment from "moment";

const CustomerHome = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("x-wayne-health-token");

        axios
            .get("/api/admin/products", {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            })
            .then((data) => {
                console.log(data);
                if (data?.data) {
                    if (data?.data.length !== 0) {
                        setProducts(
                            data.data.filter((fItem) => !fItem.is_discontinued)
                        );
                    } else {
                        setProducts([]);
                    }
                }
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <div
            style={{ minHeight: "89.9vh" }}
            class="bg-gray-200 w-[99vw] p-8 sm:px-16 sx:pb-16 sx:pt-8 dark:bg-gray-900"
        >
            <div>
                <div className="w-full flex flex-col items-center justify-center mb-4">
                    <a href="https://www.alyko.com/" target="_blank">
                        <img
                            src="/images/banner/welcome.png"
                            alt="ALYKO banner"
                        />
                    </a>
                </div>
                <h1 className="mb-5 ml-20 text-2xl font-bold">
                    Featured Products
                </h1>
                <div class="mx-auto w-fit grid grid-cols-1 lg:grid-cols-5 sm:grid-cols-2 gap-6">
                    {products.map((product) => (
                        <ItemCard
                            manufacturer={product?.manufacturer}
                            item_code={product?.item_code}
                            key={product.id}
                            img={product.product_image}
                            name={product.name}
                            starts_at={product.starts_at}
                            productId={product.id}
                        />
                    ))}
                    {/* <div class="relative group bg-gray-200 h-[400px] shadow-lg rounded-2xl overflow-hidden">
                    <img
                        class="w-full h-full group-hover:h-64 object-cover rounded-2xl transition-all delay-150 duration-300 ease"
                        src="https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/f014625e-1a1d-4944-8395-46a07841a794/JORDAN+SPIZIKE+LOW.png"
                    />
                    <div class="bg-gray-100 w-full h-40 absolute left-0 bottom-0 -mb-44 group-hover:mb-0 rounded-b-2xl transition-all delay-150 duration-300 ease dark:bg-gray-700">
                        <div class="p-6">
                            <div class="capitalize flex items-center justify-between gap-4">
                                <div>
                                    <h2 class="text-red-600 text-lg font-bold">
                                        jordan spizike low
                                    </h2>
                                    <p class="dark:text-gray-100">
                                        men's shoes
                                    </p>
                                </div>
                                <div>
                                    <p class="text-3xl font-bold dark:text-gray-100">
                                        $160
                                    </p>
                                </div>
                            </div>
                            <div class="block mt-4">
                                <div class="absolute bottom-2 left-5">
                                    <button class="bg-red-600 text-gray-100 font-medium py-2.5 px-4 rounded-xl opacity-90 hover:opacity-100">
                                        Add to cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}

                    {/* <div class="relative group bg-gray-200 h-[400px] shadow-lg rounded-2xl overflow-hidden">
                    <img
                        class="w-full h-full group-hover:h-64 object-cover rounded-2xl transition-all delay-150 duration-300 ease"
                        src="https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/362cced6-125a-4354-a6e0-f56e747ce4d6/AIR+JORDAN+6+RETRO.png"
                    />
                    <div class="bg-gray-100 dark:bg-gray-700 w-full h-40 absolute left-0 bottom-0 -mb-44 group-hover:mb-0 rounded-b-2xl transition-all delay-150 duration-300 ease">
                        <div class="p-6">
                            <div class="capitalize flex items-center justify-between gap-4">
                                <div>
                                    <h2 class="text-red-600 text-lg font-bold">
                                        Air Jordan 6 Retro
                                    </h2>
                                    <p class="dark:text-gray-100">
                                        men's shoes
                                    </p>
                                </div>
                                <div>
                                    <p class="text-3xl font-bold dark:text-gray-100">
                                        $200
                                    </p>
                                </div>
                            </div>
                            <div class="block mt-4">
                                <div class="absolute bottom-2 left-5">
                                    <button class="bg-red-600 text-gray-100 font-medium py-2.5 px-4 rounded-xl opacity-90 hover:opacity-100">
                                        Add to cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="relative group bg-gray-200 h-[400px] shadow-lg rounded-2xl overflow-hidden">
                    <img
                        class="w-full h-full group-hover:h-64 object-cover rounded-2xl transition-all delay-150 duration-300 ease"
                        src="https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/77c98012-1e1a-4d57-8a69-162af8874e58/JORDAN+MVP.png"
                    />
                    <div class="bg-gray-100 dark:bg-gray-700 w-full h-40 absolute left-0 bottom-0 -mb-44 group-hover:mb-0 rounded-b-2xl transition-all delay-150 duration-300 ease">
                        <div class="p-6">
                            <div class="capitalize flex items-center justify-between gap-4">
                                <div>
                                    <h2 class="text-red-600 text-lg font-bold">
                                        Jumpman MVP
                                    </h2>
                                    <p class="dark:text-gray-100">
                                        men's shoes
                                    </p>
                                </div>
                                <div>
                                    <p class="text-3xl font-bold dark:text-gray-100">
                                        $165
                                    </p>
                                </div>
                            </div>
                            <div class="block mt-4">
                                <div class="absolute bottom-2 left-5">
                                    <button class="bg-red-600 text-gray-100 font-medium py-2.5 px-4 rounded-xl opacity-90 hover:opacity-100">
                                        Add to cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}
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
        </div>
    );
};

export default CustomerHome;
