// src/App.jsx
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home";
import Financeiro from "./pages/Financeiro/Financeiro";
import FluxoCaixaDemonstrativo from "./pages/Financeiro/FluxoCaixa/Demonstrativo";
import FluxoCaixaLancamentos from "./pages/Financeiro/FluxoCaixa/Lancamentos";
import Login from "./pages/Login";

function App() {
    const [usuarioLogado, setUsuarioLogado] = useState(null);

    // Pega usuário do localStorage assim que o App carregar
    useEffect(() => {
        const usuarioSalvo = localStorage.getItem('usuarioLogado');
        if (usuarioSalvo) {
            setUsuarioLogado(JSON.parse(usuarioSalvo));
        }
    }, []);

    return (
        <Router>
            {usuarioLogado ? (
                <Layout>
                    <Routes>
                        <Route path="/" element={<Navigate to="/home" replace />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/financeiro" element={<Financeiro />} />
                        <Route path="/financeiro/fluxo-caixa/demonstrativo" element={<FluxoCaixaDemonstrativo />} />
                        <Route path="/financeiro/fluxo-caixa/lancamentos" element={<FluxoCaixaLancamentos />} />
                    </Routes>
                </Layout>
            ) : (
                <Routes>
                    <Route path="*" element={<Login onLogin={setUsuarioLogado} />} />
                </Routes>
            )}
        </Router>
    );
}

export default App;
