import React, { useState } from 'react';

const Login = ({ onLogin, onRegister }) => {
    const [cpf, setCpf] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://ec2-18-216-195-241.us-east-2.compute.amazonaws.com:3000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ cpf, password }),
            });

            const data = await response.json();
            setMessage(data.message || data.error);

            if (response.ok) {
                onLogin(); // Chama a função de login passada como props
            }
        } catch (error) {
            setMessage('Erro ao fazer login');
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="CPF"
                    value={cpf}
                    onChange={(e) => setCpf(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
            </form>
            {message && <p>{message}</p>}
            <button onClick={onRegister}>Registrar</button> {/* Botão para ir para a tela de registro */}
        </div>
    );
};

export default Login;
