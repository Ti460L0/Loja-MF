import React, { useState } from "react";

const ClienteForm = () => {
  const [formData, setFormData] = useState({
    nome: "",
    cpf: "",
    email: "",
    telefone: "",
    endereco: "",
    cep: "",
    bairro: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch("http://ec2-18-216-195-241.us-east-2.compute.amazonaws.com:3000/clientes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
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

  return (
    <form className="w-full text-nowrap bg-slate-600 shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
      
      <div className="flex flex-row justify-between mb-4 gap-4">
        <div className="flex flex-col grow">
          <label className="text-left" htmlFor="nome">Nome</label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-200 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            id="nome"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-left" htmlFor="cpf">CPF</label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-200 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            id="cpf"
            name="cpf"
            value={formData.cpf}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="flex justify-between mb-4 gap-4">
        <div className="flex flex-col grow">
          <label className="text-left" htmlFor="email">E-mail</label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-200 leading-tight focus:outline-none focus:shadow-outline"
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-left" htmlFor="telefone">Telefone</label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-200 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            id="telefone"
            name="telefone"
            value={formData.telefone}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="flex flex-col mb-4 gap-4">
        <div className="flex flex-col grow">
          <label className="text-left" htmlFor="endereco">Endereço</label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-200 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            id="endereco"
            name="endereco"
            value={formData.endereco}
            onChange={handleChange}
          />
        </div>

        <div className="flex justify-between gap-4">
          <div className="flex flex-col w-1/3">
            <label className="text-left" htmlFor="cep">CEP</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-200 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              id="cep"
              name="cep"
              value={formData.cep}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col grow">
            <label className="text-left" htmlFor="bairro">Bairro</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-200 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              id="bairro"
              name="bairro"
              value={formData.bairro}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
        Enviar
      </button>
    </form>
  );
};

export default ClienteForm;
