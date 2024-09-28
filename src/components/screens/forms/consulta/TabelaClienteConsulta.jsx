import React, { useEffect, useState } from "react";
import InputMask from "react-input-mask";

const TabelaClienteConsulta = () => {
  const [search, setSearch] = useState("");
  const [clientes, setClientes] = useState([]);
  const [clienteId, setClienteId] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [startIndex, setStartIndex] = useState(0);

  const [selectedClient, setSelectedClient] = useState({
    nome: "",
    cpf: "",
    telefone: "",
    email: "",
    endereco: "",
    cep: "",
    bairro: "",
  });

  useEffect(() => {
    const fetchAllClientes = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "http://ec2-18-216-195-241.us-east-2.compute.amazonaws.com:3000/api/cl"
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
        "http://ec2-18-216-195-241.us-east-2.compute.amazonaws.com:3000/api/cl"
      );
      if (!response.ok) {
        throw new Error("Erro ao buscar clientes");
      }
      const data = await response.json();
      setClientes(data);
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
        `http://ec2-18-216-195-241.us-east-2.compute.amazonaws.com:3000/api/cl/at/${selectedClient.cliente_id}`,
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
          mask="999.999.999-99"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar por CPF ou nome"
        />
        <button type="submit">Buscar</button>
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
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Salvar Alterações
          </button>
        </form>
      )}

      {/* Tabela de clientes */}
      <table className="table-auto w-full text-left">
        <thead className="bg-slate-600">
          <tr>
            <th className="px-4 py-2">Nome</th>
            <th className="px-4 py-2">CPF</th>
            <th className="px-4 py-2">Telefone</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Endereço</th>
            <th className="px-4 py-2">CEP</th>
            <th className="px-4 py-2">Bairro</th>
          </tr>
        </thead>
        <tbody>
          {clientes.slice(startIndex, startIndex + 5).map((cliente) => (
            <tr
              key={cliente.cliente_id}
              className={
                selectedClient &&
                selectedClient.cliente_id === cliente.cliente_id
                  ? "bg-slate-400 cursor-pointer"
                  : "hover:bg-slate-200 cursor-pointer"
              }
              onClick={() => setSelectedClient(cliente)}
            >
              <td className="px-4 py-2">{cliente.nome}</td>
              <td className="px-4 py-2">{cliente.cpf}</td>
              <td className="px-4 py-2">{cliente.telefone}</td>
              <td className="px-4 py-2">{cliente.email}</td>
              <td className="px-4 py-2">{cliente.endereco}</td>
              <td className="px-4 py-2">{cliente.cep}</td>
              <td className="px-4 py-2">{cliente.bairro}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Botão de refresh */}
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        onClick={refreshClientes}
      >
        Atualizar Lista
      </button>

      {/* Exibição de loading e erro */}
      {loading && <p>Carregando...</p>}
      {error && <p>{error}</p>}
    </div>
  );
};

export default TabelaClienteConsulta;
