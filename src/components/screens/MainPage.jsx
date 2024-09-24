import React, { useState } from "react";
import ClienteForm from "./forms/cadastro/ClienteForm";
import VestidoTabela from "./forms/consulta/TabelaVestido";

const MainPage = () => {
  const [formData, setFormData] = useState({});

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-7xl mx-auto text-nowrap bg-slate-950 shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <form
        className="w-full text-nowrap bg-slate-800 shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit}
      >
        <ClienteForm formData={formData} handleChange={handleChange} />
        <div className="flex flex-row justify-between mb-4 gap-4">
          <VestidoTabela />
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
            type="submit"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default MainPage;
