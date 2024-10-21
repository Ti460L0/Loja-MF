import React, { useState } from "react";

const Login = ({ onLogin, onRegister }) => {
  const [cpf, setCpf] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "ep-aged-tooth-a4xigwo7-pooler.us-east-1.aws.neon.tech/api/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ cpf, password }),
        }
      );

      const data = await response.json();
      setMessage(data.message || data.error);

      if (response.ok) {
        onLogin(); // Chama a função de login passada como props
      }
    } catch (error) {
      setMessage("Erro ao fazer login");
    }
  };

  return (
    <div className="flex flex-col w-80 rounded-md max-w-2xl p-8 bg-gradient-to-t from-yellow-400 to-yellow-800 border-2 border-gold shadow-lg shadow-black">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <hr className="mb-8 border-gray-950 border-1 "></hr>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gold-400"
          type="text"
          placeholder="Usuário"
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
          required
        />
        <input
          className=" p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gold-400"
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          className="bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded"
          type="submit"
        >
          Login
        </button>
      </form>
      <p className="text-black mt-4"><a href="#" className="text-black hover:underline">Esqueci a senha.</a></p>
      {message && <p className="text-black">{message}</p>}
    </div>
  );
};

export default Login;
