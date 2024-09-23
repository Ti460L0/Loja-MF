import React from "react";

import MainForm from "./forms/MainForm";


const handleOnChange = (event) => {
  const { name, value } = event.target;
  setFormData({ ...formData, [name]: value });
};


const Registrar = () => {
 

  return (

    <div className="flex flex-col max-w-full w-full mx-auto p-10 gap-4">
     <MainForm handleOnChange={handleOnChange}/>
      <button
        className="bg-slate-800 p-4 w-full"
        onClick={() => {
          handleSubmit();
        }}>
        Registrar
      </button>
    </div>
  );
};

export default Registrar;
