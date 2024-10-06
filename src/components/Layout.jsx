// src/components/Layout.jsx
import React from "react";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
    return (
        <div className="flex">
            <Sidebar />
            <div className="content flex-1 p-10">
                {children}
            </div>
        </div>
    );
};

export default Layout;
