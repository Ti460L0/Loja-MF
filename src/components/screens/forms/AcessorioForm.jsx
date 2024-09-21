import React from 'react';

const AcessorioForm = (props) => {
  return (
    <form {...props.className} >
      
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
  );
};

export default AcessorioForm;
