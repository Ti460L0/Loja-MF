import { useState } from "react";
import PasswordChange from "./PasswordChange";

const Login = ({ handleLogin }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPasswordChange, setShowPasswordChange] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Correct way to access environment variables in React
    const correctPassword = 'admin'; 

    if (password === correctPassword) {
      setError(
        <span style={{ color: "green" }}>
          Login efetuado com sucesso! Carregando o sistema.
        </span>
      );
      document.querySelector("input").disabled = true;
      setTimeout(() => {
        setError("");
        handleLogin(true);
      }, 3000);
    } else {
      setError("Credenciais inválidas. Tente novamente.");
    }
  };

  const handleChangePassword = () => {
    setShowPasswordChange(true);
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
            onClick={handleChangePassword}
          >
            Esqueceu sua senha?
          </a>
        </p>
      </form>
      {showPasswordChange && <PasswordChange handleLogin={handleLogin} />}
    </div>
  );
};

export default Login;
