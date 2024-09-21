import React, { useState } from 'react';

const Agendar = () => {
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [modelo, setModelo] = useState('');
  const [tipo, setTipo] = useState('');
  const [dataProva, setDataProva] = useState('');
  const [dataRetirada, setDataRetirada] = useState('');
  const [dataDevolucao, setDataDevolucao] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // lógica de agendamento
    console.log({
      nome,
      cpf,
      modelo,
      tipo,
      dataProva,
      dataRetirada,
      dataDevolucao,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl mb-4">Agendar Locação</h2>

      <label className="block mb-2">Nome do Cliente:</label>
      <input 
        type="text"
        placeholder="Nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        className="border p-2 mb-4 w-full"
      />

      <label className="block mb-2">CPF do Cliente:</label>
      <input 
        type="text"
        placeholder="CPF"
        value={cpf}
        onChange={(e) => setCpf(e.target.value)}
        className="border p-2 mb-4 w-full"
      />

      <label className="block mb-2">Modelo (Vestido):</label>
      <input 
        type="text"
        placeholder="Modelo do Vestido"
        value={modelo}
        onChange={(e) => setModelo(e.target.value)}
        className="border p-2 mb-4 w-full"
      />

      <label className="block mb-2">Tipo (Acessório):</label>
      <input 
        type="text"
        placeholder="Tipo de Acessório"
        value={tipo}
        onChange={(e) => setTipo(e.target.value)}
        className="border p-2 mb-4 w-full"
      />

      <label className="block mb-2">Data de Prova:</label>
      <input 
        type="date"
        value={dataProva}
        onChange={(e) => setDataProva(e.target.value)}
        className="border p-2 mb-4 w-full"
      />

      <label className="block mb-2">Data de Retirada:</label>
      <input 
        type="date"
        value={dataRetirada}
        onChange={(e) => setDataRetirada(e.target.value)}
        className="border p-2 mb-4 w-full"
      />

      <label className="block mb-2">Data de Devolução:</label>
      <input 
        type="date"
        value={dataDevolucao}
        onChange={(e) => setDataDevolucao(e.target.value)}
        className="border p-2 mb-4 w-full"
      />

      <button type="submit" className="bg-blue-500 text-white p-2">Agendar</button>
    </form>
  );
};

export default Agendar;
