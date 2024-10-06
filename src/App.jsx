// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Financeiro from "./pages/Financeiro";
/* import LivroCaixa from "./pages/LivroCaixa"; // Adicione a página para Livro Caixa
import Estoque from "./pages/Estoque"; // Adicione a página para Estoque */

function App() {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<Navigate to="/home" />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/financeiro" element={<Financeiro />} />
                    {/* <Route path="/livro-caixa" element={<LivroCaixa />} />
                    <Route path="/estoque" element={<Estoque />} /> */}
                </Routes>
            </Layout>
        </Router>
    );
}

export default App;
