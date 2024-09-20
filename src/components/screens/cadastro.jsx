import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import ClienteForm from "./forms/ClienteForm";
import VestidoForm from "./forms/VestidosForm";

const Cadastro = () => {
  const { valor } = useParams(); // Aqui está o useParams para capturar o parâmetro 'valor'
  const [screen, setScreen] = useState(valor); // Estado para controlar a tela

  const changeScreen = (screen) => {
    setScreen(screen); // Atualiza o estado com a tela selecionada
  };

  const renderForm = () => {
    if (screen === "cliente") {
      return <ClienteForm />;
    } else if (screen === "vestido") {
      return <VestidoForm />;
    } else {
      return <p>Selecione uma opção</p>;
    }
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
    </>
  );
};

export default Cadastro;
