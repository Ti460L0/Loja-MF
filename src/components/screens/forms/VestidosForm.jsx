import React from "react";

const VestidosForm = () => {
  return (
    <form className="w-full text-nowrap shadow-md rounded px-8 pt-6 pb-8 mb-4">
      
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
  );
};
export default VestidosForm;
