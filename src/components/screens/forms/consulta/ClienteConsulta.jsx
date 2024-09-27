import React, { useEffect, useState } from "react";

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
            "http://ec2-18-216-195-241.us-east-2.compute.amazonaws.com:3000/api/cl"
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
        `http://ec2-18-216-195-241.us-east-2.compute.amazonaws.com:3000/api/cl/cpf/${cpf}`
      );
      if (!response.ok) {
        throw new Error("Erro ao buscar clientes");
      }
      const data = await response.json();
      setClientes(Array.isArray(data) ? data : [data]); // Certifica-se de que `data` seja sempre um array
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
      fetchClientes(search);
    }
    if (clientes.length > 0) {
      setSelectedClient(clientes[0]);
      onSelect(clientes[0].cliente_id);
    } else {
      setSelectedClient(null);
      onSelect(null);
    }
  };

  return (
    <div>
      {multiple ? (
        <table className="table-auto w-full text-left">
          <thead className="bg-slate-600">
            <tr>
              <th className="px-4 py-2">CPF</th>
              <th className="px-4 py-2">Nome</th>
              <th className="px-4 py-2">Telefone</th>
              <th className="px-4 py-2">Email</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((cliente) => (
              <tr
                key={cliente.cliente_id}
                className={
                  selectedClient === cliente
                    ? "bg-slate-400 cursor-pointer"
                    : "hover:bg-slate-200 cursor-pointer"
                }
                onClick={() => {
                  setSelectedClient(cliente);
                  onSelect(cliente.cliente_id);
                }}
              >
                <td className="px-4 py-2">{cliente.cpf}</td>
                <td className="px-4 py-2">{cliente.nome}</td>
                <td className="px-4 py-2">{cliente.telefone}</td>
                <td className="px-4 py-2">{cliente.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="flex flex-col w-full justify-center max-w-7xl mx-auto text-nowrap mb-4">
          <label className="mb-2" htmlFor="vestido-select">
            Digite o CPF:
          </label>
          <form className="w-full text-nowrap  mb-4" onSubmit={handleSearch}>
            <input
              className="shadow appearance-none border rounded min-w-10 py-2 px-3 text-slate-200 leading-tight focus:outline-none"
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar CPF"
            />
            <button
              className="text-white font-bold py-2 px-4 rounded"
              type="submit"
            >
              Buscar
            </button>
          </form>

          {error && <p>{error}</p>}

          {loading ? (
            <p>Carregando...</p>
          ) : (
            <div className="flex flex-col w-full items-center justify-center bg-slate-800 rounded-md">
              <ul>
                {clientes.length > 0
                  ? clientes.map((cliente) => (
                      <li key={cliente.cliente_id} className="py-4">
                        <div className="flex flex-col ">
                          <div className="flex-1">
                            <p className="text-lg font-sans text-slate-300">
                              <strong>CPF:</strong> {cliente.cpf}
                            </p>
                            <p className="text-lg font-sans text-slate-300">
                              <strong>Nome:</strong> {cliente.nome}
                            </p>
                          </div>
                          <div className="flex-1">
                            <p className="text-lg font-sans text-slate-300">
                              <strong>Email:</strong> {cliente.email}
                            </p>
                            <p className="text-lg font-sans text-slate-300">
                              <strong>Telefone:</strong> {cliente.telefone}
                            </p>
                          </div>
                          <div className="flex-1">
                            <p className="text-lg font-sans text-slate-300">
                              <strong>Bairro:</strong> {cliente.bairro}
                            </p>
                            <p className="text-lg font-sans text-slate-300">
                              <strong>CEP:</strong> {cliente.cep}
                            </p>
                          </div>
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
      )}
    </div>
  );
};

export default ClienteConsulta;
