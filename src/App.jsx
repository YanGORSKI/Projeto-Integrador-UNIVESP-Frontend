// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home";
import Financeiro from "./pages/Financeiro/Financeiro";
import FluxoCaixaDemonstrativo from "./pages/Financeiro/FluxoCaixa/Demonstrativo";
import FluxoCaixaLancamentos from "./pages/Financeiro/FluxoCaixa/Lancamentos";

function App() {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<Navigate to="/home" />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/financeiro" element={<Financeiro />} />
                    <Route path="/financeiro/fluxo-caixa/demonstrativo" element={<FluxoCaixaDemonstrativo />} />
                    <Route path="/financeiro/fluxo-caixa/lancamentos" element={<FluxoCaixaLancamentos />} />
                </Routes>
            </Layout>
        </Router>
    );
}

export default App;
