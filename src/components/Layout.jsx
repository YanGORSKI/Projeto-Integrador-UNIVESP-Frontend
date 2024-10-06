// src/components/Layout.jsx
import React, { useState } from "react";
import Sidebar from "./Sidebar";
import MainScreen from "./MainScreen";

const Layout = ({ children }) => {
    const [isOpen, setIsOpen] = useState(true); // Estado para gerenciar a visibilidade da Sidebar

    const handleSidebarToggle = (openState) => {
        // Função que será chamada pela Sidebar para mudar o estado
        setIsOpen(openState);
    };

    return (
        <div className="flex">
            {/* Passa a função de controle para a Sidebar */}
            <Sidebar onToggle={handleSidebarToggle} />

            {/* MainScreen ajusta o layout baseado no estado da Sidebar */}
            <MainScreen isOpen={isOpen}>
                {children}
            </MainScreen>
        </div>
    );
};

export default Layout;
