import { createContext } from "react";

export const AppContext = createContext();

export default function AppProvider(props) {
    return (
        <AppContext.Provider value={{ user: "customer" }}>
            {props.children}
        </AppContext.Provider>
    );
}
