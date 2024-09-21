import React from "react";

import MainForm from "./forms/MainForm";

// const handleSubmit = () => {
//   fetch("https://localhost:5000/api", {
//     method: "GET",
//   })
//     .then((response) => response.json())
//     .then((data) => console.log(data))
//     .catch((err) => console.error(err));
// };

const Registrar = () => {
  // const handleSubmit = () => {
  //   console.log("Cadastro realizado!");
  // };

  return (
    <div className="flex flex-col max-w-full w-full mx-auto p-4 gap-4">
     <MainForm/>
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
