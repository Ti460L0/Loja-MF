import React, { useState, useEffect } from "react";

const TabelaVestido = ({ handleChange, multiple, onSelect }) => {
  const [vestidos, setVestidos] = useState([]);
  const [vestidoSelecionado, setVestidoSelecionado] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVestidos = async () => {
      try {
        const response = await fetch(
          `http://ec2-18-216-195-241.us-east-2.compute.amazonaws.com:3000/vestidos`
        );
        if (response.ok) {
          const data = await response.json();
          setVestidos(data);
        } else {
          throw new Error("Erro ao buscar vestidos");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVestidos();
  }, []);

  const handleSelect = (vestido_id) => {
    const selectedVestido = vestidos.find((v) => v.id === vestido_id);
    setVestidoSelecionado(selectedVestido);
    onSelect(vestido_id);
  };

  return (
    <div>
      {multiple ? (
        <div className="overflow-x-auto">
          <table className="table-auto w-full text-left">
            <thead className="bg-slate-600">
              <tr>
                <th className="px-4 py-2">Código</th>
                <th className="px-4 py-2">Modelo</th>
                <th className="px-4 py-2">Tamanho</th>
                <th className="px-4 py-2">Cor</th>
                <th className="px-4 py-2">Valor</th>
              </tr>
            </thead>
            <tbody className="bg-slate-800">
              {vestidos.map((v) => (
                <tr
                  key={v.vestido_id}
                  className={`hover:bg-sky-800 ${
                    vestidoSelecionado && vestidoSelecionado.id === v.id
                      ? "bg-blue-500"
                      : ""
                  }`}
                  onClick={() => handleSelect(v.id)}
                >
                  <td className="border px-4 py-2">{v.codigo}</td>
                  <td className="border px-4 py-2">{v.modelo}</td>
                  <td className="border px-4 py-2">{v.tamanho}</td>
                  <td className="border px-4 py-2">{v.cor}</td>
                  <td className="border px-4 py-2">R${v.valor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex flex-col w-full">
          <label className="mb-2" htmlFor="vestido-select">
            Escolha um vestido:
          </label>
          <input
            className="px-4 py-2 border-2 border-gray-300 rounded-lg w-full"
            type="search"
            id="vestido-select"
            onChange={(e) => handleSelect(Number(e.target.value))}
            placeholder="Digite o código do vestido"
            list="vestidos"
          />
          <datalist id="vestidos">
            {vestidos.slice(0, 10).map((v) => (
              <option key={v.vestido_id} value={v.codigo}>
                {v.modelo}, {v.status}
              </option>
            ))}
          </datalist>
          {vestidoSelecionado && (
            <div className="mt-4 bg-slate-800 p-4 rounded-lg">
              <p className="font-bold">Modelo: {vestidoSelecionado.modelo}</p>
              <p className="mt-2">Tamanho: {vestidoSelecionado.tamanho}</p>
              <p className="mt-2">Cor: {vestidoSelecionado.cor}</p>
              <p className="mt-2">Status: {vestidoSelecionado.status}</p>
              <p className="mt-2">Valor: R${vestidoSelecionado.valor}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TabelaVestido;

