import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const REACT_APP_BACKEND_URL = 'http://localhost:8080'

const instance = axios.create({
    baseURL: REACT_APP_BACKEND_URL,
    timeout: 1000,
    headers: {'X-Custom-Header': 'foobar'}
});

const Tabela = ({ colunas, dados, urlBase, onDeleteSuccess  }) => {

    const handleDelete = async (id) => {
        try {
            await instance.delete(`${urlBase}/${id}`);
            alert('Item excluído com sucesso.');
            onDeleteSuccess();
        } catch (error) {
            console.error('Erro ao excluir item:', error);
            alert('Erro ao excluir o item.');
        }
    };

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr>
                        <th className="p-2 bg-cor-tema1 text-white"></th>
                        {colunas.map((coluna, index) => (
                            <th key={index} className="p-2 bg-cor-tema1 text-white">{coluna}</th>
                        ))}
                        <th className="p-2 bg-cor-tema1 text-white"></th>
                    </tr>
                </thead>
                <tbody>
                    {dados.map((dado, index) => (
                        <tr key={dado.id} className={`border-b ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
                            <td className="p-2"><button className="text-cor-tema1">✏️</button></td>
                            {colunas.map((coluna, colIndex) => (
                                <td key={colIndex} className="p-2 text-center">{dado[coluna.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')]}</td>
                            ))}
                            <td className="p-2">
                                <button 
                                    className="text-red-600" 
                                    onClick={() => handleDelete(dado.id)}
                                >
                                    ❌
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

Tabela.propTypes = {
    colunas: PropTypes.arrayOf(PropTypes.string).isRequired,
    dados: PropTypes.arrayOf(PropTypes.object).isRequired,
    urlBase: PropTypes.string.isRequired,
};

export default Tabela;
