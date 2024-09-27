import React, { useState, useEffect } from "react";

const AcessorioConsulta = ({ multiple, onSubmit }) => {
  const [acessorios, setAcessorios] = useState([]);
  const [acessorioSelecionado, setAcessorioSelecionado] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAcessorios = async () => {
      try {
        const response = await fetch(
          "http://ec2-18-216-195-241.us-east-2.compute.amazonaws.com:3000/api/ac"
        );
        if (response.ok) {
          const data = await response.json();
          setAcessorios(data);
        } else {
          throw new Error("Erro ao buscar acessórios");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAcessorios();
  }, []);

  const handleChange = (e) => {
    const acessorio = acessorios.find((a) => a.tipo === e.target.value);
    if (acessorio) {
      setAcessorioSelecionado(acessorio);
      onSubmit({ acessorio_id: acessorio.id });
    } else {
      setAcessorioSelecionado(null);
    }
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>Erro: {error}</div>;
  }

  return (
    <div>
      {multiple ? (
        <div className="overflow-x-auto">
          <table className="table-auto w-full text-left">
            <thead className="bg-slate-600">
              <tr>
                <th className="px-4 py-2">Tipo</th>
                <th className="px-4 py-2">Tamanho</th>
                <th className="px-4 py-2">Cor</th>
                <th className="px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody className="bg-slate-800">
              {acessorios.map((a) => (
                <tr
                  key={a.id}
                  className={`hover:bg-sky-800 ${
                    acessorioSelecionado && acessorioSelecionado.id === a.id ? "bg-blue-500" : ""
                  }`}
                  onClick={() => {
                    setAcessorioSelecionado(a);
                    onSubmit({ acessorio_id: a.id });
                  }}
                >
                  <td className="border px-4 py-2">{a.tipo}</td>
                  <td className="border px-4 py-2">{a.tamanho}</td>
                  <td className="border px-4 py-2">{a.cor}</td>
                  <td className="border px-4 py-2">{a.status}</td>
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
          <select
            className="px-4 py-2 border-2 border-gray-300 rounded-lg w-full"
            id="acessorio-select"
            onChange={handleChange}
          >
            <option value="">Selecione um acessório</option>
            {acessorios.map((a) => (
              <option key={a.id} value={a.tipo}>
                {a.tamanho}, {a.cor}, {a.status}
              </option>
            ))}
          </select>
          {acessorioSelecionado && (
            <div className="mt-4 bg-slate-800 p-4 rounded-lg">
              <p className="font-bold">Tipo: {acessorioSelecionado.tipo}</p>
              <p className="mt-2">Tamanho: {acessorioSelecionado.tamanho}</p>
              <p className="mt-2">Cor: {acessorioSelecionado.cor}</p>
              <p className="mt-2">Valor: R${acessorioSelecionado.valor}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AcessorioConsulta;
