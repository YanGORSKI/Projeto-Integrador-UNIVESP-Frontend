import React, { useState, useEffect } from "react";
import { FaGlobe, FaCalendarAlt, FaUsers, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { BiSolidInstitution, BiSpreadsheet } from "react-icons/bi";
import { AiOutlineDollar } from "react-icons/ai";
import profilepicture from "../../assets/profilepicture.jpg";

const Sidebar = ({ onToggle }) => {
    const [isOpen, setIsOpen] = useState(true);
    const [usuario, setUsuario] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // Estado para verificar se os dados estão sendo carregados

    const toggleSidebar = () => {
        const newIsOpen = !isOpen;
        setIsOpen(newIsOpen);
        onToggle(newIsOpen); // Comunica a mudança para o Layout
    };

    useEffect(() => {
        const usuarioSalvo = localStorage.getItem('usuarioLogado');
        if (usuarioSalvo) {
            setUsuario(JSON.parse(usuarioSalvo));
        }
        setIsLoading(false)
    }, []);

    const cargosMap = {
        coordenacao: 'Coordenação',
        usuario: 'Usuário'
    };
    
    const formatarCargo = (cargo) => cargosMap[cargo] || cargo;

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className={`fixed top-0 left-0 h-full ${isOpen ? 'w-45 md:w-60' : 'w-14'} bg-cor-tema1 p-4 transition-all duration-500 ease-in-out`}>
            {/* Logo e botão de abrir/fechar */}
            <div className="flex items-center h-16 text-white">
                <div onClick={isOpen ? null : toggleSidebar} className="cursor-pointer">
                    <FaGlobe className={`text-white ${isOpen ? 'text-2xl md:text-4xl' : 'text-2xl md:text-3xl'}`} />
                </div>
                <a href="/home" className={`text-white font-bold hover:text-cor-destaque1 transition-all ${isOpen ? 'inline-block text-2xl cursor-pointer md:text-4xl' : 'hidden'}`}>
                    <span className={`text-xl ml-4 ${isOpen ? 'flex md:text-3xl' : 'hidden'}`}>ADRA</span>
                </a>
                <div onClick={toggleSidebar} className={`text-sm flex text-white font-bold ml-4 cursor-pointer ${isOpen ? 'flex' : 'hidden md:hidden'}`}>
                    X
                </div>
            </div>

            {/* Lista de Navegação */}
            <ul className="mt-10">
                <li className="mb-6">
                    <a href="/admin" className="flex items-center text-white hover:text-cor-destaque1 transition-all">
                        <BiSolidInstitution className={`text-xl md:text-2xl ${isOpen ? 'text-2xl' : ''}`} />
                        <span className={`text-sm ml-4 ${isOpen ? 'flex md:text-xl' : 'hidden'}`}>ONG</span>
                    </a>
                </li>
                <li className="mb-6">
                    <a href="/calendar" className="flex items-center text-white hover:text-cor-destaque1 transition-all">
                        <FaCalendarAlt className={`text-xl md:text-2xl ${isOpen ? 'text-2xl' : ''}`} />
                        <span className={`text-sm ml-4 ${isOpen ? 'flex md:text-xl' : 'hidden'}`}>Calendário</span>
                    </a>
                </li>
                <li className="mb-6">
                    <a href="/pessoas" className="flex items-center text-white hover:text-cor-destaque1 transition-all">
                        <FaUsers className={`text-xl md:text-2xl ${isOpen ? 'text-2xl' : ''}`} />
                        <span className={`text-sm ml-4 ${isOpen ? 'flex md:text-xl' : 'hidden'}`}>Pessoas</span>
                    </a>
                </li>
                <li className="mb-6">
                    <a href="/financeiro" className="flex items-center text-white hover:text-cor-destaque1 transition-all">
                        <AiOutlineDollar className={`text-xl md:text-2xl ${isOpen ? 'text-2xl' : ''}`} />
                        <span className={`text-sm ml-4 ${isOpen ? 'flex md:text-xl' : 'hidden'}`}>Financeiro</span>
                    </a>
                </li>
                <li className="mb-6">
                    <a href="/projetos" className="flex items-center text-white hover:text-cor-destaque1 transition-all">
                        <BiSpreadsheet className={`text-xl md:text-2xl ${isOpen ? 'text-2xl' : ''}`} />
                        <span className={`text-sm ml-4 ${isOpen ? 'flex md:text-xl' : 'hidden'}`}>Projetos</span>
                    </a>
                </li>
                <li className="mb-6">
                    <a href="/config" className="flex items-center text-white hover:text-cor-destaque1 transition-all">
                        <FaCog className={`text-xl md:text-2xl ${isOpen ? 'text-2xl' : ''}`} />
                        <span className={`text-sm ml-4 ${isOpen ? 'flex md:text-xl' : 'hidden'}`}>Configurações</span>
                    </a>
                </li>
            </ul>

            {/* Perfil */}
            <div className="absolute bottom-0 left-0 w-full p-4 bg-cor-tema-claro">
                <div className="flex items-center">
                    <img src={profilepicture} alt="Profile" className="h-10 w-10 rounded-full object-cover" />
                    <div className={`ml-4 hidden ${isOpen ? 'md:inline' : 'hidden'}`}>
                        <div className="text-white">{usuario.username}</div>
                        <div className="text-white text-sm">{formatarCargo(usuario.cargo)}</div>
                    </div>
                    <FaSignOutAlt className="ml-auto text-2xl text-white cursor-pointer hover:text-cor-destaque1" />
                </div>
            </div>
        </div>
    );
};

export default Sidebar;