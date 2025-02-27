import { Link, Outlet } from "react-router";
import { CustomerNavBar } from "../Components/CustomerNavBar";
import moment from "moment";

export default function CustomerLayout({ isUpdated, setIsUpdated }) {
    return (
        <div>
            <CustomerNavBar isUpdated={isUpdated} setIsUpdated={setIsUpdated} />
            {/* will either be <Home/> or <Settings/> */}
            <Outlet />
        </div>
    );
}
