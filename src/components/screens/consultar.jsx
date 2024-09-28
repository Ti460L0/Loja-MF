import React, { useState } from "react";
import TabelaClienteConsulta from "./forms/consulta/TabelaClienteConsulta";
import TabelaVestidoConsulta from "./forms/consulta/TabelaVestidoConsulta";
import TabelaAcessorioConsulta from "./forms/consulta/TabelaAcessorioConsulta";

const Consultar = () => {
  const [screen, setScreen] = useState(null);
  const [search, setSearch] = useState("");
  const [resultadoConsulta, setResultadoConsulta] = useState(null);

  // Função para renderizar o formulário correto com base na tela selecionada
  const renderForm = () => {
    if (screen === "cliente") {
      return <TabelaClienteConsulta />;
    } else if (screen === "vestido") {
      return <TabelaVestidoConsulta />;
    } else if (screen === "acessorio") {
      return <TabelaAcessorioConsulta />;
    }
    return null;
  };

  // Função para renderizar os dados do resultado da consulta
  const renderResultado = () => {
    if (resultadoConsulta) {
      return (
        <div className="mt-4 bg-slate-800 p-4 rounded">
          <h3 className="font-bold">Resultado da Consulta:</h3>
          <pre className="text-white">
            {JSON.stringify(resultadoConsulta, null, 2)}
          </pre>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full text-nowrap bg-slate-600 shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <p className="text-center" style={{ display: screen ? "none" : "block" }}>
        Escolha uma opção:{" "}
      </p>
      <div className="flex justify-center gap-4 m-2">
        <button
          className="bg-slate-800 p-4"
          onClick={() => setScreen("cliente")}
        >
          Consulta Cliente
        </button>
        <button
          className="bg-slate-800 p-4"
          onClick={() => {
            setScreen("vestido");
          }}
        >
          Consulta Vestido
        </button>
        <button className="bg-slate-800" onClick={() => setScreen("acessorio")}>
          Consulta Acessório
        </button>
      </div>
      <div>{renderForm()}</div>
      {renderResultado()}
    </div>
  );
};

export default Consultar;
