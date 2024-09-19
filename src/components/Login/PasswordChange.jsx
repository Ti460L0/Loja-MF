import React, { useState } from "react";

const usuario = {
  cpf: "1234",
  dataNascimento: "01/01/2000",
};

const PasswordChange = ({ handleLogin }) => {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(""); // Estado para mensagens de sucesso
  const [cpf, setCPF] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simula a API de alteração de senha
    if (
      newPassword === confirmPassword &&
      cpf === usuario.cpf &&
      dataNascimento === usuario.dataNascimento
    ) {
      setSuccess("Senha alterada com sucesso!"); // Mensagem de sucesso
      setError(""); // Limpa mensagens de erro
      setPassword("");
      setNewPassword("");
      setConfirmPassword("");
      handleLogin(); // Chama a função para redirecionar ou atualizar o estado
    } else {
      setError("Preencha todos os campos corretamente"); // Mensagem de erro
      setSuccess(""); // Limpa mensagens de sucesso
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl font-bold">Alterar Senha</h1>
      <form onSubmit={handleSubmit} className="flex flex-col w-64">
        <label className="mt-4">
          CPF:
          <input
            className="border border-gray-300 rounded-lg p-2"
            type="text"
            value={cpf}
            onChange={(e) => setCPF(e.target.value)}
          />
        </label>
        <label className="mt-4">
          Data de Nascimento:
          <input
            className="border border-gray-300 rounded-lg p-2"
            type="date"
            value={dataNascimento}
            onChange={(e) => setDataNascimento(e.target.value)}
          />
        </label>
        <label className="mt-4">
          Nova Senha:
          <input
            className="border border-gray-300 rounded-lg p-2"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </label>
        <label className="mt-4">
          Confirmar Senha:
          <input
            className="border border-gray-300 rounded-lg p-2"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </label>
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}{" "}
        {/* Mensagem de sucesso */}
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
        >
          Alterar
        </button>
      </form>
    </div>
  );
};

export default PasswordChange;
