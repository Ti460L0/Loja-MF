import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import ClienteForm from "./forms/ClienteForm";
import VestidoForm from "./forms/VestidosForm";

const Cadastro = () => {
  const { valor } = useParams();
  const [screen, setScreen] = useState(valor);

  const changeScreen = (screen) => {
    setScreen(screen);
  };

  const renderForm = () => {
    if (screen === "cliente") {
      return <ClienteForm />;
    } else if (screen === "vestido") {
      return <VestidoForm />;
    } else {
      return <p>Selecione uma op o</p>;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      nome: formData.get("nome"),
      cpf: formData.get("cpf"),
      dataNascimento: formData.get("dataNascimento"),
      email: formData.get("email"),
      telefone: formData.get("telefone"),
      cep: formData.get("cep"),
      logradouro: formData.get("endereco"),
      bairro: formData.get("bairro"),
    };
    console.log(screen, data);
  };

  return (
    <>
      <h1>Menu</h1>
      <ul>
        <li>
          <button onClick={() => changeScreen("cliente")}>
            Cadastrar cliente
          </button>
        </li>
        <li>
          <button onClick={() => changeScreen("vestido")}>
            Cadastrar vestido
          </button>
        </li>
      </ul>
      <div>{renderForm()}</div>

      <form onSubmit={handleSubmit}>
        <button className="bg-slate-800 p-4 w-full" type="submit">
          Enviar
        </button>
      </form>

    </>
  );
};

export default Cadastro;
