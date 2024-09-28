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
        <div>
            <h2>Registro</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="CPF"
                    value={cpf}
                    onChange={(e) => setCpf(e.target.value)}
                    required
                />
                <input
                    type="date"
                    placeholder="Data de Nascimento"
                    value={dataNascimento}
                    onChange={(e) => setDataNascimento(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Registrar</button>
            </form>
            {message && <p>{message}</p>}
            <button onClick={onRegister}>Voltar ao Login</button> {/* Botão para voltar ao login */}
        </div>
    );
};

export default Register;
