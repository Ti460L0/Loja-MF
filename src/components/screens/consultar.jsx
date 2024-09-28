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
        <div className="mt-4 p-4 rounded">
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
    <div className="flex flex-col items-center justify-center w-full max-w-7xl mx-auto bg-lightBrown shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <p className="text-4xl font-bold mb-4 text-white" style={{ display: screen ? "none" : "block" }}>
        Escolha uma opção:{" "}
      </p>
      <div className="flex justify-center gap-4 m-2">
        <button
          className="bg-gold hover:bg-lightGold text-white font-bold py-2 px-4 rounded"
          onClick={() => setScreen("cliente")}
        >
          Consulta Cliente
        </button>
        <button
          className="bg-gold hover:bg-lightGold text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            setScreen("vestido");
          }}
        >
          Consulta Vestido
        </button>
        <button className="bg-gold hover:bg-lightGold text-white font-bold py-2 px-4 rounded" onClick={() => setScreen("acessorio")}>
          Consulta Acessório
        </button>
      </div>
      <div>{renderForm()}</div>
      {renderResultado()}
    </div>
  );
};

export default Consultar;
