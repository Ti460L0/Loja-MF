import React, { useState } from "react";
import ClienteForm from "./forms/ClienteForm";
import VestidoForm from "./forms/VestidosForm";
import AcessorioForm from "./forms/AcessorioForm";

const Cadastro = () => {

  // Tratando os dados dos formulários
  const [screen, setScreen] = useState("");
  const [clienteData, setClienteData] = useState({
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

      const result = await response.json();
      console.log("Sucesso:", result);
    } catch (error) {
      console.error("Erro (Vestido):", error);
    }
  };

  const renderForm = () => {
    if (screen === "cliente") {
      return (
        <ClienteForm 
          handleChange={(e) => handleChange(e, setClienteData, clienteData)} 
          formData={clienteData} 
        />
      );
    } else if (screen === "vestido") {
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

  return (
    <div className="w-full text-nowrap bg-slate-600 shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h1>Menu</h1>
      <p style={{display: screen ? "none" : "block" }}>Escolha uma opção</p>
      <ul>
        <li>
          <button className="bg-slate-800 mb-2 p-4 w-full" onClick={() => setScreen("cliente")}>
            Cadastrar cliente
          </button>
        </li>
        <li>
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
