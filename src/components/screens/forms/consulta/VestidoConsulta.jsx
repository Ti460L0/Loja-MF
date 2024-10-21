import React, { useState, useEffect } from "react";

const VestidoConsulta = ({ multiple, onSelect }) => {
  const [vestidos, setVestidos] = useState([]);
  const [vestidoSelecionado, setVestidoSelecionado] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVestidos = async () => {
      try {
        const response = await fetch(
          `ep-aged-tooth-a4xigwo7-pooler.us-east-1.aws.neon.tech/api/ve`
        );
        if (!response.ok) {
          throw new Error("Erro ao buscar vestidos");
        }
        const data = await response.json();
        setVestidos(data);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };

    fetchVestidos();
  }, []);

  const handleSelect = (codigoVestido) => {
    const selectedVestido = vestidos.find((v) => v.codigo === codigoVestido);

    if (selectedVestido) {
      if (selectedVestido.status === "Alugado") {
        alert("Vestido alugado, não é possiível selecionar");
      } else {
        setVestidoSelecionado(selectedVestido);
        onSelect(selectedVestido);
      }
    } else {
      setVestidoSelecionado(null);
      onSelect(null);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-4">
      <label className="mb-2" htmlFor="vestido-select">
        Escolha um vestido:
      </label>
      <input
        className="px-4 py-2 border-2 border-gray-300 rounded-lg"
        type="search"
        id="vestido-select"
        onChange={(e) => handleSelect(e.target.value)}
        placeholder="Digite o código do vestido"
        list="vestidos"
      />
      <datalist id="vestidos">
        {vestidos.slice(0, 10).map((v) => (
          <option
            key={v.vestido_id}
            value={v.codigo}
            onChange={(e) => handleSelect(e.target.key)}
          >
            {v.modelo} - {v.status}
          </option>
        ))}
      </datalist>
      {vestidoSelecionado && (
        <div className="flex text-lg text-slate-300 flex-col w-full items-center mx-auto bg-yellow-950 p-4 rounded-lg max-w-md shadow-lg shadow-black">
          <p className="flex items-center space-x-2">
            <strong>Modelo: </strong>
            <span>{vestidoSelecionado.modelo}</span>
          </p>
          <p className="flex items-center space-x-2">
            <strong>Tamanho: </strong>
            <span>{vestidoSelecionado.tamanho}</span>
          </p>
          <p className="flex items-center space-x-2">
            <strong>Cor: </strong>
            <span>{vestidoSelecionado.cor}</span>
          </p>
          <p className="flex items-center space-x-2">
            <strong>Status: </strong>
            <span>{vestidoSelecionado.status}</span>
          </p>
          <p className="flex items-center space-x-2">
            <strong>Valor: </strong>
            <span>R$ {vestidoSelecionado.valor}</span>
          </p>
          <img
            src={vestidoSelecionado.url}
            alt="Imagem do vestido"
            className="w-3/5 mt-4 self-center"
          />
        </div>
      )}
    </div>
  );
};

export default VestidoConsulta;
