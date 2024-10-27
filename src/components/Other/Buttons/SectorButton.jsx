// src/components/SectorButton.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const SectorButton = ({ icon, label, route }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(route);
    };

    return (
        <button
            onClick={handleClick}
            className="flex flex-col items-center justify-center w-32 h-32 rounded-lg bg-cor-tema1 text-white hover:bg-opacity-80 transition duration-300"
        >
            <span className="text-2xl">{icon}</span> {/* Aqui você pode usar um componente de ícone */}
            <span className="mt-2">{label}</span>
        </button>
    );
};

export default SectorButton;
