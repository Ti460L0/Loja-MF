import React from "react";
import AcessorioForm from "./forms/AcessorioForm.jsx";
import ClienteForm from "./forms/ClienteForm.jsx";
import VestidoForm from "./forms/VestidosForm.jsx";

const Registrar = () => {

  const [modoCadastro, setModoCadastro] = React.useState(true);

  const [formData, setFormData] = React.useState({
    cliente: {
      nome: "",
      cpf: "",
      email: "",
      telefone: "",
      endereco: "",
      bairro: "",
      cep: "",
    },
    vestido: {
      codigo: "",
      modelo: "",
      tamanho: "",
      cor: "",
      status: "",
      valor: "",
    },
    acessorio: {
      tipo: "",
      tamanho: "",
      cor: "",
      status: "",
    },
  });

  const handleOnChange = async (event, formType) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [formType]: {
        ...prevData[formType],
        [name]: value,
      },
    }));

    if (formType === "cliente" && name === "cpf" && value.length === 11) {
      // Realiza a busca no backend pelo CPF
      try {
        const response = await fetch(`/clientes/${value}`);
        if (response.ok) {
          const cliente = await response.json();
          setFormData((prevData) => ({
            ...prevData,
            cliente: {
              ...prevData.cliente,
              nome: cliente.nome || prevData.cliente.nome,
              cpf: cliente.cpf || prevData.cliente.cpf,
              email: cliente.email || prevData.cliente.email,
              telefone: cliente.telefone || prevData.cliente.telefone,
              endereco: cliente.endereco || prevData.cliente.endereco,
              bairro: cliente.bairro || prevData.cliente.bairro,
              cep: cliente.cep || prevData.cliente.cep,
            },
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("/registrar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        console.log("Registro realizado com sucesso!");
      } else {
        console.error("Erro ao registrar:", response.status);
      }
    } catch (error) {
      console.error("Erro ao registrar:", error);
    }
  };

  return (
    <div className="w-full text-nowrap bg-slate-600 shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <ClienteForm
        formData={formData.cliente}
        handleOnChange={(e) => handleOnChange(e, "cliente")}
      />
      <AcessorioForm
        formData={formData.acessorio}
        handleOnChange={(e) => handleOnChange(e, "acessorio")}
      />
      <VestidoForm
        formData={formData.vestido}
        modoCadastro={modoCadastro}
        handleOnChange={(e) => handleOnChange(e, "vestido")}
      />
      <button
        className="bg-slate-800 p-4 w-full"
        type="submit"
        onClick={handleSubmit}
      >
        Registrar
      </button>
    </div>
  );
};

export default Registrar;

