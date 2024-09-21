import React from 'react';

const VestidosForm = () => {
  return (
    <form className="w-full text-nowrap bg-slate-600 shadow-md rounded px-8 pt-6 pb-8 mb-4">
      
      {/* Código e Modelo */}
      <div className="flex flex-row justify-between mb-4 gap-4">
        <div className="flex flex-col grow">
          <label className="text-left" htmlFor="codigo">Código</label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-200 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            name="codigo"
            id="codigo"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-left" htmlFor="modelo">Modelo</label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-200 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            name="modelo"
            id="modelo"
          />
        </div>
      </div>

      {/* Tamanho e Cor */}
      <div className="flex justify-between mb-4 gap-4">
        <div className="flex flex-col grow">
          <label className="text-left" htmlFor="tamanho">Tamanho</label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-200 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            name="tamanho"
            id="tamanho"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-left" htmlFor="cor">Cor</label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-200 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            name="cor"
            id="cor"
          />
        </div>
      </div>

      {/* Status e Valor */}
      <div className="flex justify-between mb-4 gap-4">
        <div className="flex flex-col grow">
          <label className="text-left" htmlFor="status">Status</label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-200 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            name="status"
            id="status"
          />
        </div>
        <div className="flex flex-col grow">
          <label className="text-left" htmlFor="valor">Valor</label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-200 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            name="valor"
            id="valor"
          />
        </div>
      </div>

      <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
      Enviar
    </button>
    </form>
  );
};

export default VestidosForm;



