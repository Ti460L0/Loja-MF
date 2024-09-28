import React, { useEffect, useState } from "react";

const TabelaVestidoConsulta = () => {
  const [search, setSearch] = useState("");
  const [vestidos, setVestidos] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [startIndex, setStartIndex] = useState(0);

  const [selectedVestido, setSelectedVestido] = useState({
    codigo: "",
    modelo: "",
    cor: "",
    tamanho: "",
    preco: "",
    status: "",
    url: "",
  });

  useEffect(() => {
    fetchAllVestidos();
  }, []);

  const fetchAllVestidos = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "http://ec2-18-216-195-241.us-east-2.compute.amazonaws.com:3000/api/ve"
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
      } else {
        alert("Vestido não encontrado");
        setSelectedVestido(null);
      }
    }
  };

  const handleUpdateVestido = async (e) => {
    e.preventDefault();
    if (!selectedVestido) {
      setError("Nenhum vestido selecionado para atualização");
      return;
    }
  
    try {
      setLoading(true);
      // Verifica se uma nova imagem foi selecionada
      const newImageFile = document.querySelector('input[type="file"]').files[0];
      
      if (newImageFile) {
        const codigo = selectedVestido.codigo; // Usa o código para montar o link
        const s3Url = `https://bucked-lojamf.s3.us-east-2.amazonaws.com/img/${codigo}.jpeg`;
  
        // Faz o upload da nova imagem para o S3
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
      }
  
      const response = await fetch(
        `http://ec2-18-216-195-241.us-east-2.compute.amazonaws.com:3000/api/ve/at/${selectedVestido.vestido_id}`,
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
  
      const updatedVestido = await response.json();
      setVestidos((prevVestidos) =>
        prevVestidos.map((vestido) =>
          vestido.vestido_id === updatedVestido.vestido_id
            ? updatedVestido
            : vestido
        )
      );
      setSelectedVestido(updatedVestido);
      alert("Vestido atualizado com sucesso!");
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setLoading(false);
      fetchAllVestidos(); // Atualiza a lista após a atualização
    }
  };
  

  // const handleUploadImage = async (codigo, file) => {
  //   const url = `https://bucked-lojamf.s3.us-east-2.amazonaws.com/img/${codigo}.jpeg`;

  //   const headers = new Headers();
  //   headers.append("Content-Type", file.type);
  //   headers.append("x-amz-acl", "public-read"); // Defina as permissões como público se necessário

  //   try {
  //     const response = await fetch(url, {
  //       method: "PUT",
  //       headers: headers,
  //       body: file,
  //     });

  //     if (!response.ok) {
  //       throw new Error("Erro ao fazer upload da imagem");
  //     }

  //     alert("Imagem enviada com sucesso!");
  //   } catch (error) {
  //     console.error(error);
  //     alert("Erro ao enviar a imagem: " + error.message);
  //   }
  // };

  const handleDeleteVestido = async () => {
    if (!selectedVestido) {
      setError("Nenhum vestido selecionado para deleção");
      return;
    }

    if (window.confirm("Tem certeza que deseja deletar este vestido?")) {
      try {
        setLoading(true);
        const response = await fetch(
          `http://ec2-18-216-195-241.us-east-2.compute.amazonaws.com:3000/api/ve/de/${selectedVestido.vestido_id}`,
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
        setSelectedVestido(null); // Limpa a seleção
        alert("Vestido deletado com sucesso!");
      } catch (error) {
        console.error(error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const refreshVestidos = () => {
    fetchAllVestidos(); // Chama a função para recarregar a lista de vestidos
  };

  return (
    <div>
      {/* Formulário de busca */}
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar por Modelo ou Código"
        />
        <button type="submit">Buscar</button>
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
            <input
              className="block w-full px-4 py-2 text-slate-700 bg-white border border-solid border-slate-300 rounded transition ease-in-out"
              name="tamanho"
              value={selectedVestido.tamanho || ""} // Garante que seja uma string
              onChange={(e) =>
                setSelectedVestido({
                  ...selectedVestido,
                  tamanho: e.target.value,
                })
              }
            />
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
          <label className="block text-left mb-2">
            Foto:
            <img
              className="w-40"
              src={selectedVestido.url}
              alt="Foto do Vestido"
            />
            <input
              type="file"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  handleUploadImage(selectedVestido.codigo, file);
                }
              }}
            />
          </label>

          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Salvar Alterações
          </button>

          {/* Botão de deletar vestido */}
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
            type="button"
            onClick={handleDeleteVestido}
          >
            Deletar Vestido
          </button>
        </form>
      )}

      {/* Tabela de vestidos */}
      <table className="table-auto w-full text-left">
        <thead className="bg-slate-600">
          <tr>
            <th className="px-4 py-2">Código</th>
            <th className="px-4 py-2">Modelo</th>
            <th className="px-4 py-2">Cor</th>
            <th className="px-4 py-2">Tamanho</th>
            <th className="px-4 py-2">Preço</th>
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
              <td className="border px-4 py-2">{vestido.codigo}</td>
              <td className="border px-4 py-2">{vestido.modelo}</td>
              <td className="border px-4 py-2">{vestido.cor}</td>
              <td className="border px-4 py-2">{vestido.tamanho}</td>
              <td className="border px-4 py-2">{vestido.valor}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Mensagem de erro */}
      {error && <div className="text-red-500">{error}</div>}

      {/* Botão de atualização */}
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        onClick={refreshVestidos}
      >
        Atualizar Lista
      </button>

      {loading && <div>Carregando...</div>}
    </div>
  );
};

export default TabelaVestidoConsulta;
