import React from 'react';

const AcessorioForm = ({ formData, handleChange, handleSubmit }) => {
  
  return (
    <form className="w-full text-nowrap rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
      
      {/* Tipo e Tamanho */}
      <div className="flex flex-row justify-between mb-4 gap-4">
        <div className="flex flex-col grow">
          <label className="text-left mb-2" htmlFor="tipo">Tipo:</label>
          <input
            className="shadow appearance-none border rounded bg-white w-full py-2 px-3 text-slate-200 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            id="tipo"
            name="tipo"
            value={formData.tipo}
            onChange={handleChange}
            />
        </div>

        <div className="flex flex-col">
          <label className="text-left mb-2" htmlFor="tamanho">Tamanho:</label>
          <input
            className="shadow appearance-none border rounded bg-white w-full py-2 px-3 text-slate-200 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            id="tamanho"
            name="tamanho"
            value={formData.tamanho}
            onChange={handleChange}
            />
        </div>
      </div>

      {/* Cor e Status */}
      <div className="flex flex-row justify-between mb-4 gap-4"> 
        <div className="flex flex-col grow">
          <label className="text-left mb-2" htmlFor="cor">Cor:</label>
          <input
            className="shadow appearance-none border rounded bg-white w-full py-2 px-3 text-slate-200 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            id="cor"
            name="cor"
            value={formData.cor}
            onChange={handleChange}
            />
        </div>

        <div className= 'flex flex-col grow'>
          <label className=" text-left mb-2" htmlFor="status">Status:</label>
          <select
          className="shadow appearance-none border rounded bg-white w-full py-2 px-3 text-slate-950 leading-tight focus:outline-none focus:shadow-outline" 
          id="status" 
          name="status"
          value={formData.status}
          onChange={handleChange}>
            <option value="">Selecione o status</option>
            <option value="Disponível">Disponível</option>
            <option value="Alugado">Alugado</option>
            <option value="Em manutenção">Em manutenção</option>
          </select>
        </div>
      </div>
    </form>
  );
};

export default AcessorioForm;
