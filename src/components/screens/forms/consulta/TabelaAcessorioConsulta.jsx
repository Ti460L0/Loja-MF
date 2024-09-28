import React, { useEffect, useState } from "react";

const TabelaAcessorioConsulta = () => {
  const [search, setSearch] = useState("");
  const [acessorios, setAcessorios] = useState([]);
  const [acessorioId, setAcessorioId] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const [selectedAcessorio, setSelectedAcessorio] = useState({
    tipo: "",
    cor: "",
    tamanho: "",
    status: "",
  });

  useEffect(() => {
    const fetchAllAcessorios = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "http://ec2-18-216-195-241.us-east-2.compute.amazonaws.com:3000/api/ac"
        );
        if (!response.ok) {
          throw new Error("Erro ao buscar acessorios");
        }
        const data = await response.json();
        setAcessorios(data);
        setAcessorioId(data.acessorio_id);
      } catch (error) {
        console.error(error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAllAcessorios();
  }, []);

  const refreshAcessorios = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "http://ec2-18-216-195-241.us-east-2.compute.amazonaws.com:3000/api/ac"
      );
      if (!response.ok) {
        throw new Error("Erro ao buscar acessorios");
      }
      const data = await response.json();
      setAcessorios(data);
      setStartIndex(0); // Reiniciar o índice para a primeira página
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      const acessorioEncontrado = acessorios.find(
        (acessorio) =>
          acessorio.tipo.toLowerCase().includes(search.toLowerCase()) ||
          acessorio.cor.toLowerCase().includes(search.toLowerCase())
      );
      if (acessorioEncontrado) {
        setSelectedAcessorio(acessorioEncontrado);
      } else {
        alert("Acessorio não encontrado");
        setSelectedAcessorio(null);
      }
    }
  };

  const handleUpdateAcessorio = async (e) => {
    e.preventDefault();
    if (!selectedAcessorio) {
      setError("Nenhum acessorio selecionado para atualização");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(
        `http://ec2-18-216-195-241.us-east-2.compute.amazonaws.com:3000/api/ac/at/${selectedAcessorio.acessorio_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(selectedAcessorio),
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao atualizar acessorio");
      }

      const updatedAcessorio = await response.json();

      setAcessorios((prevAcessorios) =>
        prevAcessorios.map((acessorio) =>
          acessorio.acessorio_id === updatedAcessorio.acessorio_id
            ? updatedAcessorio
            : acessorio
        )
      );

      setSelectedAcessorio(updatedAcessorio);
      alert("Acessorio atualizado com sucesso!");

      // Chamar a função de refresh após a atualização
      await refreshAcessorios();
    } catch (error) {
      console.error("Erro ao atualizar acessorio:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAcessorio = async (acessorioId) => {
    if (!window.confirm("Tem certeza que deseja excluir este acessório?")) {
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(
        `http://ec2-18-216-195-241.us-east-2.compute.amazonaws.com:3000/api/ac/excluir/${acessorioId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao excluir acessorio");
      }

      setAcessorios((prevAcessorios) =>
        prevAcessorios.filter((acessorio) => acessorio.acessorio_id !== acessorioId)
      );
      alert("Acessorio excluído com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir acessorio:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Formulário de busca */}
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar por tipo ou cor"
        />
        <button type="submit">Buscar</button>
      </form>

      {/* Formulário de edição do acessorio */}
      {selectedAcessorio && (
        <form onSubmit={handleUpdateAcessorio}>
          <label className="block text-left mb-2">
            Tipo:
            <input
              className="block w-full px-4 py-2 text-slate-700 bg-white border border-solid border-slate-300 rounded transition ease-in-out"
              type="text"
              name="tipo"
              value={selectedAcessorio.tipo || ""}
              onChange={(e) =>
                setSelectedAcessorio({
                  ...selectedAcessorio,
                  tipo: e.target.value,
                })
              }
            />
          </label>
          <label className="block text-left mb-2">
            Cor:
            <input
              className="block w-full px-4 py-2 text-slate-700 bg-white border border-solid border-slate-300 rounded transition ease-in-out"
              type="text"
              name="cor"
              value={selectedAcessorio.cor || ""}
              onChange={(e) =>
                setSelectedAcessorio({
                  ...selectedAcessorio,
                  cor: e.target.value,
                })
              }
            />
          </label>
          <label className="block text-left mb-2">
            Tamanho:
            <input
              className="block w-full px-4 py-2 text-slate-700 bg-white border border-solid border-slate-300 rounded transition ease-in-out"
              type="text"
              name="tamanho"
              value={selectedAcessorio.tamanho || ""}
              onChange={(e) =>
                setSelectedAcessorio({
                  ...selectedAcessorio,
                  tamanho: e.target.value,
                })
              }
            />
          </label>
          <label className="block text-left mb-2">
            Preço:
            <input
              className={
                "block w-full px-4 py-2 text-slate-700 bg-white border border-solid border-slate-300 rounded transition ease-in-out " +
                (selectedAcessorio.status === "Disponível" ? "font-semibold bg-green-200 text-green-950" : "font-semibold bg-red-200 text-red-950")
              }
              type="text"
              name="status"
              value={selectedAcessorio.status || 0}
              onChange={(e) =>
                setSelectedAcessorio({
                  ...selectedAcessorio,
                  status: e.target.value,
                })
              }
            />
          </label>
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Salvar Alterações
          </button>
        </form>
      )}

      {/* Tabela de acessorios */}
      <table className="table-auto w-full text-left">
        <thead className="bg-slate-600">
          <tr>
            <th className="px-4 py-2">Tipo</th>
            <th className="px-4 py-2">Tamanho</th>
            <th className="px-4 py-2">Cor</th>
            <th className="px-4 py-2">Preço</th>
            <th className="px-4 py-2">Ações</th>
          </tr>
        </thead>
        <tbody>
          {acessorios
            .slice(startIndex, startIndex + 5)
            .map((acessorio, index) => (
              <tr
                key={acessorio.acessorio_id}
                className={
                  selectedAcessorio &&
                  selectedAcessorio.acessorio_id === acessorio.acessorio_id
                    ? "bg-slate-400 cursor-pointer"
                    : "hover:bg-slate-200 cursor-pointer"
                }
                onClick={() => setSelectedAcessorio(acessorio)}
              >
                <td className="border px-4 py-2 bg-slate-800">{acessorio.tipo}</td>
                <td className="border px-4 py-2 bg-slate-800">{acessorio.tamanho}</td>
                <td className="border px-4 py-2 bg-slate-800">{acessorio.cor}</td>
                <td className="border px-4 py-2 bg-slate-800" style={{color: acessorio.status === "Disponível" ? "green" : "red"}}>{acessorio.status}</td>
                <td className="border px-4 py-2 bg-slate-800">
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleDeleteAcessorio(acessorio.acessorio_id)}
                  >
                    Excluir
                  </button>
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
                    onClick={() => handleUpdateAcessorio(index)}
                  >
                    Alterar
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="5">
              <div className="flex justify-between">
                <button
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                  onClick={() => setStartIndex(startIndex - 5)}
                  disabled={startIndex === 0}
                >
                  Anterior
                </button>
                <button
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                  onClick={() => setStartIndex(startIndex + 5)}
                  disabled={startIndex >= acessorios.length - 5}
                >
                  Próximo
                </button>
              </div>
            </td>
          </tr>
        </tfoot>
      </table>

      {/* Mensagem de erro */}
      {error && <div className="text-red-500">{error}</div>}

      {/* Carregando */}
      {loading && <div>Carregando...</div>}
    </div>
  );
};

export default TabelaAcessorioConsulta;
