import React from "react";

const VestidosForm = ({ FormData, handleChange, handleSubmit }) => {

  return (
    <form className="w-full text-nowrap bg-slate-600 shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
      
      {/*Código e Modelo*/}
      <div className="flex flex-row justify-between mb-4 gap-4">
        <div className= 'flex flex-col grow'>
          <label className=" text-left mb-2" htmlFor="codigo">Código:</label>
          <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-200 leading-tight focus:outline-none focus:shadow-outline" 
          type="text"
          id="codigo"
          name="codigo"
          value={FormData.codigo}
          onChange={handleChange} 
          />
        </div>

        <div className= 'flex flex-col'>
          <label className=" text-left mb-2" htmlFor="modelo">Modelo:</label>
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
        <div className= 'flex flex-col grow'>
          <label className=" text-left mb-2" htmlFor="tamanho">Tamanho:</label>
          <select
          className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-200 leading-tight focus:outline-none focus:shadow-outline" 
          id="tamanho"
          name="tamanho"
          value={FormData.tamanho}
          onChange={handleChange}>
            <option value="">Selecione o tamanho</option>
            <option value="PP">PP</option>
            <option value="P">P</option>
            <option value="M">M</option>
            <option value="G">G</option>
            <option value="GG">GG</option>
          </select>
        </div>

        <div className= 'flex flex-col'>
          <label className=" text-left mb-2" htmlFor="cor">Cor:</label>
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
        <div className= 'flex flex-col grow'>
          <label className=" text-left mb-2" htmlFor="status">Status:</label>
          <select
          className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-200 leading-tight focus:outline-none focus:shadow-outline" 
          id="status"
          name="status"
          value={FormData.status}
          onChange={handleChange}>
            <option value="">Selecione o status</option>
            <option value="PP">Disponível</option>
            <option value="P">Alugado</option>
            <option value="M">Em manutenção</option>
          </select>
        </div>

        {/*Valor*/}
        <div className= 'flex flex-col'>
          <label className="text-left mb-2" htmlFor="valor">Valor:</label>
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
  );
};
export default VestidosForm;
