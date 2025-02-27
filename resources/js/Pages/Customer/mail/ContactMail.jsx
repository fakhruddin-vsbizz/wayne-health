import React from "react";
import moment from "moment";
import CustomTable from "../../../Components/CustomTable";
import { primaryGreen } from "../../../constantVriables";
import UpdateCart from "../../../Components/UpdateCart";

const columns = ["Item", "Price", "Quantity", "Total", "Additional Info"];

const ContactMail = ({ name, email, phone, message }) => {
    // const [orderItems, setOrderItems] = useState([]);
    // const [orderDetails, setOrderDetails] = useState({});

    // const [isUpdated, setIsUpdated] = useState(false);

    // const [total, setTotal] = useState(0);

    // const [customer, setCustomer] = useState({});

    // const contentRef = useRef(null);

    // const { orderId } = useParams();

    // const handlePrint = useReactToPrint({
    //     contentRef,
    //     pageStyle: "p-4",
    // });

    // const handlePrint = useReactToPrint({
    //     content: () => componentRef.current,
    //     documentTitle: `order-information`,
    //     onPrintError: () => alert("there is an error when printing"),
    // });

    // useEffect(() => {
    //     const token = localStorage.getItem("x-wayne-health-token");
    //     axios
    //         .get("/api/customer/order/" + orderId, {
    //             headers: {
    //                 Authorization: `Bearer ${token}`,
    //                 Accept: "application/json",
    //             },
    //         })
    //         .then((data) => {
    //             console.log(data);
    //             // console.log(data.data.cartItems);
    //             if (data?.data) {
    //                 setOrderItems(data.data.orderItems);
    //                 setOrderDetails(data.data.order);
    //                 setCustomer(data.data.customer[0]);
    //                 setTotal(data.data.total);
    //                 // setCartId(data.data.cartId);
    //                 // setTotal(data.data.total);
    //             }
    //         })
    //         .catch((err) => console.log(err));
    // }, [isUpdated]);

    return (
        <div style={{ width: "100%" }}>
            <h1>Contact Form Submission</h1>
            <p>
                <strong>Name:</strong> {name}
            </p>
            <p>
                <strong>Email:</strong> {email}
            </p>
            <p>
                <strong>Phone:</strong> {phone}
            </p>
            <p>
                <strong>Message:</strong>
            </p>
            <p>{message}</p>
        </div>
    );
};

export default ContactMail;
