/* eslint-disable react-hooks/exhaustive-deps */
// src/pages/Financeiro/Demonstrativo.jsx
import React, { useState, useEffect, useCallback } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { formatCurrency } from "../../../utils/Utils"; // Importando a função de utilidade
// import axios from "axios";

// Registrando elementos necessários para o gráfico de Pie
ChartJS.register(ArcElement, Tooltip, Legend);

const Demonstrativo = () => {
    // Estados para armazenar os dados de entradas, saídas e saldo
    const [entradas, setEntradas] = useState([]);
    const [saidas, setSaidas] = useState([]);
    const [saldoAtual, setSaldoAtual] = useState(0);
    const [mesAnteriorEntrada, setMesAnteriorEntrada] = useState(0);
    const [mesAnteriorSaida, setMesAnteriorSaida] = useState(0);
    const [percentualEntrada, setPercentualEntrada] = useState(0);
    const [percentualSaida, setPercentualSaida] = useState(0);
    const [totalEntradaAtual, setTotalEntradaAtual] = useState(0);
    const [totalSaidaAtual, setTotalSaidaAtual] = useState(0);

    // Estados para selecionar o mês e o ano
    const [mesSelecionado, setMesSelecionado] = useState(new Date().getMonth() + 1); // Mês atual
    const [anoSelecionado, setAnoSelecionado] = useState(new Date().getFullYear()); // Ano atual

    // JSON placeholder para dados iniciais
    const dadosPlaceholder = {
        entradas: [
            { categoria: "Doações", valor: 5500, cor: "#4caf50" },
            { categoria: "Patrocínios", valor: 3000, cor: "#2196f3" },
            { categoria: "Vendas", valor: 1500, cor: "#ff9800" }
        ],
        saidas: [
            { categoria: "Folha de Pagamento", valor: 4000, cor: "#f44336" },
            { categoria: "Infraestrutura", valor: 3500, cor: "#ffeb3b" },
            { categoria: "Projetos", valor: 2500, cor: "#9c27b0" }
        ],
        mesAnteriorEntrada: 9000,
        percentualEntrada: 10,
        mesAnteriorSaida: 8000,
        percentualSaida: 15,
        saldoTotal: 20000,
        totalEntradaAtual: 10000, // Total atual de entradas do mês
        totalSaidaAtual: 8000      // Total atual de saídas do mês
    };

    // Função para carregar dados do backend (simulada com placeholder)
    const carregarDados = useCallback(async (mes, ano) => {
        // Código de requisição para o backend comentado até o backend estar pronto
        /*
        try {
            const response = await axios.get(`[url_do_backend]/financeiro/demonstrativo`, {
                params: { mesAno: `${mes}/${ano}` }
            });
            const dados = response.data;
            setEntradas(dados.entrada);
            setSaidas(dados.saida);
            setSaldoAtual(dados.saldoTotal);
            setMesAnteriorEntrada(dados.mesAnteriorEntrada);
            setPercentualEntrada(dados.mesAnteriorPorcenagemEntrada);
            setMesAnteriorSaida(dados.mesAnteriorSaida);
            setPercentualSaida(dados.mesAnteriorPorcenagemSaida);
            setTotalEntradaAtual(dados.totalEntradaAtual); // Nova adição
            setTotalSaidaAtual(dados.totalSaidaAtual); // Nova adição
        } catch (error) {
            console.error("Erro ao carregar dados do demonstrativo:", error);
        }
        */

        // Utilizando dados de exemplo
        setEntradas(dadosPlaceholder.entradas);
        setSaidas(dadosPlaceholder.saidas);
        setSaldoAtual(dadosPlaceholder.saldoTotal);
        setMesAnteriorEntrada(dadosPlaceholder.mesAnteriorEntrada);
        setPercentualEntrada(dadosPlaceholder.percentualEntrada);
        setMesAnteriorSaida(dadosPlaceholder.mesAnteriorSaida);
        setPercentualSaida(dadosPlaceholder.percentualSaida);
        setTotalEntradaAtual(dadosPlaceholder.totalEntradaAtual); // Nova adição
        setTotalSaidaAtual(dadosPlaceholder.totalSaidaAtual); // Nova adição
    }, []);

    // Carregar dados para o mês atual ao iniciar a página
    useEffect(() => {
        carregarDados(mesSelecionado, anoSelecionado);
    }, [mesSelecionado, anoSelecionado, carregarDados]);

    // Configuração para os gráficos de entradas e saídas
    const dataEntradas = {
        labels: entradas.map(e => e.categoria),
        datasets: [
            {
                data: entradas.map(e => e.valor),
                backgroundColor: entradas.map(e => e.cor) // Cores customizáveis
            }
        ]
    };
    const dataSaidas = {
        labels: saidas.map(s => s.categoria),
        datasets: [
            {
                data: saidas.map(s => s.valor),
                backgroundColor: saidas.map(s => s.cor) // Cores customizáveis
            }
        ]
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
                        return `${label}: ${formatCurrency(value)}`; // Usando a formatação
                    }
                }
            }
        }
    };

    // Função para aplicar a seleção de mês/ano
    const handleAplicar = () => {
        carregarDados(mesSelecionado, anoSelecionado);
    };

    return (
        <div className="p-6 gap-4">
            {/* Dropdowns para selecionar mês e ano */}
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
            {/* Exibição do saldo atual formatado */}
            <div className="text-center bg-white rounded-lg shadow-md p-4">
                <h2 className="text-xl font-semibold">Saldo Atual</h2>
                <p className="text-2xl font-bold">{formatCurrency(saldoAtual)}</p>
            </div>

           {/* Gráficos de entradas e saídas */}
            <div className="flex justify-evenly mt-4 flex-wrap md:flex-nowrap gap-4 mb-8">
                <div className="bg-white rounded-lg shadow-md p-4 w-full md:w-1/2 max-w-md text-center">
                    <h2 className="text-xl font-semibold mb-2">Entradas - Total Atual: {formatCurrency(totalEntradaAtual)}</h2>
                    <div className="w-full max-h-96 flex justify-center items-center">
                        <Pie data={dataEntradas} options={options} />
                    </div>
                    <p className="mt-2">Total do mês anterior: {formatCurrency(mesAnteriorEntrada)}</p>
                    <p className="mt-2">Comparação com o mês anterior: {percentualEntrada}%</p>
                </div>
                <div className="bg-white rounded-lg shadow-md p-4 w-full md:w-1/2 max-w-md text-center">
                    <h2 className="text-xl font-semibold mb-2">Saídas - Total Atual: {formatCurrency(totalSaidaAtual)}</h2>
                    <div className="w-full max-h-96 flex justify-center items-center">
                        <Pie data={dataSaidas} options={options} />
                    </div>
                    <p className="mt-2">Total do mês anterior: {formatCurrency(mesAnteriorSaida)}</p>
                    <p className="mt-2">Comparação com o mês anterior: {percentualSaida}%</p>
                </div>
            </div>
        </div>
    );
};

export default Demonstrativo;
