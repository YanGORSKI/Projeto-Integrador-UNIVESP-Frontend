// src/pages/Financeiro.jsx
import React from 'react';
import SectorButton from '../../components/Other/Buttons/SectorButton';
import { FaBook, FaWarehouse } from 'react-icons/fa'; // Ícones para Fluxo de Caixa e Outlet

const Financeiro = () => {
    return (
        <div className="flex flex-col md:flex-row justify-center items-center h-full space-y-8 md:space-y-0 md:space-x-8">
            <SectorButton
                icon={<FaBook />} // Ícone para Fluxo de Caixa
                label="Fluxo de Caixa"
                route="/financeiro/fluxo-caixa/demonstrativo" // Defina a rota que deseja redirecionar
            />
            <SectorButton
                icon={<FaWarehouse />} // Ícone para Outlet
                label="Outlet"
                route="/financeiro/outlet" // Defina a rota que deseja redirecionar
            />
        </div>
    );
};

export default Financeiro;