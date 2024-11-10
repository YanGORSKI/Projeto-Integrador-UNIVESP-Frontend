/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import axios from "axios"; // Importação do axios
import { formatCurrency } from "../../../utils/Utils"; // Importando a função de utilidade

const REACT_APP_BACKEND_URL = 'http://localhost:8080';
const URL_FINANC_DEMONSTRATIVO = '/financeiro/demonstrativo';

ChartJS.register(ArcElement, Tooltip, Legend);

const instance = axios.create({
    baseURL: REACT_APP_BACKEND_URL,
    timeout: 1000,
    headers: { "X-Custom-Header": "foobar" }
});

const Demonstrativo = () => {
    const [entradas, setEntradas] = useState([]);
    const [saidas, setSaidas] = useState([]);
    const [saldoAtual, setSaldoAtual] = useState(0);
    const [mesAnteriorEntrada, setMesAnteriorEntrada] = useState(0);
    const [mesAnteriorSaida, setMesAnteriorSaida] = useState(0);
    const [percentualEntrada, setPercentualEntrada] = useState(0);
    const [percentualSaida, setPercentualSaida] = useState(0);
    const [totalEntradaAtual, setTotalEntradaAtual] = useState(0);
    const [totalSaidaAtual, setTotalSaidaAtual] = useState(0);

    const [dataEntradas, setDataEntradas] = useState({
        labels: [],
        datasets: [{ data: [], backgroundColor: [] }]
    });
    const [dataSaidas, setDataSaidas] = useState({
        labels: [],
        datasets: [{ data: [], backgroundColor: [] }]
    });

    const [mesSelecionado, setMesSelecionado] = useState(new Date().getMonth() + 1);
    const [anoSelecionado, setAnoSelecionado] = useState(new Date().getFullYear());

    const carregarDados = async (mes, ano) => {
        try {
            const response = await instance.get(URL_FINANC_DEMONSTRATIVO, {
                params: { mes, ano }
            });
    
            const dados = response.data;
    
            console.log("response.data:", JSON.stringify(response.data, null, 2));
    
            const novasEntradas = dados.entradas || [];
            const novasSaidas = dados.saidas || [];
    
            setEntradas(novasEntradas);
            setSaidas(novasSaidas);
            setSaldoAtual(dados.saldoTotal ?? 0);
            setMesAnteriorEntrada(dados.entradasMesAnterior ?? 0);
            setPercentualEntrada(dados.percentualEntrada ?? 0);
            setMesAnteriorSaida(dados.saidasMesAnterior ?? 0);
            setPercentualSaida(dados.percentualSaida ?? 0);
            setTotalEntradaAtual(dados.totalEntradaAtual ?? 0);
            setTotalSaidaAtual(dados.totalSaidaAtual ?? 0);
    
            // Atualizando os dados dos gráficos após os dados serem carregados
            setDataEntradas({
                labels: [...novasEntradas.map(e => e.categoria)],
                datasets: [
                    {
                        data: [...novasEntradas.map(e => e.total)],
                        backgroundColor: [...novasEntradas.map(e => e.cor)]
                    }
                ]
            });
            
            setDataSaidas({
                labels: [...novasSaidas.map(s => s.categoria)],
                datasets: [
                    {
                        data: [...novasSaidas.map(s => s.total)],
                        backgroundColor: [...novasSaidas.map(s => s.cor)]
                    }
                ]
            });
        } catch (error) {
            console.error("Erro ao carregar dados do demonstrativo:", error);
        }
    };

    // Carregar dados apenas uma vez ao montar a página, para o mês atual e ano atual
    useEffect(() => {
        carregarDados(mesSelecionado, anoSelecionado);
    }, []); // Executa apenas na montagem do componente

    const handleAplicar = () => {
        // Carrega dados com os filtros de mês e ano selecionados
        carregarDados(mesSelecionado, anoSelecionado);
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "bottom"
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        let label = context.label || "";
                        let value = context.raw || 0;
                        return `${label}: ${formatCurrency(value)}`;
                    }
                }
            }
        }
    };

    return (
        <div className="p-6 gap-4">
            <div className="flex gap-4 mb-6">
                <select
                    value={mesSelecionado}
                    onChange={(e) => setMesSelecionado(Number(e.target.value))}
                    className="border rounded px-2 py-1"
                >
                    {Array.from({ length: 12 }, (_, i) => i + 1).map((mes) => (
                        <option key={mes} value={mes}>
                            {new Date(0, mes - 1).toLocaleString("pt-BR", { month: "long" })}
                        </option>
                    ))}
                </select>
                <select
                    value={anoSelecionado}
                    onChange={(e) => setAnoSelecionado(Number(e.target.value))}
                    className="border rounded px-2 py-1"
                >
                    {Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i).map((ano) => (
                        <option key={ano} value={ano}>
                            {ano}
                        </option>
                    ))}
                </select>
                <button onClick={handleAplicar} className="px-4 py-2 bg-cor-tema1 text-white rounded">
                    Aplicar
                </button>
            </div>
            <div className="text-center bg-white rounded-lg shadow-md p-4">
                <h2 className="text-xl font-semibold">Saldo Atual</h2>
                <p className="text-2xl font-bold">{formatCurrency(saldoAtual)}</p>
            </div>
            <div className="flex justify-evenly mt-4 flex-wrap md:flex-nowrap gap-4 mb-8">
                <div className="bg-white rounded-lg shadow-md p-4 w-full md:w-1/2 max-w-md text-center">
                    <h2 className="text-xl font-semibold mb-2">Entradas - Total Atual: {formatCurrency(totalEntradaAtual)}</h2>
                    <div className="w-full max-h-96 flex justify-center items-center">
                        <Pie key={dataEntradas.datasets[0].data} data={dataEntradas} options={options} />
                    </div>
                    <p className="mt-2">Total do mês anterior: {formatCurrency(mesAnteriorEntrada)}</p>
                    <p className="mt-2">Comparação com o mês anterior: {percentualEntrada}%</p>
                </div>
                <div className="bg-white rounded-lg shadow-md p-4 w-full md:w-1/2 max-w-md text-center">
                    <h2 className="text-xl font-semibold mb-2">Saídas - Total Atual: {formatCurrency(totalSaidaAtual)}</h2>
                    <div className="w-full max-h-96 flex justify-center items-center">
                        <Pie key={dataSaidas.datasets[0].data} data={dataSaidas} options={options} />
                    </div>
                    <p className="mt-2">Total do mês anterior: {formatCurrency(mesAnteriorSaida)}</p>
                    <p className="mt-2">Comparação com o mês anterior: {percentualSaida}%</p>
                </div>
            </div>
        </div>
    );
};

export default Demonstrativo;
