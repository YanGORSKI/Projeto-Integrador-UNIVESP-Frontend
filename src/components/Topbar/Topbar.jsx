// src/components/Topbar/Topbar.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";

const Topbar = ({ tabs, paths}) => {
    const location = useLocation();

    return (
        <div className="bg-cor-destaque1 text-white flex">
            {tabs.map((tab, index) => {
                const isActive = location.pathname === paths[index];
                return (
                    <Link 
                        key={index} 
                        to={paths[index]} 
                        className={`px-4 py-2 ${isActive ? 'bg-cor-tema1 font-bold' : ''} hover:bg-cor-tema1`}
                    >
                        {tab}
                    </Link>
                );
            })}
        </div>
    );
};

export default Topbar;
