import { useState } from "react";

const Login = ({ handleLogin }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === "") {
      setError("Por favor, digite sua senha.");
    } else if (password === 'admin') {
      handleLogin(true);  // Usa o prop handleLogin para passar o estado de login
    } else {
      setError("Senha incorreta.");
    }
  };

  return (
    <div className="w-72 bg-sky-950 border-4 border-yellow-600 rounded-lg shadow-lg p-8">
      <h2 className="text-2xl font-sans font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <input
            placeholder="Digite a senha de acesso"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border border-gray-300 rounded-lg p-2"
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
        >
          Entrar
        </button>
        <p>
          <a
            className="text-blue-500 hover:text-indigo-400 hover:underline cursor-pointer"
          >
            Esqueceu sua senha?
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;
