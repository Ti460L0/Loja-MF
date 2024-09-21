<<<<<<< HEAD
import React from "react";
import CadastroForm from "./forms/ClienteForm";
import VestidosForm from "./forms/VestidosForm";
import AcessorioForm from "./forms/AcessorioForm";


const handleSubmit = () => {
  fetch("https://localhost:5000/api", {
    method: "GET",
  })
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(err => console.error(err));
}
=======
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import ClienteForm from "../forms/ClienteForm";
import VestidosForm from "../forms/VestidosForm";
import AcessorioForm from "../forms/AcessorioForm";
>>>>>>> c166009b94cd11e4a716056e2292294f3f734c5a

const Registrar = () => {
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
<<<<<<< HEAD
    <div className="flex flex-col max-w-7xl w-full mx-auto p-4 gap-4">
      <div className="bg-slate-800 p-4 w-full">
        <h2 className="text-xl font-bold text-center mb-4">Dados cliente</h2>
        <CadastroForm />
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
      <button className="bg-slate-800 p-4 w-full" onClick={() => {handleSubmit()}}>Registrar</button>
    </div>
=======
    <>
      <h1 className="text-2xl mb-4">Registrar: </h1>
      <ul>
        <li className="block mb-2">
          <button onClick={() => changeScreen("cliente")}>Registrar cliente 🙋‍♀️</button>
        </li>
        <li className="block mb-2">
          <button onClick={() => changeScreen("vestido")}>Registrar vestido 👗</button>
        </li>
        <li className="block mb-2">
          <button onClick={() => changeScreen("acessorio")}>Registrar acessorio 👑</button>
        </li>
      </ul>
      <div>{renderForm()}</div>
    </>
>>>>>>> c166009b94cd11e4a716056e2292294f3f734c5a
  );
};

<<<<<<< HEAD
export default Registrar;








=======
export default Registrar;
>>>>>>> adb7f2f0eb000970c9ce1056a91db96753e33a56
