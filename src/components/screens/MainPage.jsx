import React, { useState, useEffect } from "react";
import VestidoConsulta from "./forms/consulta/VestidoConsulta";
import ClienteConsulta from "./forms/consulta/ClienteConsulta";
import AcessorioConsulta from "./forms/consulta/AcessorioConsulta";

const MainPage = () => {
  const [vestidoSelecionado, setVestidoSelecionado] = useState(null);
  const [clienteSelecionado, setClienteSelecionado] = useState(null);

  const handleVestidoSelect = (vestidoId) => {
    setVestidoSelecionado(vestidoId);
    console.log("Vestido selecionado:", vestidoId);
  };

  const handleClienteSelect = (clienteId) => {
    setClienteSelecionado(clienteId);
    console.log("Cliente selecionado:", clienteId);
  };

  return (

    <div className="flex flex-col items-center justify-center w-full max-w-7xl mx-auto bg-slate-950 shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h1 className="text-4xl font-bold mb-4">Sele o de Cliente e Vestido</h1>
      <div className="flex flex-row w-full justify-between bg-slate-700 rounded-t">
        <div className="flex flex-col w-1/2 p-4">
          <ClienteConsulta multiple={false} onSelect={handleClienteSelect} />
        </div>
        <div className="flex flex-col w-1/2 p-4">
          <VestidoConsulta multiple={false} onSelect={handleVestidoSelect} />
        </div>
        <div className="flex flex-col w-1/2 p-4">
          <AcessorioConsulta multiple={false} onSelect={handleVestidoSelect} />
        </div>
      </div>
      <div className="flex flex-row justify-end gap-2 bg-slate-700 rounded-b p-4">
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
    </div>
  );
};

export default MainPage;
