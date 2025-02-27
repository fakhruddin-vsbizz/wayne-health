import { Link } from "react-router-dom";
import { primaryGreen, primaryYellow } from "../../../constantVriables";

const CreateProduct = () => {
    return (
        <div class="sx:max-w-lg lg:max-w-6xl mx-auto p-6 mt-16">
            <div
                style={{ border: `1px ${primaryYellow} solid` }}
                class="bg-white shadow-md rounded-lg p-6"
            >
                <h1
                    style={{ color: primaryGreen }}
                    class="text-3xl font-bold mb-4 ml-6"
                >
                    Create Product
                </h1>
                <div class="flex flex-wrap p-4">
                    <div class="p-2 w-full">
                        <Link
                            to="/admin/create-product/lab-coat"
                            class="bg-gray-100 rounded flex p-4 h-full items-center"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                class="size-6 active mr-4 font-bold"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                />
                            </svg>
                            <span class="font-medium">Lab Coats</span>
                        </Link>
                    </div>
                    <div class="p-2 w-full">
                        <Link
                            to="/admin/create-product/top"
                            class="bg-gray-100 rounded flex p-4 h-full items-center"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                class="size-6 active mr-4 font-bold"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                />
                            </svg>
                            <span class="font-medium">Tops</span>
                        </Link>
                    </div>
                    <div class="p-2 w-full">
                        <Link
                            to="/admin/create-product/pant"
                            class="bg-gray-100 rounded flex p-4 h-full items-center"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                class="size-6 active mr-4 font-bold"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                />
                            </svg>
                            <span class="font-medium">Pants</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateProduct;
