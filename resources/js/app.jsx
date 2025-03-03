import "./bootstrap";

import React from "react";
import ReactDOM from "react-dom/client";

import App from "./Pages/App";
import AppProvider from "./Context/AuthContext";

ReactDOM.createRoot(document.getElementById("app")).render(
    <AppProvider>
        <App />
    </AppProvider>
);
