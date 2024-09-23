import React, { useState } from "react";
import ClienteForm from "./forms/ClienteForm";
import VestidoForm from "./forms/VestidosForm";
import AcessorioForm from "./forms/AcessorioForm";
import e from "cors";

const Cadastro = () => {
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
  const [modoCadastro, setModoCadastro] = useState(false);
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
      console.error("Erro:", error);
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
          modoCadastro={modoCadastro}
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
      <h1 className="text-xl font-serif text-center m-2 p-4">Selecione uma opção</h1>
      <p style={{ display: screen ? "none" : "block" }}>Escolha uma opção</p>
      <div className="flex justify-center gap-4 m-2">
        <button
          className="bg-slate-800 p-4"
          onClick={() => setScreen("cliente")}
        >
          Cadastrar cliente
        </button>
        <button
          className="bg-slate-800 p-4"
          onClick={() => {
            setScreen("vestido");
            setModoCadastro(true);
          }}
        >
          Cadastrar vestido
        </button>
        <button
          className="bg-slate-800 p-4"
          onClick={() => setScreen("acessorio")}
        >
          Cadastrar acessório
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
              Limpar formulário
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Cadastro;
