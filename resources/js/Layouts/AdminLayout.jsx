import { Outlet } from "react-router";
import { CustomNavBar } from "../Components/Navbar";

export default function AdminLayout() {
    return (
        <div>
            <CustomNavBar />
            {/* will either be <Home/> or <Settings/> */}
            <Outlet />
        </div>
    );
}
