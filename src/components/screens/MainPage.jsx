import React, { useState, useEffect } from "react";
import ClienteForm from "./forms/cadastro/ClienteForm";
import TabelaVestido from "./forms/consulta/VestidoConsulta";

const MainPage = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full max-w-7xl mx-auto text-nowrap bg-slate-950 shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <form className="w-full text-nowrap bg-slate-800 shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="flex flex-row justify-center mb-4">
          <label className="text-left mb-2 mr-2" htmlFor="cpf">
            CPF:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-200 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            id="cpf"
            name="cpf"
            placeholder="Digite o CPF (11 dígitos)"
          />
        </div>

        <ClienteForm />
        <div className="flex flex-row justify-center mb-4">
          <TabelaVestido />
        </div>
        <div className="flex flex-row justify-end gap-2">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Confirmar
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="button"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default MainPage;
