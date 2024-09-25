import React, { useState, useEffect } from "react";
import ClienteForm from "./forms/cadastro/ClienteForm";

const MainPage = () => {
  const [formData, setFormData] = useState({
    cliente_id: "",
    nome: "",
    email: "",
    telefone: "",
    cpf: "",
    cep: "",
    bairro: "",
    endereco: "",
  });
  const [clienteExists, setClienteExists] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const searchCliente = () => {
    if (formData.cpf.length === 11) {
      // Realiza a busca se o CPF tiver exatamente 11 dígitos
      try {
        fetch(`http://ec2-18-216-195-241.us-east-2.compute.amazonaws.com:3000/clientes?cpf=${formData.cpf}`)
          .then((response) => response.json())
          .then((data) => {
            if (data.length > 0) {
              setFormData({
                cliente_id: data[0].id,
                nome: data[0].nome,
                email: data[0].email,
                telefone: data[0].telefone,
                cpf: data[0].cpf,
                cep: data[0].cep,
                bairro: data[0].bairro,
                endereco: data[0].endereco,
              });
              setClienteExists(true);
            } else {
              // Se o cliente não for encontrado, mantém o CPF e permite preencher os outros campos
              setFormData({
                cliente_id: "",
                nome: "",
                email: "",
                telefone: "",
                cpf: formData.cpf, // Mantém o CPF no campo
                cep: "",
                bairro: "",
                endereco: "",
              });
              setClienteExists(false);
            }
          })
          .catch((error) => console.error("Erro ao buscar cliente:", error));
      } catch (error) {
        console.error("Erro:", error);
      }
    } else {
      // Reseta o formulário quando o CPF é apagado ou incompleto
      setClienteExists(false);
      setFormData({
        cliente_id: "",
        nome: "",
        email: "",
        telefone: "",
        cpf: formData.cpf, // Mantém o CPF no campo
        cep: "",
        bairro: "",
        endereco: "",
      });
    }
  };

  // Use useEffect para buscar o cliente quando o CPF tiver 11 dígitos
  useEffect(() => {
    if (formData.cpf.length === 11) {
      searchCliente();
    } else {
      setClienteExists(false);
    }
  }, [formData.cpf]);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Formulário enviado:", formData);
    // Adicione a lógica para cadastrar um novo cliente ou atualizar um existente
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-7xl mx-auto text-nowrap bg-slate-950 shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <form className="w-full text-nowrap bg-slate-800 shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
        <div className="flex flex-row justify-center mb-4">
          <label className="text-left mb-2 mr-2" htmlFor="cpf">
            CPF:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-200 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            id="cpf"
            name="cpf"
            value={formData.cpf}
            onChange={handleChange}
            placeholder="Digite o CPF (11 dígitos)"
          />
        </div>

        {/* Exibe o formulário do cliente se o CPF for encontrado */}
        {clienteExists ? (
          <>
            <ClienteForm formData={formData} handleChange={handleChange} />
            <div className="flex flex-row justify-end gap-2">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">
                Confirmar
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                type="button"
                onClick={() =>
                  setFormData({
                    cliente_id: "",
                    nome: "",
                    email: "",
                    telefone: "",
                    cpf: "",
                    cep: "",
                    bairro: "",
                    endereco: "",
                  })
                }
              >
                Cancelar
              </button>
            </div>
          </>
        ) : (
          // Exibe o formulário vazio se o cliente não for encontrado, para criar um novo cliente
          <>
            <ClienteForm formData={formData} handleChange={handleChange} />
            <p className="text-yellow-500">Cliente não encontrado. Preencha os dados para cadastrar um novo cliente.</p>
            <div className="flex flex-row justify-end gap-2">
              <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" type="submit">
                Cadastrar
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                type="button"
                onClick={() =>
                  setFormData({
                    cliente_id: "",
                    nome: "",
                    email: "",
                    telefone: "",
                    cpf: "",
                    cep: "",
                    bairro: "",
                    endereco: "",
                  })
                }
              >
                Cancelar
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default MainPage;
