import React, { useState, useEffect } from "react";
import VestidoConsulta from "./forms/consulta/VestidoConsulta";
import ClienteConsulta from "./forms/consulta/ClienteConsulta";
import AcessorioConsulta from "./forms/consulta/AcessorioConsulta";
import ClienteForm from "./forms/cadastro/ClienteForm";
import e from "cors";

const MainPage = () => {
  const [vestidoSelecionado, setVestidoSelecionado] = useState(null);
  const [clienteSelecionado, setClienteSelecionado] = useState(null);
  const [acessorioSelecionado, setAcessorioSelecionado] = useState(null);
  const [formData, setFormData] = useState({});
  const [modoCadastro, setModoCadastro] = useState(false);

  const handleVestidoSelect = (vestidoId) => {
    setVestidoSelecionado(vestidoId);
    console.log("Vestido selecionado:", vestidoId);
  };

  const handleAcessorioSelect = (acessorioId) => {
    setAcessorioSelecionado(acessorioId);
    console.log("Acessorio selecionado:", acessorioId);
  };

  const handleClienteSelect = (clienteId) => {
    setClienteSelecionado(clienteId);
    console.log("Cliente selecionado:", clienteId);
    if (!clienteId) {
      setModoCadastro(true);
    } else {
      setModoCadastro(false);
    }
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Formul rio submetido:", formData);
  };

  const setFieldValue = () => {
    if (vestidoSelecionado) formData.vestido_id = vestidoSelecionado;
    if (clienteSelecionado) formData.cliente_id = clienteSelecionado;
    if (acessorioSelecionado) formData.acessorio_id = acessorioSelecionado;
    console.log(vestidoSelecionado);
    console.log(acessorioSelecionado);
    console.log(clienteSelecionado);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-7xl mx-auto bg-slate-950 shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h1 className="text-4xl font-bold mb-4">Selecione as op es:</h1>
      <div className="flex flex-col w-full bg-slate-700 rounded-t">
        <div className="flex flex-row">
          <div className="flex flex-col w-1/2 p-4">
            <ClienteConsulta multiple={false} onSelect={handleClienteSelect} />
          </div>
          <div className="flex flex-col w-1/2 p-4">
            <VestidoConsulta multiple={false} onSelect={handleVestidoSelect} />
          </div>
          <div className="flex flex-col w-1/2 p-4">
            <AcessorioConsulta
              multiple={false}
              onSelect={handleAcessorioSelect}
            />
          </div>
        </div>
        <div>
          <button
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="button"
            onClick={setFieldValue}
          >
            Confirmar escolha
          </button>
        </div>
      </div>
      <div>
        {modoCadastro && clienteSelecionado === null && (
          <ClienteForm
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            modoCadastro={modoCadastro}
          />
        )}
      </div>
      <div className="flex flex-row justify-end gap-2 bg-slate-700 rounded-b p-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          type="submit"
          onClick={() => setModoCadastro(true)}
        >
          Novo Cliente
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          type="button"
          onClick={() => setModoCadastro(false)}
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default MainPage;
