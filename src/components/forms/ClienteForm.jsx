import React from "react";

const ClienteForm = () => {
  return (
    <form className="w-full text-nowrap bg-slate-600 shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div className="flex flex-row justify-between mb-4 gap-4">
        <div className="flex flex-col grow">
          <label className="text-left" htmlFor="nome">
            Nome
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-200 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            name="nome"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-left" htmlFor="cpf">
            CPF
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-200 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            name="cpf"
          />
        </div>
      </div>

      <div className="flex justify-between mb-4 gap-4">
        <div className="flex flex-col grow">
          <label className="text-left" htmlFor="email">
            E-mail
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-200 leading-tight focus:outline-none focus:shadow-outline"
            type="email"
            name="email"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-left" htmlFor="telefone">
            Telefone
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-200 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            name="telefone"
          />
        </div>
      </div>

      <div className="flex justify-between mb-4 gap-4">
        <div className="flex flex-col grow">
          <label className="text-left" htmlFor="endereco">
            Endereço
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-200 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            name="endereco"
          />

          <div className="flex flex-col">
            <label className="flex float-start" htmlFor="cep">
              CEP
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-200 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name="cep"
            />
          </div>
        </div>
        <div className="flex flex-row mb-4 gap-4">
          <div className="flex flex-col">
            <label className="flex float-start" htmlFor="bairro">
              Bairro
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-200 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name="bairro"
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default ClienteForm;
