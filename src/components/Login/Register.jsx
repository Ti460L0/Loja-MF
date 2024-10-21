import React, { useState } from 'react';

const Register = ({ onRegister }) => {
    const [cpf, setCpf] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://ec2-18-216-195-241.us-east-2.compute.amazonaws.com:3000/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ cpf, data_nascimento: dataNascimento, password }),
            });

            const data = await response.json();
            setMessage(data.message || data.error);
        } catch (error) {
            setMessage('Erro ao registrar usuário');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center bg-slate-950 rounded-md shadow-md p-8">
            <h2 className="text-2xl font-bold mb-4">Registro</h2>
            <form className="w-full" onSubmit={handleSubmit}>
                <div className="flex flex-col mb-4">
                    <label className="text-slate-300 mb-2" htmlFor="cpf">CPF</label>
                    <input
                        className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-400"
                        type="text"
                        id="cpf"
                        placeholder="CPF"
                        value={cpf}
                        onChange={(e) => setCpf(e.target.value)}
                        required
                    />
                </div>
                <div className="flex flex-col mb-4">
                    <label className="text-slate-300 mb-2" htmlFor="data_nascimento">Data de Nascimento</label>
                    <input
                        className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-400"
                        type="date"
                        id="data_nascimento"
                        placeholder="Data de Nascimento"
                        value={dataNascimento}
                        onChange={(e) => setDataNascimento(e.target.value)}
                        required
                    />
                </div>
                <div className="flex flex-col mb-4">
                    <label className="text-slate-300 mb-2" htmlFor="password">Senha</label>
                    <input
                        className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-400"
                        type="password"
                        id="password"
                        placeholder="Senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button
                    className="bg-sky-500 hover:bg-sky-600 text-white font-bold py-2 px-4 rounded-md"
                    type="submit"
                >
                    Registrar
                </button>
            </form>
            {message && <p className="text-red-500">{message}</p>}
            <button
                className="bg-sky-500 hover:bg-sky-600 text-white font-bold py-2 px-4 rounded-md mt-4"
                onClick={onRegister}
            >
                Voltar ao Login
            </button>
        </div>

    );
};

export default Register;
