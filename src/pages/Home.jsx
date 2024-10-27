// src/pages/Home.jsx
import React from "react";

const Home = () => {
    return (
        <div className="text-center h-full flex flex-col items-center pt-10">
            <h1 className="text-4xl font-bold mb-6">Sistema Interno</h1>
            <img 
                src="/logoadra_verde.png" 
                alt="Logo da Adra" 
                className="max-w-full max-h-full object-contain" 
                style={{ maxHeight: '70vh', maxWidth: '70vw' }} // Limita a altura e largura máxima da imagem
            />
        </div>
    );
};

export default Home;
