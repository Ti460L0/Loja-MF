import React, { useEffect, useState } from "react";
import InputMask from "react-input-mask";

const TabelaClienteConsulta = () => {
  const [search, setSearch] = useState("");
  const [clientes, setClientes] = useState([]);
  const [clienteId, setClienteId] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  

  const [selectedClient, setSelectedClient] = useState({
    nome: "",
    cpf: "",
    telefone: "",
    email: "",
    endereco: "",
    cep: "",
    bairro: "",
  });

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;

  // Calcula o índice inicial e final com base na página atual
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedClientes = clientes.slice(startIndex, endIndex);

  // Funções para navegar entre as páginas
  const nextPage = () => {
    if (startIndex + itemsPerPage < clientes.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  useEffect(() => {
    const fetchAllClientes = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://vps55477.publiccloud.com.br/api/cl", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
          }
        );
        if (!response.ok) {
          throw new Error("Erro ao buscar clientes");
        }
        const data = await response.json();
        setClientes(data);
        setClienteId(data.cliente_id);
      } catch (error) {
        console.error(error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAllClientes();
  }, []);

  const refreshClientes = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://vps55477.publiccloud.com.br/api/cl/"
      );
      if (!response.ok) {
        throw new Error("Erro ao buscar clientes");
      }
      const data = await response.json();
      setClientes(data);
      setCurrentPage(0); // Reiniciar a página atual para a primeira página
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
      const clienteEncontrado = clientes.find(
        (cliente) =>
          cliente.cpf.toLowerCase().includes(search.toLowerCase()) ||
          cliente.nome.toLowerCase().includes(search.toLowerCase())
      );
      if (clienteEncontrado) {
        setSelectedClient(clienteEncontrado);
      } else {
        alert("Cliente não encontrado");
        setSelectedClient(null);
      }
    }
  };

  const handleUpdateClient = async (e) => {
    e.preventDefault();
    if (!selectedClient) {
      setError("Nenhum cliente selecionado para atualização");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(
        `https://vps55477.publiccloud.com.br/api/cl/at/${selectedClient.cliente_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(selectedClient),
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao atualizar cliente");
      }

      const updatedClient = await response.json();

      setClientes((prevClientes) =>
        prevClientes.map((cliente) =>
          cliente.cliente_id === updatedClient.cliente_id
            ? updatedClient
            : cliente
        )
      );

      setSelectedClient(updatedClient);
      alert("Cliente atualizado com sucesso!");

      // Chamar a função de refresh após a atualização
      await refreshClientes();
    } catch (error) {
      console.error("Erro ao atualizar cliente:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Formulário de busca */}
      <form onSubmit={handleSearch}>
        <InputMask
          className="shadow appearance-none border rounded mt-4 py-2 px-3 text-slate-200 leading-tight focus:outline-none focus:shadow-outline"
          mask="999.999.999-99"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar por CPF ou nome"
        />
        <button className="bg-green-700 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out" type="submit">Buscar</button>
      </form>

      {/* Formulário de edição do cliente */}
      {selectedClient && (
        <form onSubmit={handleUpdateClient}>
          <label className="block text-left mb-2">
            Nome:
            <input
              className="block w-full px-4 py-2 text-slate-700 bg-white border border-solid border-slate-300 rounded transition ease-in-out"
              type="text"
              name="nome"
              value={selectedClient.nome || ""}
              onChange={(e) =>
                setSelectedClient({ ...selectedClient, nome: e.target.value })
              }
            />
          </label>
          <label className="block text-left mb-2">
            CPF:
            <InputMask
              mask="999.999.999-99"
              className="block w-full px-4 py-2 text-slate-700 bg-white border border-solid border-slate-300 rounded transition ease-in-out"
              name="cpf"
              value={selectedClient.cpf || ""}
              onChange={(e) =>
                setSelectedClient({ ...selectedClient, cpf: e.target.value })
              }
            />
          </label>
          <label className="block text-left mb-2">
            Telefone:
            <InputMask
              mask="(99) 99999-9999"
              className="block w-full px-4 py-2 text-slate-700 bg-white border border-solid border-slate-300 rounded transition ease-in-out"
              name="telefone"
              value={selectedClient.telefone || ""}
              onChange={(e) =>
                setSelectedClient({
                  ...selectedClient,
                  telefone: e.target.value,
                })
              }
            />
          </label>
          <label className="block text-left mb-2">
            Email:
            <input
              className="block w-full px-4 py-2 text-slate-700 bg-white border border-solid border-slate-300 rounded transition ease-in-out"
              type="email"
              name="email"
              value={selectedClient.email || ""}
              onChange={(e) =>
                setSelectedClient({
                  ...selectedClient,
                  email: e.target.value,
                })
              }
            />
          </label>
          <label className="block text-left mb-2">
            Bairro:
            <input
              className="block w-full px-4 py-2 text-slate-700 bg-white border border-solid border-slate-300 rounded transition ease-in-out"
              type="text"
              name="bairro"
              value={selectedClient.bairro || ""}
              onChange={(e) =>
                setSelectedClient({
                  ...selectedClient,
                  bairro: e.target.value,
                })
              }
            />
          </label>
          <label className="block text-left mb-2">
            CEP:
            <InputMask
              mask="99999-999"
              className="block w-full px-4 py-2 text-slate-700 bg-white border border-solid border-slate-300 rounded transition ease-in-out"
              name="cep"
              value={selectedClient.cep || ""}
              onChange={(e) =>
                setSelectedClient({
                  ...selectedClient,
                  cep: e.target.value,
                })
              }
            />
          </label>
          <label className="block text-left mb-2">
            Endereço:
            <input
              className="block w-full px-4 py-2 text-slate-700 bg-white border border-solid border-slate-300 rounded transition ease-in-out"
              type="text"
              name="endereco"
              value={selectedClient.endereco || ""}
              onChange={(e) =>
                setSelectedClient({
                  ...selectedClient,
                  endereco: e.target.value,
                })
              }
            />
          </label>

          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded m-2"
            type="submit"
          >
            Salvar Alterações
          </button>
        </form>
      )}

      {/* Tabela de clientes */}
      <table className="table-auto w-full text-left shadow-md rounded m-4">
  <thead className="bg-brown">
    <tr>
      <th className="px-4 py-2 text-white">Nome</th>
      <th className="px-4 py-2 text-white">CPF</th>
      <th className="px-4 py-2 text-white">Telefone</th>
      <th className="px-4 py-2 text-white">Email</th>
      <th className="px-4 py-2 text-white">Endereço</th>
      <th className="px-4 py-2 text-white">CEP</th>
      <th className="px-4 py-2 text-white">Bairro</th>
    </tr>
  </thead>
  <tbody>
    {clientes.slice(startIndex, startIndex + 5).map((cliente) => (
      <tr
        key={cliente.cliente_id}
        className={
          selectedClient && selectedClient.cliente_id === cliente.cliente_id
            ? "bg-slate-400 cursor-pointer"
            : "hover:bg-slate-200 cursor-pointer"
        }
        onClick={() => setSelectedClient(cliente)}
      >
        <td className="border bg-white text-black px-4 py-2">{cliente.nome}</td>
        <td className="border bg-white text-black px-4 py-2">{cliente.cpf}</td>
        <td className="border bg-white text-black px-4 py-2">{cliente.telefone}</td>
        <td className="border bg-white text-black px-4 py-2">{cliente.email}</td>
        <td className="border bg-white text-black px-4 py-2">{cliente.endereco}</td>
        <td className="border bg-white text-black px-4 py-2">{cliente.cep}</td>
        <td className="border bg-white text-black px-4 py-2">{cliente.bairro}</td>
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
          disabled={startIndex + itemsPerPage >= clientes.length}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Próximo
        </button>
      </div>

      {/* Exibição de loading e erro */}
      {loading && <p>Carregando...</p>}
      {error && <p>{error}</p>}
    </div>
  );
};

export default TabelaClienteConsulta;
