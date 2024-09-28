import React, { useState, useEffect } from "react";

const AcessorioConsulta = ({ multiple, onSelect }) => {
  const [acessorios, setAcessorios] = useState([]);
  const [acessorioSelecionado, setAcessorioSelecionado] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAcessorios = async () => {
      try {
        const response = await fetch(
          `http://ec2-18-216-195-241.us-east-2.compute.amazonaws.com:3000/api/ac`
        );
        if (!response.ok) {
          throw new Error("Erro ao buscar acessorios");
        }
        const data = await response.json();
        setAcessorios(data);
      } catch (error) {
        console.error(error);
        setError(error);
      }
      setLoading(false);
    };

    fetchAcessorios();
  }, []);

  const handleSelect = (tipoAcessorio) => {
    const selectedAcessorio = acessorios.find((a) => a.tipo === tipoAcessorio);

    if (selectedAcessorio) {
      setAcessorioSelecionado(selectedAcessorio);
      onSelect(selectedAcessorio.acessorio_id);
      console.log("Acessorio selecionado:", selectedAcessorio);
    }
  };

  return (
    <div>
      {loading && <div>Carregando...</div>}
      {error && <div>Erro ao buscar acessorios</div>}
      {!loading && !error && (
        <>
          {multiple ? (
            <div className="overflow-x-auto">
              <table className="table-auto w-full text-left">
                <thead className="bg-slate-600">
                  <tr>
                    <th className="px-4 py-2">Tipo</th>
                    <th className="px-4 py-2">Tamanho</th>
                    <th className="px-4 py-2">Status</th>
                    <th className="px-4 py-2">Cor</th>
                  </tr>
                </thead>
                <tbody className="bg-slate-800">
                  {acessorios.map((a) => (
                    <tr
                      key={a.acessorio_id}
                      className={`hover:bg-sky-800 ${
                        acessorioSelecionado &&
                        acessorioSelecionado.acessorio_id === a.acessorio_id
                          ? "bg-blue-500"
                          : ""
                      }`}
                      onClick={() => handleSelect(a.tipo)}
                    >
                      <td className="border px-4 py-2">{a.tipo}</td>
                      <td className="border px-4 py-2">{a.tamanho}</td>
                      <td className="border px-4 py-2">{a.status}</td>
                      <td className="border px-4 py-2">{a.cor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="flex flex-col w-full">
              <label className="mb-2" htmlFor="acessorio-select">
                Escolha um acessório:
              </label>
              <input
                className="px-4 py-2 border-2 border-gray-300 rounded-lg w-full"
                type="search"
                id="acessorio-select"
                onChange={(e) => handleSelect(e.target.value)}
                placeholder="Digite o tipo do acessório"
                list="acessorios"
              />
              <datalist id="acessorios">
                {acessorios.slice(0, 10).map((a) => (
                  <option key={a.acessorio_id} value={a.tipo}>
                    {a.tipo} - {a.status}
                  </option>
                ))}
              </datalist>
              {acessorioSelecionado && (
                <div className="mt-4 bg-slate-800 p-4 rounded-lg">
                  <p className="text-lg font-sans text-slate-300">
                    <strong>Tipo: </strong>
                    {acessorioSelecionado.tipo}
                  </p>
                  <p className="text-lg font-sans text-slate-300">
                    <strong>Tamanho: </strong>
                    {acessorioSelecionado.tamanho}
                  </p>
                  <p className="text-lg font-sans text-slate-300">
                    <strong>Cor: </strong>
                    {acessorioSelecionado.cor}
                  </p>
                  <p className="text-lg font-sans text-slate-300">
                    <strong>Status: </strong>
                    {acessorioSelecionado.status}
                  </p>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AcessorioConsulta;
