import React from 'react';
import PropTypes from 'prop-types';

const Tabela = ({ colunas, dados }) => {
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
                                <td key={colIndex} className="p-2 text-center">{dado[coluna.toLowerCase()]}</td>
                            ))}
                            <td className="p-2"><button className="text-red-600">❌</button></td>
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
};

export default Tabela;
