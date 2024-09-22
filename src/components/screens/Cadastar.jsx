import React, { useState } from "react";
import ClienteForm from "./forms/ClienteForm";
import VestidoForm from "./forms/VestidosForm";
import AcessorioForm from "./forms/AcessorioForm";

const Cadastro = () => {
  // Dados iniciais para cliente e vestido

  // Tratando os dados dos formulários
  const [screen, setScreen] = useState("");
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
    nome: "", cpf: "", email: "", telefone: "", endereco: "", cep: "", bairro: ""
  });

  const [vestidoData, setVestidoData] = useState({
    codigo: "", modelo: "", tamanho: "", cor: "", preco: "", quantidade: ""
  });

  const [acessorioData, setAcessorioData] = useState({
    tipo: "", tamanho: "", cor: "", status: ""
  });

  // Função genérica para mudanças de estado
  const handleChange = (e, setData, data) => {
    setData({ ...data, [e.target.name]: e.target.value });
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
  // Função genérica para submissão de dados
  const handleSubmit = async (e, url, data) => {
    e.preventDefault();
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Erro na requisição");
      }

      const data = await response.json();
      console.log("Sucesso (Cliente):", data);
      const result = await response.json();
      console.log("Sucesso:", result);
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

  const renderForm = () => {
    if (screen === "cliente") {
      return <ClienteForm handleChange={handleClienteChange} formData={clienteData} />;
      return (
        <ClienteForm 
          handleChange={(e) => handleChange(e, setClienteData, clienteData)} 
          formData={clienteData} 
        />
      );
    } else if (screen === "vestido") {
      return <VestidoForm handleChange={handleVestidoChange} formData={vestidoData} />;
    } else {
      return <p>Selecione uma opção</p>;
      return (
        <VestidoForm 
          handleChange={(e) => handleChange(e, setVestidoData, vestidoData)} 
          formData={vestidoData} 
        />
      );
    } else if (screen === "acessorio") {
      return (
        <AcessorioForm 
          handleChange={(e) => handleChange(e, setAcessorioData, acessorioData)} 
          formData={acessorioData} 
        />
      );
    }
    return null;
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
    <div className="w-full text-nowrap bg-slate-600 shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h1>Menu</h1>
      <p style={{display: screen ? "none" : "block" }}>Escolha uma opção</p>
      <ul>
        <li>
          <button onClick={() => setScreen("cliente")}>
          <button className="bg-slate-800 mb-2 p-4 w-full" onClick={() => setScreen("cliente")}>
            Cadastrar cliente
          </button>
        </li>
        <li>
          <button onClick={() => setScreen("vestido")}>
          <button className="bg-slate-800 mb-2 p-4 w-full" onClick={() => setScreen("vestido")}>
            Cadastrar vestido
          </button>
        </li>
        <li>
          <button className="bg-slate-800 mb-2 p-4 w-full" onClick={() => setScreen("acessorio")}>
            Cadastrar acessório
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
      {screen && (
        <form
          id="formSubmit"
          onSubmit={(e) => {
            if (screen === "cliente") {
              handleSubmit(e, "http://ec2-18-216-195-241.us-east-2.compute.amazonaws.com:3000/clientes", clienteData);
            } else if (screen === "vestido") {
              handleSubmit(e, "http://ec2-18-216-195-241.us-east-2.compute.amazonaws.com:3000/vestidos", vestidoData);
            } else if (screen === "acessorio") {
              handleSubmit(e, "http://ec2-18-216-195-241.us-east-2.compute.amazonaws.com:3000/acessorios", acessorioData);
            }
          }}
        >
          <button className="bg-slate-800 p-4 w-full" type="submit">
            Enviar
          </button>
        </form>
      )}
    </div>
  );
};

export default Cadastro;
