import React from "react";

const VestidosForm = () => {
  return (
    <form className="w-full text-nowrap bg-slate-600 shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div className="flex flex-col">
        <label className="text-left">Código:</label>
        <input type="text" id="codigo" name="codigo" />
      </div>
      <div className="flex flex-col">
        <label className="text-left">Modelo:</label>
        <input type="text" id="modelo" name="modelo" />
      </div>
      <div className="flex flex-col">
        <label className="text-left">Tamanho:</label>
        <select id="tamanho" name="tamanho">
          <option value="">Selecione o tamanho</option>
          <option value="PP">PP</option>
          <option value="P">P</option>
          <option value="M">M</option>
          <option value="G">G</option>
          <option value="GG">GG</option>
        </select>
      </div>
      <div className="flex flex-col">
        <label className="text-left">Cor:</label>
        <input type="text" id="cor" name="cor" />
      </div>
      <div className="flex flex-col">
        <label className="text-left">Status:</label>
        <input type="text" id="status" name="status" />
      </div>
      <div className="flex flex-col">
        <label className="text-left">Valor:</label>
        <input type="text" id="valor" name="valor" />
      </div>
    </form>
  );
};
export default VestidosForm;
