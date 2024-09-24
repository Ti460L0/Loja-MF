import React, { useState, useEffect } from 'react';

const VestidoTabela = () => {
  const [vestidos, setVestidos] = useState([]);
  const [codigoFiltro, setCodigoFiltro] = useState("");
  const [vestidosFiltrados, setVestidosFiltrados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVestidos = async () => {
      try {
        const response = await fetch('http://ec2-18-216-195-241.us-east-2.compute.amazonaws.com:3000/vestidos');
        if (response.ok) {
          const data = await response.json();
          setVestidos(data);
          setVestidosFiltrados(data);
        } else {
          throw new Error('Erro ao buscar vestidos');
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVestidos();
  }, []);

  useEffect(() => {
    // Verificar se vestidos é um array e se codigoFiltro é uma string
    if (Array.isArray(vestidos) && typeof codigoFiltro === 'string') {
      const filteredVestidos = vestidos.filter(vestido => 
        vestido.codigo && vestido.codigo.includes(codigoFiltro) // Verifica se vestido.codigo existe
      );
      setVestidosFiltrados(filteredVestidos);
    }
  }, [codigoFiltro, vestidos]);

  const handleCodigoFiltroChange = (e) => {
    setCodigoFiltro(e.target.value);
  };

  if (loading) {
    return <div>Carregando vestidos...</div>;
  }

  if (error) {
    return <div>Erro: {error}</div>;
  }

  return (
    <>
      <div className='justify-center'>
        <input
          type="text"
          value={codigoFiltro}
          onChange={handleCodigoFiltroChange}
          placeholder="Filtrar por código"
          className="flex border rounded p-2 mb-4"
        />
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Código</th>
              <th className="border border-gray-300 px-4 py-2">Descrição</th>
              <th className="border border-gray-300 px-4 py-2">Tamanho</th>
              <th className="border border-gray-300 px-4 py-2">Cor</th>
              <th className="border border-gray-300 px-4 py-2">Valor</th>
            </tr>
          </thead>
          <tbody>
            {vestidosFiltrados.length > 0 ? (
              vestidosFiltrados.map(vestido => (
                <tr key={vestido.codigo}>
                  <td className="border border-gray-300 px-4 py-2">{vestido.codigo}</td>
                  <td className="border border-gray-300 px-4 py-2">{vestido.descricao}</td>
                  <td className="border border-gray-300 px-4 py-2">{vestido.tamanho}</td>
                  <td className="border border-gray-300 px-4 py-2">{vestido.cor}</td>
                  <td className="border border-gray-300 px-4 py-2">{`R${vestido.valor}`}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="border border-gray-300 px-4 py-2 text-center">Nenhum vestido encontrado</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default VestidoTabela;
