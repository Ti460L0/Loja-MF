import React, { useState } from 'react';
import axios from 'axios';

const VestidosForm = () => {
  const [modelo, setModelo] = useState('');
  const [tamanho, setTamanho] = useState('');
  const [cor, setCor] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Montar o objeto que será enviado para o backend
    const vestido = {
      modelo_vestido: modelo,
      tamanho_vestido: tamanho,
      cor_vestido: cor,
    };

    try {
      // Fazer o POST para o backend
      const response = await axios.post('https://bucked-lojamf.execute-api.us-east-2.amazonaws.com/prod/produtos', vestido);
      setMensagem('Vestido cadastrado com sucesso!');
      
      // Limpar o formulário após o sucesso
      setModelo('');
      setTamanho('');
      setCor('');
    } catch (error) {
      console.error('Erro ao cadastrar vestido:', error);
      setMensagem('Erro ao cadastrar vestido.');
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h2>Cadastrar Vestido</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Modelo:</label>
          <input
            type="text"
            value={modelo}
            onChange={(e) => setModelo(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Tamanho:</label>
          <input
            type="text"
            value={tamanho}
            onChange={(e) => setTamanho(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Cor:</label>
          <input
            type="text"
            value={cor}
            onChange={(e) => setCor(e.target.value)}
            required
          />
        </div>
        <button type="submit">Cadastrar</button>
      </form>
      {mensagem && <p>{mensagem}</p>}
    </div>
  );
};

export default VestidosForm;
