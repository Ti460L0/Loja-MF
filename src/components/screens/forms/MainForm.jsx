import React from "react";

const MainForm = (formData, handleChange, handleSubmit) => {
  return (
    <div className="">
      {/* Formulário Cliente*/}
      <form onSubmit={handleSubmit}>
        {/* Nome e CPF */}
        <div className="flex flex-row justify-between mb-4 gap-4">
          <div className="flex flex-col grow">
            <label className="text-left mb-2" htmlFor="nome">
              Nome
            </label>
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
            <label className="text-left mb-2" htmlFor="cpf">
              CPF
            </label>
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

        {/* E-mail e Telefone */}
        <div className="flex justify-between mb-4 gap-4">
          <div className="flex flex-col grow">
            <label className="text-left mb-2" htmlFor="email">
              E-mail
            </label>
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
            <label className="text-left mb-2" htmlFor="telefone">
              Telefone
            </label>
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

        {/* Endereço, CEP e Bairro */}
        <div className="flex flex-col mb-4 gap-4">
          <div className="flex flex-col grow">
            <label className="text-left mb-2" htmlFor="endereco">
              Endereço
            </label>
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
              <label className="text-left mb-2" htmlFor="cep">
                CEP
              </label>
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
              <label className="text-left mb-2" htmlFor="bairro">
                Bairro
              </label>
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

      {/* Formulário Acessórios */}
      <form>
        {/* Tipo e Tamanho */}
        <div className="flex flex-row justify-between mb-4 gap-4">
          <div className="flex flex-col grow">
            <label className="text-left mb-2" htmlFor="tipo">
              Tipo:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-200 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              id="tipo"
              name="tipo"
              value={FormData.tipo}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-left mb-2" htmlFor="tamanho">
              Tamanho:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-200 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              id="tamanho"
              name="tamanho"
              value={FormData.tamanho}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Cor e Status */}
        <div className="flex flex-row justify-between mb-4 gap-4">
          <div className="flex flex-col grow">
            <label className="text-left mb-2" htmlFor="cor">
              Cor:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-200 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              id="cor"
              name="cor"
              value={FormData.cor}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col grow">
            <label className=" text-left mb-2" htmlFor="status">
              Status:
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-200 leading-tight focus:outline-none focus:shadow-outline"
              id="status"
              name="status"
              value={FormData.status}
              onChange={handleChange}
            >
              <option value="">Selecione o status</option>
              <option value="PP">Disponível</option>
              <option value="P">Alugado</option>
              <option value="M">Em manutenção</option>
            </select>
          </div>
        </div>
      </form>

      {/* Formulário Vestidos */}
      <form>
        {/*Código e Modelo*/}
        <div className="flex flex-row justify-between mb-4 gap-4">
          <div className="flex flex-col grow">
            <label className=" text-left mb-2" htmlFor="codigo">
              Código:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-200 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              id="codigo"
              name="codigo"
              value={FormData.codigo}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col">
            <label className=" text-left mb-2" htmlFor="modelo">
              Modelo:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-200 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              id="modelo"
              name="modelo"
              value={FormData.modelo}
              onChange={handleChange}
            />
          </div>
        </div>

        {/*Tamanho e Cor*/}
        <div className="flex flex-row justify-between mb-4 gap-4">
          <div className="flex flex-col grow">
            <label className=" text-left mb-2" htmlFor="tamanho">
              Tamanho:
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-200 leading-tight focus:outline-none focus:shadow-outline"
              id="tamanho"
              name="tamanho"
              value={FormData.tamanho}
              onChange={handleChange}
            >
              <option value="">Selecione o tamanho</option>
              <option value="PP">PP</option>
              <option value="P">P</option>
              <option value="M">M</option>
              <option value="G">G</option>
              <option value="GG">GG</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className=" text-left mb-2" htmlFor="cor">
              Cor:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-200 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              id="cor"
              name="cor"
              value={FormData.cor}
              onChange={handleChange}
            />
          </div>
        </div>

        {/*Status e Valor*/}
        <div className="flex flex-row justify-between mb-4 gap-4">
          <div className="flex flex-col grow">
            <label className=" text-left mb-2" htmlFor="status">
              Status:
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-200 leading-tight focus:outline-none focus:shadow-outline"
              id="status"
              name="status"
              value={FormData.status}
              onChange={handleChange}
            >
              <option value="">Selecione o status</option>
              <option value="PP">Disponível</option>
              <option value="P">Alugado</option>
              <option value="M">Em manutenção</option>
            </select>
          </div>

          {/*Valor*/}
          <div className="flex flex-col">
            <label className="text-left mb-2" htmlFor="valor">
              Valor:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-200 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              id="valor"
              name="valor"
              value={FormData.valor}
              onChange={handleChange}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default MainForm;
