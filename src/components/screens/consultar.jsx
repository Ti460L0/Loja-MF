import React, { useState } from "react";
import ClienteForm from "../screens/forms/cadastro/ClienteForm";
import VestidosForm from "../screens/forms/cadastro/VestidosForm";
import AcessorioForm from "../screens/forms/cadastro/AcessorioForm"

const Consultar = () => {
  // Propriedades do formulário cliente
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

  // Propriedades do formulário vestido
  const [modoConsulta, setModoConsulta] = useState(false);
  const [vestidoData, setVestidoData] = useState({
    codigo: "",
    modelo: "",
    tamanho: "",
    cor: "",
    preco: "",
    quantidade: "",
  });

  // Propriedades do formulário acessorio
  const [acessorioData, setAcessorioData] = useState({
    tipo: "",
    tamanho: "",
    cor: "",
    status: "",
  });

  // Estado para armazenar dados retornados da consulta
  const [resultadoConsulta, setResultadoConsulta] = useState(null);

  // Função genérica para mudanças de estado
  const handleChange = (e, setData, data) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // Função genérica para submissão de dados
  const handleSubmit = async (e, url, data) => {
    e.preventDefault();
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("Erro na requisição");
      }

      const result = await response.json();
      setResultadoConsulta(result);  // Armazenar o resultado da consulta
      console.log("Sucesso:", result);
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  // Função para renderizar o formulário correto com base na tela selecionada
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
        <VestidosForm
          handleChange={(e) => handleChange(e, setVestidoData, vestidoData)}
          formData={vestidoData}
          modoCadastro={modoConsulta}
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

  // Função para renderizar os dados do resultado da consulta
  const renderResultado = () => {
    if (resultadoConsulta) {
      return (
        <div className="mt-4 bg-slate-800 p-4 rounded">
          <h3 className="font-bold">Resultado da Consulta:</h3>
          <pre className="text-white">{JSON.stringify(resultadoConsulta, null, 2)}</pre>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full text-nowrap bg-slate-600 shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <p className="text-center" style={{ display: screen ? "none" : "block" }}>Escolha uma opção: </p>
      <div className="flex justify-center gap-4 m-2">
        <button
          className="bg-slate-800 p-4"
          onClick={() => setScreen("cliente")}
        >
          Consulta Cliente
        </button>
        <button
          className="bg-slate-800 p-4"
          onClick={() => {
            setScreen("vestido");
            setModoConsulta(true);
          }}
        >
          Consulta Vestido
        </button>
        <button
          className="bg-slate-800"
          onClick={() => setScreen("acessorio")}
        >
          Consulta Acessório
        </button>
      </div>
      <div>{renderForm()}</div>
      {screen && (
        <form
          id="formSubmit"
          onSubmit={(e) => {
            if (screen === "cliente") {
              handleSubmit(
                e,
                "http://ec2-18-216-195-241.us-east-2.compute.amazonaws.com:3000/clientes",
                clienteData
              );
            } else if (screen === "vestido") {
              handleSubmit(
                e,
                "http://ec2-18-216-195-241.us-east-2.compute.amazonaws.com:3000/vestidos",
                vestidoData
              );
            } else if (screen === "acessorio") {
              handleSubmit(
                e,
                "http://ec2-18-216-195-241.us-east-2.compute.amazonaws.com:3000/acessorios",
                acessorioData
              );
            }
          }}
        >
          <div className="flex flex-row gap-4">
            <button className="bg-green-800 p-4 w-full" type="submit">
              Enviar
            </button>
            <button className="bg-yellow-500 text-black font-bold p-4 w-full" type="reset">
              Limpar formulário
            </button>
          </div>
        </form>
      )}
      {renderResultado()}
    </div>
  );
};

export default Consultar;
