import React, { useState, useEffect } from "react";

const VestidosForm = ({ handleChange, formData, handleImagemChange, modoCadastro }) => {
  const [codigo, setCodigo] = useState("");
  const [preview, setPreview] = useState("");

  const handleLocalImagemChange = (event) => {
    const file = event.target.files[0];
    handleImagemChange(file); // Passa o arquivo selecionado para o componente pai

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const gerarCodigo = () => {
    return Math.floor(1000 + Math.random() * 9000);
  };

  const verificarCodigoNoDB = async (codigoGerado) => {
    try {
      const response = await fetch(
        `http://ec2-18-216-195-241.us-east-2.compute.amazonaws.com:3000/api/ve?codigo=${codigoGerado}`
      );
      const data = await response.json();

      if (data.exists) {
        gerarCodigoAutomaticamente();
      } else {
        setCodigo(codigoGerado);
        handleChange({ target: { name: "codigo", value: codigoGerado } });
      }
    } catch (error) {
      console.error("Erro ao verificar código:", error);
    }
  };

  const gerarCodigoAutomaticamente = () => {
    const novoCodigo = gerarCodigo();
    verificarCodigoNoDB(novoCodigo);
  };

  useEffect(() => {
    if (modoCadastro) {
      gerarCodigoAutomaticamente();
    }
  }, [modoCadastro]);

  return (
    <form className="w-full text-nowrap rounded px-8 pt-6 pb-8 mb-4">
      <div className="mb-4">
        <label className="block text-left mb-2">Código:</label>
        <input
          type="text"
          id="codigo"
          name="codigo"
          value={codigo}
          onChange={handleChange}
          className="shadow appearance-none bg-white border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="mb-4">
        <label className="block text-left mb-2">Modelo:</label>
        <input
          type="text"
          id="modelo"
          name="modelo"
          value={formData.modelo}
          onChange={handleChange}
          className="shadow appearance-none bg-white border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="mb-4">
        <label className="block text-left mb-2">Tamanho:</label>
        <select
          id="tamanho"
          name="tamanho"
          value={formData.tamanho}
          onChange={handleChange}
          className="shadow appearance-none bg-white border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="">Selecione o tamanho</option>
          <option value="PP">PP</option>
          <option value="P">P</option>
          <option value="M">M</option>
          <option value="G">G</option>
          <option value="GG">GG</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-left mb-2">Cor:</label>
        <input
          type="text"
          id="cor"
          name="cor"
          value={formData.cor}
          onChange={handleChange}
          className="shadow appearance-none bg-white border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="mb-4">
        <label className="block text-left mb-2">Valor:</label>
        <input
          type="text"
          id="valor"
          name="valor"
          value={formData.valor}
          onChange={handleChange}
          className="shadow appearance-none bg-white border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="imageUpload">Escolha uma imagem:</label>
        <input type="file" accept="image/*" onChange={handleLocalImagemChange} />
      </div>

      {preview && (
        <div>
          <h3>Pré-visualização:</h3>
          <img src={preview} alt="Pré-visualização" style={{ maxWidth: "300px" }} />
        </div>
      )}
    </form>
  );
};

export default VestidosForm;
