import React from "react";

const ClienteForm = ({ formData, handleChange, handleSubmit }) => {

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
    </form>
  );
};

export default ClienteForm;
