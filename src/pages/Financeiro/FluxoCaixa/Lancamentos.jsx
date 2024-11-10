/* eslint-disable react-hooks/exhaustive-deps */
// src/pages/Lancamentos.jsx
import React, { useState, useEffect } from 'react';
import TabelaLista from '../../../components/Other/Tables/TabelaLista';
import dayjs from 'dayjs';
import axios from 'axios';

const REACT_APP_BACKEND_URL = 'http://localhost:8080'
const URL_FINANC_LANCAMENTOS = '/financeiro/lancamentos'

const instance = axios.create({
    baseURL: REACT_APP_BACKEND_URL,
    timeout: 1000,
    headers: {'X-Custom-Header': 'foobar'}
});

const Lancamentos = () => {
    const [filters, setFilters] = useState({
        tipo: '',
        dataInicio: '',
        dataFim: '',
        conta: '',
        categoria: '',
        parcelas: '',
        valor: '',
        descricao: '',
        exibirPorPagina: 20,
    });

    const [lancamentos, setLancamentos] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [contas, setContas] = useState([]);
    const [showFilters, setShowFilters] = useState(false);
    
    const [newLancamento, setNewLancamento] = useState({
        tipo: '',
        data: dayjs().format('YYYY-MM-DD'),
        valor: '',
        conta: '',
        parcelas: '',
        categoria: '',
        descricao: '',
    });

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value,
        }));
    };

    const handleNewLancamentoChange = (e) => {
        const { name, value } = e.target;
        setNewLancamento((prevLancamento) => ({
            ...prevLancamento,
            [name]: value,
        }));
    };

    const setToday = () => {
        const today = dayjs().format('YYYY-MM-DD');
        setFilters((prevFilters) => ({
            ...prevFilters,
            dataInicio: today,
            dataFim: today,
        }));
    };

    const setWeek = () => {
        const today = dayjs();
        const startOfWeek = today.startOf('week').format('YYYY-MM-DD');
        setFilters((prevFilters) => ({
            ...prevFilters,
            dataInicio: startOfWeek,
            dataFim: today.format('YYYY-MM-DD'),
        }));
    };

    const setMonth = () => {
        const today = dayjs();
        const startOfMonth = today.startOf('month').format('YYYY-MM-DD');
        setFilters((prevFilters) => ({
            ...prevFilters,
            dataInicio: startOfMonth,
            dataFim: today.format('YYYY-MM-DD'),
        }));
    };

    const setYear = () => {
        const today = dayjs();
        const startOfYear = today.startOf('year').format('YYYY-MM-DD');
        setFilters((prevFilters) => ({
            ...prevFilters,
            dataInicio: startOfYear,
            dataFim: today.format('YYYY-MM-DD'),
        }));
    };

    const formatData = (data) => {
        return dayjs(data).format('DD/MM/YYYY');
    };

    const formatCurrency = (value) => {
        return value.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        });
    };

    const formatTipo = (tipo) => {
        return tipo === 1 ? 'Entrada' : 'Saída';
    };

    const carregarLancamentos = async () => {
        // console.log("tipo: " + filters.tipo,
        //             "dataInicio: " + filters.dataInicio,
        //             "dataFim: " + filters.dataFim,
        //             "conta: " + filters.conta,
        //             "categoria: " + filters.categoria,
        //             "parcelas: " + filters.parcelas,
        //             "valor: " + filters.valor,
        //             "descricao: " + filters.descricao,
        //             "exibirPorPagina: " + filters.exibirPorPagina);
        try {
            const response = await instance.get(URL_FINANC_LANCAMENTOS, {
                params: {
                    tipo: filters.tipo,
                    dataInicio: filters.dataInicio,
                    dataFim: filters.dataFim,
                    conta: filters.conta,
                    categoria: filters.categoria,
                    parcelas: filters.parcelas,
                    valor: filters.valor,
                    descricao: filters.descricao,
                    exibirPorPagina: filters.exibirPorPagina,
                },
            });
            // console.log("response.data:", JSON.stringify(response.data, null, 2));
            setLancamentos(response.data);
        } catch (error) {
            console.error('Erro ao carregar dados dos lançamentos:', error);
        }     
    };

    const carregarCategorias = async () => {
        try {
            const response = await instance.get('/financeiro/categorias');
            setCategorias(response.data);
        } catch (error) {
            console.error('Erro ao carregar categorias:', error);
        }
    };

    const carregarContas = async () => {
        try {
            const response = await instance.get('/financeiro/contas');
            setContas(response.data);
        } catch (error) {
            console.error('Erro ao carregar contas:', error);
        }
    };

    useEffect(() => {
        const today = dayjs();
        const startOfMonth = today.startOf('month').format('YYYY-MM-DD');
        const endOfMonth = today.endOf('month').format('YYYY-MM-DD');

        setFilters((prevFilters) => ({
            ...prevFilters,
            dataInicio: startOfMonth,
            dataFim: endOfMonth,
        }));

        carregarLancamentos();
        carregarCategorias();
        carregarContas();
    }, []);

    const handleToggleFilters = () => {
        setShowFilters(!showFilters);
    };

    const handleSaveLancamento = async () => {
        const lancamentoParaEnvio = {
            tipo: parseInt(newLancamento.tipo),  // Converte para Integer
            data: newLancamento.data,            // Formato de data em string (backend deve aceitar como LocalDate)
            valor: parseFloat(newLancamento.valor), // Converte para BigDecimal
            contaId: parseInt(newLancamento.conta), // Envia apenas o ID da conta
            parcelas: parseInt(newLancamento.parcelas), // Converte para Integer
            categoriaId: parseInt(newLancamento.categoria), // Envia apenas o ID da categoria
            descricao: newLancamento.descricao,
        };

        // console.log('Lançamentos para Envio:', lancamentoParaEnvio);

        try {
            const response = await instance.post(URL_FINANC_LANCAMENTOS, lancamentoParaEnvio);
            console.log('Lançamento salvo com sucesso:', response.data);
            
            // Recarrega lançamentos e limpa os campos do novo lançamento
            carregarLancamentos();
            setNewLancamento({
                tipo: '',
                data: dayjs().format('YYYY-MM-DD'),
                valor: '',
                conta: '',
                parcelas: '',
                categoria: '',
                descricao: '',
            });
        } catch (error) {
            console.error('Erro ao salvar lançamento:', error);
        }
        console.log('Salvar lançamento:', newLancamento);
    };

    const colunas = ['Tipo', 'Data', 'Valor', 'Conta', 'Parcelas', 'Categoria', 'Descrição'];

    const dadosFormatados = lancamentos.map(lancamento => ({
        ...lancamento,
        tipo: formatTipo(lancamento.tipo),
        data: formatData(lancamento.data),
        valor: formatCurrency(lancamento.valor),
        descricao: lancamento.descricao,
    }));

    // console.log("Dados formatados antes da renderização na tabela:", dadosFormatados);

    return (
        <div className="p-5">
            <button onClick={handleToggleFilters} className="mb-4 px-4 py-2 bg-cor-tema1 text-white rounded">
                Filtros
            </button>
            {showFilters && (
                <div className="mb-5 p-4 bg-gray-100 rounded">
                    <div className="flex flex-col md:flex-row justify-evenly gap-4 mb-4">
                        <div className="flex flex-col flex-wrap gap-4 mt-4 items-center">
                            <div className="flex gap-4">
                                <span>Inicial</span>
                                <input type="date" name="dataInicio" value={filters.dataInicio} onChange={handleFilterChange} className="p-2 border border-gray-300 rounded" />
                                <span>Final</span>
                                <input type="date" name="dataFim" value={filters.dataFim} onChange={handleFilterChange} className="p-2 border border-gray-300 rounded" />
                            </div>
                            <div className="grid gap-4 grid-cols-2">
                                <button onClick={setToday} className="px-4 py-2 bg-cor-tema1 text-white rounded">HOJE</button>
                                <button onClick={setWeek} className="px-4 py-2 bg-cor-tema1 text-white rounded">SEMANA</button>
                                <button onClick={setMonth} className="px-4 py-2 bg-cor-tema1 text-white rounded">MÊS</button>
                                <button onClick={setYear} className="px-4 py-2 bg-cor-tema1 text-white rounded">ANO</button>
                            </div>
                        </div>
                        <div className="flex flex-col flex-wrap gap-4 mt-4">
                            <div>
                                <select name="tipo" value={filters.tipo} onChange={handleFilterChange} className="p-2 border border-gray-300 rounded">
                                    <option value="">Tipo</option>
                                    <option value="1">Entrada</option>
                                    <option value="0">Saída</option>
                                </select>
                                <select name="conta" value={newLancamento.conta} onChange={handleNewLancamentoChange} className="p-2 border border-gray-300 rounded">
                                    <option value="">Conta</option>
                                    {contas.map((conta) => (
                                        <option key={conta.idConta} value={conta.idConta}>{conta.descricao}</option>
                                    ))}
                                </select>
                                <select name="categoria" value={newLancamento.categoria} onChange={handleNewLancamentoChange} className="p-2 border border-gray-300 rounded">
                                    <option value="">Categoria</option>
                                    {categorias.map((categoria) => (
                                        <option key={categoria.idCategoria} value={categoria.idCategoria}>{categoria.descricao}</option>
                                    ))}
                                </select>
                                <select name="parcelas" value={filters.parcelas} onChange={handleFilterChange} className="p-2 border border-gray-300 rounded">
                                    <option value="">Parcelas</option>
                                    <option value="parcelado">Parcelado</option>
                                    <option value="semParcelas">Sem Parcelas</option>
                                </select>
                            </div>
                            <div>
                                <input type="text" name="valor" value={filters.valor} placeholder="Valor" onChange={handleFilterChange} className="p-2 border border-gray-300 rounded" />
                                <input type="text" name="descricao" value={filters.descricao} placeholder="Descrição" onChange={handleFilterChange} className="p-2 border border-gray-300 rounded" />
                            </div>
                            <div>
                                <select name="exibirPorPagina" value={filters.exibirPorPagina} onChange={handleFilterChange} className="p-2 border border-gray-300 rounded">
                                    <option value={20}>20</option>
                                    <option value={50}>50</option>
                                    <option value={100}>100</option>
                                </select>
                                <button onClick={carregarLancamentos} className="ml-2 px-4 py-2 bg-cor-tema1 text-white rounded">Aplicar</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <div className="mb-5 p-4 bg-gray-100 rounded">
                <div className="flex flex-col md:flex-row justify-evenly gap-4 mb-4">
                    <div className="flex flex-col md:flex-row flex-wrap gap-4 mt-4 items-center">
                        <select name="tipo" value={newLancamento.tipo} onChange={handleNewLancamentoChange} className="p-2 border border-gray-300 rounded">
                            <option value="">Tipo</option>
                            <option value="1">Entrada</option>
                            <option value="0">Saída</option>
                        </select>
                        <input type="date" name="data" value={newLancamento.data} onChange={handleNewLancamentoChange} className="p-2 border border-gray-300 rounded" />
                        <input type="text" name="valor" value={newLancamento.valor} placeholder="Valor" onChange={handleNewLancamentoChange} className="p-2 border border-gray-300 rounded" />
                        <select name="conta" value={newLancamento.conta} onChange={handleNewLancamentoChange} className="p-2 border border-gray-300 rounded">
                            <option value="">Conta</option>
                            {contas.map((conta) => (
                                <option key={conta.idConta} value={conta.idConta}>{conta.descricao}</option>
                            ))}
                        </select>
                        <input type="text" name="parcelas" value={newLancamento.parcelas} placeholder="Parcelas" onChange={handleNewLancamentoChange} className="p-2 border border-gray-300 rounded" />
                        <select name="categoria" value={newLancamento.categoria} onChange={handleNewLancamentoChange} className="p-2 border border-gray-300 rounded">
                            <option value="">Categoria</option>
                            {categorias.map((categoria) => (
                                <option key={categoria.idCategoria} value={categoria.idCategoria}>{categoria.descricao}</option>
                            ))}
                        </select>
                        <input type="text" name="descricao" value={newLancamento.descricao} placeholder="Descrição" onChange={handleNewLancamentoChange} className="p-2 border border-gray-300 rounded" />
                        <button onClick={handleSaveLancamento} className="ml-2 px-4 py-2 bg-cor-tema1 text-white rounded">
                            <i className="fas fa-save"></i> Salvar
                        </button>
                    </div>
                </div>
            </div>
            <TabelaLista 
                colunas={colunas} 
                dados={dadosFormatados} 
                urlBase={URL_FINANC_LANCAMENTOS}
                onDeleteSuccess={carregarLancamentos}
            />
        </div>
    );
};

export default Lancamentos;
