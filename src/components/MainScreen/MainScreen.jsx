// src/components/MainScreen/MainScreen.jsx
import React from "react";

const MainScreen = ({ isOpen, children }) => {
    return (
        <div className={`flex-grow transition-all duration-300 p-4`}>
            {children}
        </div>
    );
};

export default MainScreen;
