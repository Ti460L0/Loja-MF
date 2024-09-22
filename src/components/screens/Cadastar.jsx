import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import ClienteForm from "./forms/ClienteForm";
import VestidoForm from "./forms/VestidosForm";

const Cadastro = () => {
  
  
  // Tratando dados do fomulário CLIENTE

  const [clienteData, setClienteData] = useState({
    nome: "",
    cpf: "",
    email: "",
    telefone: "",
    endereco: "",
    cep: "",
    bairro: ""
  });

  const handleClienteChange = (e) => {
    setClienteData({
      ...clienteData,
      [e.target.name]: e.target.value,
    });
  };

  const handleClienteSubmit = async (e) => {
    e.preventDefault();
    
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
      console.log("Sucesso:", data);
    } catch (error) {
      console.error("Erro:", error);
    }
  };

// Renderizando os formulários conforme escolha.

  const [screen, setScreen] = useState("cliente");
  const changeScreen = (screen) => {
    setScreen(screen);
  };

  const renderForm = () => {
    if (screen === "cliente") {
      return <ClienteForm handleChange={handleClienteChange} formData={clienteData}/>;
    } else if (screen === "vestido") {
      return <VestidoForm />;
    } else {
      return <p>Selecione uma opção</p>;
    }
  };


  return (
    <>
      <h1>Menu</h1>
      <ul>
        <li>
          <button onClick={() => changeScreen("cliente")}>
            Cadastrar cliente
          </button>
        </li>
        <li>
          <button onClick={() => changeScreen("vestido")}>
            Cadastrar vestido
          </button>
        </li>
      </ul>
      <div>{renderForm()}</div>

      <form onSubmit={handleClienteSubmit}>
        <button className="bg-slate-800 p-4 w-full" type="submit">
          Enviar
        </button>
      </form>

    </>
  );
};

export default Cadastro;
