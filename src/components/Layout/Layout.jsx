// src/components/Layout/Layout.jsx
import React, { useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import MainScreen from "../MainScreen/MainScreen";
import Topbar from "../Topbar/Topbar";
import { useLocation } from "react-router-dom";
import { routesConfig } from "../../routesConfig";

const Layout = ({ children }) => {
    const [isOpen, setIsOpen] = useState(true);
    const location = useLocation();

    // Busca a configuração do path completo ou da rota mais específica em routesConfig
    const currentPathKey = Object.keys(routesConfig).find((path) => location.pathname.startsWith(path))
    console.log("currentPath: " + currentPathKey)
    const currentPathConfig = currentPathKey ? routesConfig[currentPathKey] : {};
    console.log("currentPathConfig: " + currentPathConfig)

    // Separar as tabs e paths para a rota atual
    const tabs = currentPathConfig.tabs || [];
    console.log("tabs: " + tabs)
    const paths = currentPathConfig.paths || [];
    console.log("paths: " + paths)

    // Exibir a Topbar se houver ao menos uma aba
    const showTopbar = tabs.length > 0;
    console.log("showTopbar: " + showTopbar)

    const handleSidebarToggle = (openState) => {
        setIsOpen(openState);
    };

    return (
        <div className="flex flex-col h-screen">
            <Sidebar isOpen={isOpen} onToggle={handleSidebarToggle} />
            <div className={`flex flex-col flex-grow transition-all duration-300 ease-in-out ${isOpen ? 'contentWrapper-open' : 'contentWrapper-closed'}`}>
                {showTopbar && <Topbar tabs={tabs} paths={paths}/>}
                <MainScreen isOpen={isOpen}>
                    {children}
                </MainScreen>
            </div>
        </div>
    );
};

export default Layout;
