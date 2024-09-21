import React from "react";
import CadastroForm from "./forms/ClienteForm";
import VestidosForm from "./forms/VestidosForm";
import AcessorioForm from "./forms/AcessorioForm";
import ClienteForm from "./forms/ClienteForm";
import { IconConfirm } from "../../styles/styles";

const handleSubmit = () => {
  fetch("https://localhost:5000/api", {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((err) => console.error(err));
};

const Registrar = () => {
  const handleSubmit = () => {
    console.log("Cadastro realizado!");
  };

  return (
    <div className="flex flex-col max-w-7xl w-full mx-auto p-4 gap-4">
      <h1 className="text-left text-4xl font-bold text-red-600 flex items-center gap-2">
        Registrar nova locação
      </h1>
      <div className="bg-slate-800 p-4 w-full">
        <h2 className="text-xl font-bold text-center mb-4">Dados cliente</h2>
        <ClienteForm />
      </div>
      <div className="grid grid-cols-2 bg-slate-800	 max-w-7xl w-full mx-auto p-4 gap-4">
        <div className="bg-slate-800 p-4 w-full">
          <h2 className="text-xl font-bold text-center mb-4">Dados Produto</h2>
          <VestidosForm />
        </div>
        <div className="bg-slate-800 p-4 w-full">
          <h2 className="text-xl font-bold text-center mb-4">Dados Produto</h2>
          <AcessorioForm />
        </div>
      </div>
      <button
        className="bg-slate-800 p-4 w-full"
        onClick={() => {
          handleSubmit();
        }}
      >
        Registrar
      </button>
    </div>
  );
};

export default Registrar;
