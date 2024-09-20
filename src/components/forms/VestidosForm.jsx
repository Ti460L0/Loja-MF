import React from 'react';

const VestidosForm = () => {

  return (
    <form className="w-full text-nowrap bg-slate-600 shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div>
        <label htmlFor="codigo">Código:</label>
        <input type="text" id="codigo" name="codigo" />
      </div>
      <div>
        <label htmlFor="modelo">Modelo:</label>
        <input type="text" id="modelo" name="modelo" />
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
      <div>
        <label htmlFor="valor">Valor:</label>
        <input type="text" id="valor" name="valor" />
      </div>
    </form>
  );
}
export default VestidosForm;


