import React from 'react';

const MenuList = () => {
    return (
        <ul className="nav_list">
            <li>
                <a href="admin.html">
                    <i className='bx bxs-institution'></i>
                    <span className="links_name">ONG</span>
                </a>
                <span className="tooltip">ONG</span>
            </li>
            <li>
                <a href="calendar.html">
                    <i className='bx bx-calendar'></i>
                    <span className="links_name">Calendário</span>
                </a>
                <span className="tooltip">Calendário</span>
            </li>
            <li>
                <a href="/pessoas/index">
                    <i className='bx bxs-user'></i>
                    <span className="links_name">Pessoas</span>
                </a>
                <span className="tooltip">Pessoas</span>
            </li>
            <li>
                <a href="financeiro.html">
                    <i className='bx bx-dollar-circle'></i>
                    <span className="links_name">Financeiro</span>
                </a>
                <span className="tooltip">Financeiro</span>
            </li>
            <li>
                <a href="projetos.html">
                    <i className='bx bx-spreadsheet'></i>
                    <span className="links_name">Projetos</span>
                </a>
                <span className="tooltip">Projetos</span>
            </li>
            <li>
                <a href="config.html">
                    <i className='bx bx-cog'></i>
                    <span className="links_name">Configurações</span>
                </a>
                <span className="tooltip">Configurações</span>
            </li>
        </ul>
    );
}

export default MenuList;