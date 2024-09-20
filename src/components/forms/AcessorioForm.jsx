import React from 'react';

const AcessorioForm = () => {

  return (
    <form className="w-full text-nowrap bg-slate-600 shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div>
        <label htmlFor="tipo">Tipo:</label>
        <input type="text" id="tipo" name="tipo" />
      </div>
      <div>
        <label htmlFor="tamanho">Tamanho:</label>
        <input type="text" id="tamanho" name="tamanho" />
      </div>
      <div>
        <label htmlFor="cor">Cor:</label>
        <input type="text" id="cor" name="cor" />
      </div>
      <div>
        <label htmlFor="status">Status:</label>
        <input type="text" id="status" name="status" />
      </div>
    </form>
  );
}
export default AcessorioForm;


