// src/pages/Login.jsx
import React, { useState } from 'react';
import axios from 'axios';
import logoAdra from '../assets/logoadra_verde.png'; // Coloque seu logo aqui

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [erro, setErro] = useState('');
    const [cadastrar, setCadastrar] = useState(false);
    const [novoUsuario, setNovoUsuario] = useState({
        username: '',
        senha: '',
        email: '',
        cargo: 'usuario'
    });

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/usuarios/login', { email, senha });
    
            if (response.data) { // <-- só verifica se tem dados
                const user = response.data; // <-- já é o usuário!
                localStorage.setItem('usuarioLogado', JSON.stringify(user));
                onLogin(user);
            } else {
                setErro('Usuário/senha não encontrado');
            }
        } catch (error) {
            console.error(error);
            setErro('Erro ao tentar fazer login');
        }
    };

    const handleCadastro = async () => {
        try {
            await axios.post('http://localhost:8080/api/usuarios/cadastrar', novoUsuario);
            alert('Usuário cadastrado com sucesso!');
            setCadastrar(false); // Fecha o modo de cadastro
        } catch (error) {
            console.error(error);
            setErro('Erro ao cadastrar usuário');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <img src={logoAdra} alt="Logo ADRA" className="w-48 mb-8" />

            {cadastrar ? (
                <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
                    <h2 className="text-2xl mb-4 text-center">Cadastrar</h2>
                    <input
                        type="text"
                        placeholder="Nome de usuário"
                        className="border p-2 mb-2 w-full"
                        value={novoUsuario.username}
                        onChange={(e) => setNovoUsuario({ ...novoUsuario, username: e.target.value })}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        className="border p-2 mb-2 w-full"
                        value={novoUsuario.email}
                        onChange={(e) => setNovoUsuario({ ...novoUsuario, email: e.target.value })}
                    />
                    <input
                        type="password"
                        placeholder="Senha"
                        className="border p-2 mb-2 w-full"
                        value={novoUsuario.senha}
                        onChange={(e) => setNovoUsuario({ ...novoUsuario, senha: e.target.value })}
                    />
                    <select
                        className="border p-2 mb-4 w-full"
                        value={novoUsuario.cargo}
                        onChange={(e) => setNovoUsuario({ ...novoUsuario, cargo: e.target.value })}
                    >
                        <option value="usuario">Usuário</option>
                        <option value="coordenacao">Coordenação</option>
                    </select>
                    <button onClick={handleCadastro} className="bg-green-600 text-white py-2 w-full rounded">
                        Cadastrar
                    </button>
                    <button onClick={() => setCadastrar(false)} className="text-blue-600 mt-2 w-full">
                        Voltar para Login
                    </button>
                    {erro && <p className="text-red-500 mt-2 text-center">{erro}</p>}
                </div>
            ) : (
                <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
                    <h2 className="text-2xl mb-4 text-center">Login</h2>
                    <input
                        type="email"
                        placeholder="Email"
                        className="border p-2 mb-2 w-full"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Senha"
                        className="border p-2 mb-4 w-full"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                    />
                    <button onClick={handleLogin} className="bg-green-600 text-white py-2 w-full rounded">
                        Entrar
                    </button>
                    <button onClick={() => setCadastrar(true)} className="text-blue-600 mt-2 w-full">
                        Cadastrar novo usuário
                    </button>
                    {erro && <p className="text-red-500 mt-2 text-center">{erro}</p>}
                </div>
            )}
        </div>
    );
};

export default Login;
