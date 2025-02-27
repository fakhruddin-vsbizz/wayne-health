export const pdfNames = [
    {
        value: "/pdfs/size_charts/Wink Scrubs Size Charts.pdf",
        title: "Wink Scrubs Size Charts.pdf",
    },
    {
        value: "/pdfs/Cherokee Lab Coat Size Chart.pdf",
        title: "Cherokee Lab Coat Size Chart.pdf",
    },
    {
        value: "/pdfs/Cherokee Scrubs Size Charts.pdf",
        title: "Cherokee Scrubs Size Charts.pdf",
    },
    {
        value: "/pdfs/Front Desk Uniform Size Charts.pdf",
        title: "Front Desk Uniform Size Charts.pdf",
    },
    {
        value: "/pdfs/Landau Lab Coat Size Chart.pdf",
        title: "Landau Lab Coat Size Chart.pdf",
    },
    {
        value: "/pdfs/Medline Lab Coats Size Charts.pdf",
        title: "Medline Lab Coats Size Charts.pdf",
    },
    {
        value: "/pdfs/size_charts/Wink Lab Coat Size Chart.pdf",
        title: "Wink Lab Coat Size Chart.pdf",
    },
];

export const embroidery_lines_options = [
    { title: "line 1", value: "line1" },
    { title: "line 2", value: "line2" },
    { title: "line 3", value: "line3" },
];

export const co_brand_logo_options = [
    {
        title: "Detroit Medical Center",
        value: "Detroit Medical Center logo",
    },
    {
        title: "Kresge Eye Institute",
        value: "Kresge Eye Institute logo",
    },
    {
        title: "Karmanos",
        value: "Karmanos logo",
    },
    {
        title: "Ilitch",
        value: "Ilitch logo",
    },
];

export const wayne_logo_options = [
    {
        title: "Yes",
        value: "yes",
    },
];

export const official_logo_options = [
    {
        title: "Wayne Health",
        value: "Wayne Health logo",
    },
    {
        title: "Wayne Health + KEI",
        value: "wayne health + KEI logo",
    },
];

export const order_status_options = [
    { title: "Pending", value: "pending" },
    { title: "Received", value: "received" },
    { title: "In Progress", value: "in_progress" },
    { title: "Shipped", value: "shipped" },
    { title: "Cancel", value: "cancel" },
];

export const position_options = [
    { title: "left", value: "left" },
    { title: "right", value: "right" },
];

export const toastOptions = {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
    theme: "light",
};

export function isFalsy(value) {
    return !value;
}

export const objectToFormData = (obj) => {
    const formData = new FormData();

    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            // Check if the key is either 'official_logo_price' or 'co_brand_logo_price'
            if (
                key === "official_logo_price" ||
                key === "co_brand_logo_price"
            ) {
                // Convert the value to an array if it's a string (split by comma)
                const value =
                    typeof obj[key] === "string"
                        ? obj[key].split(",")
                        : obj[key];

                formData.append(key + "[]", value); // Join the array back into a string if needed
            } else if (key === "product_sizes") {
                formData.append(key + "[]", JSON.stringify(obj[key]));
            } else {
                // Append other keys normally
                formData.append(key, obj[key]);
            }
        }
    }

    return formData;
};

// export const objectToFormData = (obj) => {
//     const formData = new FormData();

//     for (let key in obj) {
//         if (obj.hasOwnProperty(key)) {
//             formData.append(key, obj[key]);
//         }
//     }

//     return formData;
// };

export const trimString = (str, maxLength) => {
    if (str.length > maxLength) {
        return str.substring(0, maxLength - 3) + "...";
    }
    return str;
};

export const convertStringToObject = (str) => {
    // Split the input string by commas to separate each size and prize pair
    const sizePrizePairs = str.split(", ");

    // Map over each pair and create an object with `size` and `prize`
    const result = sizePrizePairs.map((pair) => {
        const [size, price] = pair.split(":"); // Split each pair into size and prize
        return {
            size: size.trim(),
            price: Number(price).toFixed(2),
            quantity: 0, // Convert the prize to a number
        };
    });

    return result;
};

export const primaryGreen = "#007f4e";
export const primaryYellow = "#f8cc1b";
export const secondaryYellow = "#FFB200";

export const primaryGradient = {
    background: "rgb(0,127,78)",
    background:
        "linear-gradient(90deg, rgba(0,127,78,1) 37%, rgba(248,204,27,1) 91%)",
};
