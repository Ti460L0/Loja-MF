import React, { useEffect, useState } from "react";

const TabelaVestidoConsulta = () => {
  const [search, setSearch] = useState("");
  const [vestidos, setVestidos] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const [selectedVestido, setSelectedVestido] = useState({
    codigo: "",
    modelo: "",
    cor: "",
    tamanho: "",
    preco: "",
    status: "",
    url: "",
  });

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;

  const startIndex = currentPage * itemsPerPage;
  const paginatedVestidos = vestidos.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const nextPage = () => {
    if (startIndex + itemsPerPage < vestidos.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  useEffect(() => {
    fetchAllVestidos();
  }, []);

  const fetchAllVestidos = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://vps55477.publiccloud.com.br/api/ve", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          }
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao buscar vestidos");
      }
      const data = await response.json();
      setVestidos(data);
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
      const vestidoEncontrado = vestidos.find(
        (vestido) =>
          vestido.codigo.toLowerCase().includes(search.toLowerCase()) ||
          vestido.modelo.toLowerCase().includes(search.toLowerCase())
      );
      if (vestidoEncontrado) {
        setSelectedVestido(vestidoEncontrado);
        setImagePreview(vestidoEncontrado.url);
      } else {
        alert("Vestido não encontrado");
        setSelectedVestido(null);
      }
    }
  };

  const handleUpdateVestido = async (e) => {
    e.preventDefault();
    setImagePreview(null);
    if (!selectedVestido) {
      setError("Nenhum vestido selecionado para atualização");
      return;
    }
  
    try {
      setLoading(true);
      const newImageFile =
        document.querySelector('input[type="file"]').files[0];
  
      if (newImageFile) {
        const codigo = selectedVestido.codigo;
        const extension = newImageFile.name.split(".").pop(); // Extraí a extensão original
        const s3Url = `http://bucked-lojamf.s3.us-east-2.amazonaws.com/img/${codigo}.${extension}`; // Mantém a extensão original
  
        const uploadResponse = await fetch(s3Url, {
          method: "PUT",
          headers: {
            "Content-Type": newImageFile.type,
          },
          body: newImageFile,
        });
  
        if (!uploadResponse.ok) {
          throw new Error("Erro ao fazer upload da imagem");
        }
  
        // Atualiza a URL da imagem no vestido selecionado
        const updatedVestido = {
          ...selectedVestido,
          url: s3Url,
        };
  
        const response = await fetch(
          `https://vps55477.publiccloud.com.br/api/ve/at/${updatedVestido.vestido_id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedVestido),
          }
        );
  
        if (!response.ok) {
          throw new Error("Erro ao atualizar vestido");
        }
  
        const updatedVestidoResponse = await response.json();
        setVestidos((prevVestidos) =>
          prevVestidos.map((vestido) =>
            vestido.vestido_id === updatedVestidoResponse.vestido_id
              ? updatedVestidoResponse
              : vestido
          )
        );
        setSelectedVestido(updatedVestidoResponse);
        alert("Vestido atualizado com sucesso!");
      } else {
        const response = await fetch(
          `https://vps55477.publiccloud.com.br/api/ve/at/${selectedVestido.vestido_id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(selectedVestido),
          }
        );
  
        if (!response.ok) {
          throw new Error("Erro ao atualizar vestido");
        }
  
        const updatedVestidoResponse = await response.json();
        setVestidos((prevVestidos) =>
          prevVestidos.map((vestido) =>
            vestido.vestido_id === updatedVestidoResponse.vestido_id
              ? updatedVestidoResponse
              : vestido
          )
        );
        setSelectedVestido(updatedVestidoResponse);
        alert("Vestido atualizado com sucesso!");
      }
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setLoading(false);
      fetchAllVestidos();
    }
  };

  const handleDeleteVestido = async () => {
    if (!selectedVestido) {
      setError("Nenhum vestido selecionado para deleção");
      return;
    }

    if (window.confirm("Tem certeza que deseja deletar este vestido?")) {
      try {
        setLoading(true);
        const response = await fetch(
          `https://vps55477.publiccloud.com.br/api/ve/de/${selectedVestido.vestido_id}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) {
          throw new Error("Erro ao deletar vestido");
        }

        setVestidos((prevVestidos) =>
          prevVestidos.filter(
            (vestido) => vestido.vestido_id !== selectedVestido.vestido_id
          )
        );
        setSelectedVestido(null);
        alert("Vestido deletado com sucesso!");
      } catch (error) {
        console.error(error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const refreshVestidos = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://vps55477.publiccloud.com.br/api/ve"
      );
      if (!response.ok) {
        throw new Error("Erro ao buscar vestidos");
      }
      const data = await response.json();
      setVestidos(data);
      setCurrentPage(0); // Reiniciar o índice para a primeira página
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUploadImage = (codigo, file) => {
    // Esta função já foi tratada no handleUpdateVestido
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
          placeholder="Buscar por Modelo ou Código"
        />
        <button className="bg-green-700 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out" type="submit">Buscar</button>
      </form>

      {/* Formulário de edição do vestido */}
      {selectedVestido && (
        <form onSubmit={handleUpdateVestido}>
          <label className="block text-left mb-2">
            Código:
            <input
              className="block w-full px-4 py-2 text-slate-700 bg-white border border-solid border-slate-300 rounded transition ease-in-out"
              type="text"
              name="codigo"
              value={selectedVestido.codigo || ""} // Garante que seja uma string
              onChange={(e) =>
                setSelectedVestido({
                  ...selectedVestido,
                  codigo: e.target.value,
                })
              }
              readOnly
            />
          </label>
          <label className="block text-left mb-2">
            Modelo:
            <input
              className="block w-full px-4 py-2 text-slate-700 bg-white border border-solid border-slate-300 rounded transition ease-in-out"
              type="text"
              name="modelo"
              value={selectedVestido.modelo || ""} // Garante que seja uma string
              onChange={(e) =>
                setSelectedVestido({
                  ...selectedVestido,
                  modelo: e.target.value,
                })
              }
            />
          </label>
          <label className="block text-left mb-2">
            Cor:
            <input
              className="block w-full px-4 py-2 text-slate-700 bg-white border border-solid border-slate-300 rounded transition ease-in-out"
              name="cor"
              value={selectedVestido.cor || ""} // Garante que seja uma string
              onChange={(e) =>
                setSelectedVestido({
                  ...selectedVestido,
                  cor: e.target.value,
                })
              }
            />
          </label>
          <label className="block text-left mb-2">
            Tamanho:
            <select
              className="block w-full px-4 py-2 text-slate-700 bg-white border border-solid border-slate-300 rounded transition ease-in-out"
              name="tamanho"
              value={selectedVestido.tamanho || ""} // Garante que seja uma string
              onChange={(e) =>
                setSelectedVestido({
                  ...selectedVestido,
                  tamanho: e.target.value,
                })
              }
            >
              <option value="">Selecione um tamanho</option>
              <option value="PP">PP</option>
              <option value="P">P</option>
              <option value="M">M</option>
              <option value="G">G</option>
              <option value="GG">GG</option>
            </select>
          </label>
          <label className="block text-left mb-2">
            Status:
            <select
              className={
                "block w-full px-4 py-2 text-slate-700 bg-white border border-solid border-slate-300 rounded transition ease-in-out " +
                (selectedVestido.status === "Alugado"
                  ? "bg-red-200"
                  : selectedVestido.status === "Disponível"
                  ? "bg-green-200"
                  : "bg-yellow-200")
              }
              name="status"
              value={selectedVestido.status || ""} // Garante que seja uma string
              onChange={(e) =>
                setSelectedVestido({
                  ...selectedVestido,
                  status: e.target.value,
                })
              }
            >
              <option value="">Selecione</option>
              <option value="Alugado">Alugado</option>
              <option value="Disponível">Disponível</option>
              <option value="Indisponível">Indisponível</option>
            </select>
          </label>
          <label className="block text-left mb-2">
            Preço:
            <input
              className="block w-full px-4 py-2 text-slate-700 bg-white border border-solid border-slate-300 rounded transition ease-in-out"
              name="preco"
              value={selectedVestido.valor || ""} // Garante que seja uma string
              onChange={(e) =>
                setSelectedVestido({
                  ...selectedVestido,
                  valor: e.target.value,
                })
              }
            />
          </label>
          <label className="block text-center justify-center rounded-lg p-4 hover:cursor-pointer transition duration-150 ease-in-out items-center">
            <img
              className="w-48 m-4 object-scale-down rounded mx-auto"
              src={imagePreview || selectedVestido.url} // Mostra a pré-visualização, se disponível
              alt="Foto do Vestido"
            />
            <input
              type="file"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setImagePreview(URL.createObjectURL(file)); // Gerar URL de pré-visualização
                  handleUploadImage(selectedVestido.codigo, file); // Fazer upload da imagem
                }
              }}
            />
          </label>
          <div className="flex justify-center">
            <button
              className="m-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              type="submit"
            >
              Salvar Alterações
            </button>

            {/* Botão de deletar vestido */}
            <button
              className="m-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
              type="button"
              onClick={handleDeleteVestido}
            >
              Deletar Vestido
            </button>
          </div>
        </form>
      )}

      {/* Tabela de vestidos */}
      <table className="table-auto w-full text-left">
        <thead className="bg-brown">
          <tr className="text-white text-center">
            <th className="px-4 py-2">Código</th>
            <th className="px-4 py-2">Modelo</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Cor</th>
            <th className="px-4 py-2">Tamanho</th>
            <th className="px-4 py-2">Preço</th>
            <th className="px-4 py-2">Ações</th>
          </tr>
        </thead>
        <tbody>
          {vestidos.slice(startIndex, startIndex + 5).map((vestido) => (
            <tr
              key={vestido.vestido_id}
              className={
                selectedVestido &&
                selectedVestido.vestido_id === vestido.vestido_id
                  ? "bg-slate-400 cursor-pointer"
                  : "hover:bg-slate-200 cursor-pointer"
              }
              onClick={() => {
                setSelectedVestido(vestido);
                console.log("Vestido selecionado:", selectedVestido.vestido_id);
              }}
            >
              <td className="border bg-white text-black px-4 py-2">
                {vestido.codigo}
              </td>
              <td className="border bg-white text-black px-4 py-2">
                {vestido.modelo}
              </td>
              <td
                className="border bg-white text-black px-4 py-2"
                style={{
                  color: vestido.status === "Disponível" ? "green" : "red",
                }}
              >
                {vestido.status}
              </td>
              <td className="border bg-white text-black px-4 py-2">
                {vestido.cor}
              </td>
              <td className="border bg-white text-black px-4 py-2">
                {vestido.tamanho}
              </td>
              <td className="border bg-white text-black px-4 py-2">
                {vestido.valor}
              </td>
              <td className="border text-nowrap bg-white text-black px-4 py-2">
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() =>
                    handleDeleteVestido(selectedVestido.vestido_id)
                  }
                >
                  Excluir
                </button>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
                  onClick={() => handleUpdateVestido(index)}
                >
                  Alterar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Botões de navegação */}
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
          disabled={startIndex + itemsPerPage >= vestidos.length}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Próximo
        </button>
      </div>

      {/* Mensagem de erro */}
      {error && <div className="text-red-500">{error}</div>}

      {loading && <div>Carregando...</div>}
    </div>
  );
};

export default TabelaVestidoConsulta;
