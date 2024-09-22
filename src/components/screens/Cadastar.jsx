import React, { useState } from "react";
import ClienteForm from "./forms/ClienteForm";
import VestidoForm from "./forms/VestidosForm";

const Cadastro = () => {
  // Dados iniciais para cliente e vestido
  const [clienteData, setClienteData] = useState({
    nome: "",
    cpf: "",
    email: "",
    telefone: "",
    endereco: "",
    cep: "",
    bairro: "",
  });

  const [vestidoData, setVestidoData] = useState({
    modelo: "",
    tamanho: "",
    cor: "",
    valor: "",
    status: "",
  });

  // Função para atualizar o formulário do cliente
  const handleClienteChange = (e) => {
    setClienteData({
      ...clienteData,
      [e.target.name]: e.target.value,
    });
  };

  // Função para atualizar o formulário do vestido
  const handleVestidoChange = (e) => {
    setVestidoData({
      ...vestidoData,
      [e.target.name]: e.target.value,
    });
  };

  // Função de envio para o formulário do cliente
  const handleClienteSubmit = async () => {
    try {
      const response = await fetch("http://ec2-18-216-195-241.us-east-2.compute.amazonaws.com:3000/clientes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(clienteData),
      });

      if (!response.ok) {
        throw new Error("Erro na requisição");
      }

      const data = await response.json();
      console.log("Sucesso (Cliente):", data);
    } catch (error) {
      console.error("Erro (Cliente):", error);
    }
  };

  // Função de envio para o formulário do vestido
  const handleVestidoSubmit = async () => {
    try {
      const response = await fetch("http://ec2-18-216-195-241.us-east-2.compute.amazonaws.com:3000/vestidos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(vestidoData),
      });

      if (!response.ok) {
        throw new Error("Erro na requisição");
      }

      const data = await response.json();
      console.log("Sucesso (Vestido):", data);
    } catch (error) {
      console.error("Erro (Vestido):", error);
    }
  };

  // Determina qual formulário será exibido e enviado
  const [screen, setScreen] = useState("cliente");

  const renderForm = () => {
    if (screen === "cliente") {
      return <ClienteForm handleChange={handleClienteChange} formData={clienteData} />;
    } else if (screen === "vestido") {
      return <VestidoForm handleChange={handleVestidoChange} formData={vestidoData} />;
    } else {
      return <p>Selecione uma opção</p>;
    }
  };

  // Função de envio unificada
  const handleSubmit = (e) => {
    e.preventDefault();
    if (screen === "cliente") {
      handleClienteSubmit();
    } else if (screen === "vestido") {
      handleVestidoSubmit();
    }
  };

  return (
    <>
      <h1>Menu</h1>
      <ul>
        <li>
          <button onClick={() => setScreen("cliente")}>
            Cadastrar cliente
          </button>
        </li>
        <li>
          <button onClick={() => setScreen("vestido")}>
            Cadastrar vestido
          </button>
        </li>
      </ul>

      {/* Renderização dos formulários */}
      <div>{renderForm()}</div>

      {/* Formulário de envio unificado */}
      <form onSubmit={handleSubmit}>
        <button className="bg-slate-800 p-4 w-full" type="submit">
          Enviar
        </button>
      </form>
    </>
  );
};

export default Cadastro;
