// src/App.jsx
import React from "react";
import { BrowserRouter as Routes } from 'react-router-dom';
import Layout from "./components/Layout";

function App() {
    return (
        <Layout>
          <Routes>
                    {/* <Route path="/admin" element={<Admin />} />
                    <Route path="/calendar" element={<Calendar />} />*/}
                    {/* Adicione outras rotas aqui */}
                </Routes>
            <div className="flex justify-center items-center h-full">
                <img src="/logoadra_verde.png" alt="Logo ADRA" className="max-w-sm md:max-w-lg" />
            </div>
        </Layout>
    );
}

export default App;
