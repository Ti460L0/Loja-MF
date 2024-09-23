import React from "react";

import MainForm from "./forms/MainForm";
import RegistrarForm from "./forms/RegistarForm";

const Registrar = () => {
  const [formData, setFormData] = React.useState({
    nome: "",
    cpf: "",
    email: "",
    senha: "",
  });

  const handleOnChange = async (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });

    if (name === "cpf" && value.length === 11) {
      // Realiza a busca no backend pelo CPF
      try {
        const response = await fetch(`/clientes/${value}`);
        if (response.ok) {
          const cliente = await response.json();
          setFormData((prevData) => ({
            ...prevData,
            nome: cliente.nome || prevData.nome,
            cpf: cliente.cpf || prevData.cpf,
            email: cliente.email || prevData.email,
            // preencha os outros campos com os dados retornados ou mantenha os valores atuais
          }));
        } else {
          // Cliente não encontrado, permite preenchimento manual
          console.log("Cliente não encontrado, pode ser registrado um novo.");
        }
      } catch (error) {
        console.error("Erro ao buscar cliente:", error);
      }
    }
  };

  return (
    <div className="flex flex-col max-w-full w-full mx-auto p-10 gap-4">
      {/* <MainForm handleOnChange={handleOnChange} formData={formData} /> */}
      <RegistrarForm formData={formData} handleOnChange={handleOnChange} />
      <button className="bg-slate-800 p-4 w-full">Registrar</button>
    </div>
  );
};

export default Registrar;
