import React from "react";

const MainForm = () => {
  return (
    <div className="flex flex-col max-w-full w-full mx-auto p-4 gap-4">
      <form>
        {/* Formulário Cliente*/}

        {/* Nome e CPF */}
        <div className="flex flex-row justify-between mb-4 gap-4">
          <div className="flex flex-col grow">
            <label className="text-left" htmlFor="nome">
              Nome
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-200 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              id="nome"
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
              id="cpf"
              name="cpf"
            />
          </div>
        </div>

        {/* Email e Telefone */}
        <div className="flex justify-between mb-4 gap-4">
          <div className="flex flex-col grow">
            <label className="text-left" htmlFor="email">
              E-mail
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-200 leading-tight focus:outline-none focus:shadow-outline"
              type="email"
              id="email"
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
              id="telefone"
              name="telefone"
            />
          </div>
        </div>

        {/* Endereço, CEP e Bairro */}
        <div className="flex flex-col mb-4 gap-4">
          <div className="flex flex-col grow">
            <label className="text-left" htmlFor="endereco">
              Endereço
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-200 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              id="endereco"
              name="endereco"
            />
          </div>

          {/* CEP e Bairro */}
          <div className="flex justify-between gap-4">
            <div className="flex flex-col w-1/3">
              {" "}
              {/* Ajuste do tamanho do CEP */}
              <label className="text-left" htmlFor="cep">
                CEP
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-200 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                id="cep"
                name="cep"
              />
            </div>
            <div className="flex flex-col grow">
              {" "}
              {/* Ajuste do tamanho do Bairro */}
              <label className="text-left" htmlFor="bairro">
                Bairro
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-200 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                id="bairro"
                name="bairro"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default MainForm;
