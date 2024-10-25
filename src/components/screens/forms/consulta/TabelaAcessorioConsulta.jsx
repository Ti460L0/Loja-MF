import React, { useEffect, useState } from "react";

const TabelaAcessorioConsulta = () => {
  const [search, setSearch] = useState("");
  const [acessorios, setAcessorios] = useState([]);
  const [acessorioId, setAcessorioId] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedAcessorio, setSelectedAcessorio] = useState({
    tipo: "",
    cor: "",
    tamanho: "",
    status: "",
  });

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;

  // Calcula o índice inicial e final com base na página atual
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedClientes = acessorios.slice(startIndex, endIndex);

  // Funções para navegar entre as páginas
  const nextPage = () => {
    if (startIndex + itemsPerPage < acessorios.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  useEffect(() => {
    const fetchAllAcessorios = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://vps55477.publiccloud.com.br/api/ac",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
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
        "https://vps55477.publiccloud.com.br/api/ac",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Erro ao buscar acessorios");
      }
      const data = await response.json();
      setAcessorios(data);
      setCurrentPage(0); // Reiniciar o índice para a primeira página
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
        `https://vps55477.publiccloud.com.br/api/ac/at/${selectedAcessorio.acessorio_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
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

    const token = localStorage.getItem("token");
    console.log(token)

    try {
      setLoading(true);
      const response = await fetch(
        `https://vps55477.publiccloud.com.br/api/ac/de/${acessorioId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }

      );

      if (!response.ok) {
        throw new Error("Erro ao excluir acessorio");
      }

      setAcessorios((prevAcessorios) =>
        prevAcessorios.filter(
          (acessorio) => acessorio.acessorio_id !== acessorioId
        )
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
        className="shadow appearance-none border rounded mt-4 py-2 px-3 text-slate-200 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar por tipo ou cor"
        />
        <button className="bg-green-700 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"type="submit">Buscar</button>
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
            Status:
            <select
              className={
                "block w-full px-4 py-2 text-slate-700 bg-white border border-solid border-slate-300 rounded transition ease-in-out " +
                (selectedAcessorio.status === "Disponível"
                  ? "font-semibold bg-green-200 text-green-950"
                  : selectedAcessorio.status === "Alugado"
                  ? "font-semibold bg-red-200 text-red-950"
                  : "")
              }
              name="status"
              value={selectedAcessorio.status}
              onChange={(e) =>
                setSelectedAcessorio({
                  ...selectedAcessorio,
                  status: e.target.value,
                })
              }
            >
              <option value="Disponível">Disponível</option>
              <option value="Alugado">Alugado</option>
            </select>
          </label>
          <button
            className="w-full bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded mb-4"
            type="submit"
          >
            Salvar Alterações
          </button>
        </form>
      )}

      {/* Tabela de acessorios */}
      <table className="table-auto w-full text-left shadow-md rounded">
  <thead className="bg-brown mb-4">
    <tr>
      <th className="px-4 py-2">Tipo</th>
      <th className="px-4 py-2">Tamanho</th>
      <th className="px-4 py-2">Cor</th>
      <th className="px-4 py-2">Status</th>
      <th className="px-4 py-2">Ações</th>
    </tr>
  </thead>
  <tbody>
    {acessorios.slice(startIndex, startIndex + 5).map((acessorio, index) => (
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
        <td className="border bg-white text-black px-4 py-2">
          {acessorio.tipo}
        </td>
        <td className="border bg-white text-black px-4 py-2">
          {acessorio.tamanho}
        </td>
        <td className="border bg-white text-black px-4 py-2">
          {acessorio.cor}
        </td>
        <td
          className="border bg-white text-black px-4 py-2"
          style={{
            color: acessorio.status === "Disponível" ? "green" : "red",
          }}
        >
          {acessorio.status}
        </td>
        <td className="border bg-white text-black px-4 py-2">
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
</table>


      {/* Paginação */}
      <div className="flex justify-center mt-4">
        <button
          onClick={prevPage}
          disabled={currentPage === 0}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Anterior
        </button>
        <button
          onClick={nextPage}
          disabled={startIndex + itemsPerPage >= acessorios.length}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Próximo
        </button>
      </div>

      {/* Mensagem de erro */}
      {error && <div className="text-red-500">{error}</div>}

      {/* Carregando */}
      {loading && <div>Carregando...</div>}
    </div>
  );
};

export default TabelaAcessorioConsulta;


