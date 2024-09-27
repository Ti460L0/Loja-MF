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
          `http://ec2-18-216-195-241.us-east-2.compute.amazonaws.com:3000/api/ve`
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
      setVestidoSelecionado(selectedVestido);
      onSelect(selectedVestido.vestido_id);
    }
  };

  return (
    <div>
      {loading && <div>Carregando...</div>}
      {error && <div>Erro ao buscar vestidos</div>}
      {!loading && !error && (
        <>
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
                        vestidoSelecionado &&
                        vestidoSelecionado.vestido_id === v.vestido_id
                          ? "bg-blue-500"
                          : ""
                      }`}
                      onClick={() => handleSelect(v.codigo)}
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
                <div className="mt-4 bg-slate-800 p-4 rounded-lg">
                  <p className="text-lg font-sans text-slate-300">
                    <strong>Modelo: </strong>
                    {vestidoSelecionado.modelo}
                  </p>
                  <p className="text-lg font-sans text-slate-300">
                    <strong>Tamanho: </strong>
                    {vestidoSelecionado.tamanho}
                  </p>
                  <p className="text-lg font-sans text-slate-300">
                    <strong>Cor: </strong>
                    {vestidoSelecionado.cor}
                  </p>
                  <p className="text-lg font-sans text-slate-300">
                    <strong>Status: </strong>
                    {vestidoSelecionado.status}
                  </p>
                  <p className="text-lg font-sans text-slate-300">
                    <strong>Valor: </strong>
                    R$ {vestidoSelecionado.valor}
                  </p>
                  <img
                    src={vestidoSelecionado.url}
                    alt="Imagem do vestido"
                    className="w-full h-auto mt-4"
                  />
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default VestidoConsulta;
