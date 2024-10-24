import React, { useEffect, useState } from "react";
import InputMask from "react-input-mask";

const ClienteConsulta = ({ multiple, onSelect }) => {
  const [search, setSearch] = useState("");
  const [clientes, setClientes] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);

  useEffect(() => {
    if (multiple) {
      const fetchAllClientes = async () => {
        setLoading(true);
        try {
          const response = await fetch(
            "vps55477.publiccloud.com.br/api/cl"
          );
          if (!response.ok) {
            throw new Error("Erro ao buscar clientes");
          }
          const data = await response.json();
          setClientes(data);
        } catch (error) {
          console.error(error);
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };
      fetchAllClientes();
    }
  }, [multiple]);

  const fetchClientes = async (cpf) => {
    setLoading(true);
    try {
      const response = await fetch(
        `vps55477.publiccloud.com.br/api/cl/cpf/${cpf}`
      );
      if (!response.ok) {
        throw new Error("");
      }
      const data = await response.json();
      if (data) {
        setClientes([data]);
        setSelectedClient(data);
        onSelect(data); // Passa o cliente completo, não apenas o ID
      } else {
        setClientes([]);
        setSelectedClient(null);
        onSelect(null);
      }
    } catch (error) {
      console.error(error);
      setError(error.message);
      setClientes([]);
      setSelectedClient(null);
      onSelect(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      fetchClientes(search);
    } else {
      setClientes([]);
      setSelectedClient(null);
      onSelect(null);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-4">
      <label className="mb-2" htmlFor="vestido-select">
        Digite o CPF:
      </label>
      <form className="flex flex-row w-full" onSubmit={handleSearch}>
        <InputMask
          className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-200 leading-tight focus:outline-none focus:shadow-outline"
          type="search"
          value={search}
          mask="999.999.999-99"
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar CPF"
          required
        />
        <button
          className="bg-green-700 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
          type="submit"
        >
          Buscar
        </button>
      </form>

      {error && <p>{error}</p>}

      {loading ? (
        <p className="text-center">Buscando...</p>
      ) : (
        <div className="flex flex-col w-full items-center mx-auto bg-yellow-950 p-4 rounded-lg max-w-md shadow-lg shadow-black">
          <ul className="list-inside">
            {clientes.length > 0
              ? clientes.map((cliente) => (
                  <li key={cliente.cliente_id} className="py-4">
                    <div className="flex flex-col space-y-2">
                      <h2 className="text-xl text-nowrap font-bold tracking-tight text-yellow-800">
                        Informações do Cliente
                      </h2>
                      <hr className="w-full my-4 border-b-2 border-yellow-800"></hr>
                      <p className="text-lg font-medium text-slate-300">
                        <strong>CPF:</strong> {cliente.cpf}
                      </p>
                      <p className="text-lg font-medium text-slate-300">
                        <strong>Nome:</strong> {cliente.nome}
                      </p>
                      <p className="text-lg font-medium text-slate-300">
                        <strong>Email:</strong> {cliente.email}
                      </p>
                      <p className="text-lg font-medium text-slate-300">
                        <strong>Telefone:</strong> {cliente.telefone}
                      </p>
                      <p className="text-lg font-medium text-slate-300">
                        <strong>Bairro:</strong> {cliente.bairro}
                      </p>
                      <p className="text-lg font-medium text-slate-300">
                        <strong>CEP:</strong> {cliente.cep}
                      </p>
                    </div>
                  </li>
                ))
              : search && (
                  <p className="text-center">Nenhum cliente encontrado</p>
                )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ClienteConsulta;
