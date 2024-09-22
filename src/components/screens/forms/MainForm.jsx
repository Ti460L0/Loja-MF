import React from "react";

const MainForm = () => {
  return (
    <div className="">
      
       {/* Formulário Cliente*/}
      <form>
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

      <div className="">
      {/* Formulário Acessórios */}
      <form> 
        {/* Tipo */}
      <div className="mb-4">
        <label className="block text-left mb-2" htmlFor="tipo">Tipo:</label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-200 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          id="tipo"
          name="tipo"
        />
      </div>

      {/* Tamanho */}
      <div className="mb-4">
        <label className="block text-left mb-2" htmlFor="tamanho">Tamanho:</label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-200 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          id="tamanho"
          name="tamanho"
        />
      </div>

      {/* Cor */}
      <div className="mb-4">
        <label className="block text-left mb-2" htmlFor="cor">Cor:</label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-200 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          id="cor"
          name="cor"
        />
      </div>

      {/* Status */}
      <div className="mb-4">
        <label className="block text-left mb-2" htmlFor="status">Status:</label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-200 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          id="status"
          name="status"
        />
      </div>
      </form>

      {/* Formulário Vestidos */}
      <form>
        {/*Nome*/}
      <div className= 'mb-4'>
        <label className="block text-left mb-2">Código:</label>
        <input type="text" id="codigo" name="codigo" />
      </div>

      {/*Modelo*/}
      <div className= 'mb-4'>
        <label className="block text-left mb-2">Modelo:</label>
        <input type="text" id="modelo" name="modelo" />
      </div>

      {/*Tamanho*/}
      <div className= 'mb-4'>
        <label className="block text-left mb-2">Tamanho:</label>
        <select id="tamanho" name="tamanho">
          <option value="">Selecione o tamanho</option>
          <option value="PP">PP</option>
          <option value="P">P</option>
          <option value="M">M</option>
          <option value="G">G</option>
          <option value="GG">GG</option>
        </select>
      </div>

      {/*Cor*/}
      <div className= 'mb-4'>
        <label className="block text-left mb-2">Cor:</label>
        <input type="text" id="cor" name="cor" />
      </div>

      {/*Status*/}
      <div className= 'mb-4'>
        <label className="block text-left mb-2">Status:</label>
        <input type="text" id="status" name="status" />
      </div>

      {/*Valor*/}
      <div className= 'mb-4'>
        <label className="block text-left mb-2">Valor:</label>
        <input type="text" id="valor" name="valor" />
      </div>
      </form>
      </div>

    </div>
  );
};

export default MainForm;
