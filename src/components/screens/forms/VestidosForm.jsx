import React, { useState, useEffect } from "react";

const VestidosForm = ({ handleChange, formData, handleSubmit, modoCadastro }) => {
  const [codigo, setCodigo] = useState("");

  // Função para gerar um código aleatório
  const gerarCodigo = () => {
    return Math.floor(1000 + Math.random() * 9000); // Exemplo: VST-1234
  };

  // Função para verificar se o código já existe no banco de dados
  const verificarCodigoNoDB = async (codigoGerado) => {
    try {
      const response = await fetch(`http://ec2-18-216-195-241.us-east-2.compute.amazonaws.com:3000/vestidos?codigo=${codigoGerado}`);
      const data = await response.json();
      
      // Se o código já existir, gerar outro
      if (data.exists) {
        gerarCodigoAutomaticamente();
      } else {
        setCodigo(codigoGerado); // Se não existir, usamos este código
        handleChange({ target: { name: "codigo", value: codigoGerado } }); // Atualiza o estado do formulário
      }
    } catch (error) {
      console.error("Erro ao verificar código:", error);
    }
  };

  // Função para gerar e verificar código automaticamente
  const gerarCodigoAutomaticamente = () => {
    const novoCodigo = gerarCodigo();
    verificarCodigoNoDB(novoCodigo);
  };

  // useEffect para gerar o código automaticamente quando o formulário for carregado
  useEffect(() => {
    if (modoCadastro) {
      gerarCodigoAutomaticamente();
    }
  }, [modoCadastro]);

  return (
    <form className="w-full text-nowrap shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
      {/* Código */}
      <div className="mb-4">
        <label className="block text-left mb-2">Código:</label>
        <input
          type="text"
          id="codigo"
          name="codigo"
          value={formData.codigo = codigo}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      {/* Modelo */}
      <div className="mb-4">
        <label className="block text-left mb-2">Modelo:</label>
        <input
          type="text"
          id="modelo"
          name="modelo"
          value={formData.modelo}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      {/* Tamanho */}
      <div className="mb-4">
        <label className="block text-left mb-2">Tamanho:</label>
        <select id="tamanho" name="tamanho" value={formData.tamanho} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline">
          <option value="">Selecione o tamanho</option>
          <option value="PP">PP</option>
          <option value="P">P</option>
          <option value="M">M</option>
          <option value="G">G</option>
          <option value="GG">GG</option>
        </select>
      </div>

      {/* Cor */}
      <div className="mb-4">
        <label className="block text-left mb-2">Cor:</label>
        <input
          type="text"
          id="cor"
          name="cor"
          value={formData.cor}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      {/* Status */}
      <div className="mb-4">
        <label className="block text-left mb-2">Status:</label>
        <select id="status" name="status" value={formData.status} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline">
          <option value="">Selecione o status</option>
          <option value="Em manutenção">Em manutenção</option>
          <option value="Alugado">Alugado</option>
          <option value="Disponível">Disponível</option>
        </select>
      </div>

      {/* Valor */}
      <div className="mb-4">
        <label className="block text-left mb-2">Valor:</label>
        <input
          type="text"
          id="valor"
          name="valor"
          value={formData.valor}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
    </form>
  );
};

export default VestidosForm;
