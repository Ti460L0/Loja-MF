import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import ClienteForm from "./forms/ClienteForm";
import VestidosForm from "./forms/VestidosForm";
import AcessorioForm from "./forms/AcessorioForm";

const Consultar = () => {
  const { valor } = useParams();
  const [screen, setScreen] = useState(valor);

  const changeScreen = (screen) => {
    setScreen(screen);
  };

  const renderForm = () => {
    if (screen === "cliente") {
      return <ClienteForm />;
    } else if (screen === "vestido") {
      return <VestidosForm />;
    } else if (screen === "acessorio") {
      return <AcessorioForm />;
    } else {
      return <p className="text-center">Selecione uma opção</p>;
    }
  };

  return (
    <>
      <h1 className="text-2xl mb-4">Consultar: </h1>
      <ul>
        <li className="block mb-2">
          <button onClick={() => changeScreen("cliente")}>Consultar cliente 🙋‍♀️</button>
        </li>
        <li className ="block mb-2">
          <button onClick={() => changeScreen("vestido")}>Consultar vestido 👗</button>
        </li>
        <li className="block mb-2">
          <button onClick={() => changeScreen("acessorio")}>Consultar acessorio 👑</button>
        </li>
      </ul>
      <div>{renderForm()}</div>
    </>
  );
};

export default Consultar;