import React, { useState, useEffect } from "react";

const ClienteConsulta = ({ multiple, onSelect }) => {
    const [clientes, setClientes] = useState([]);
    const [clienteSelecionado, setClienteSelecionado] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);  

    useEffect(() => {
        const fetchFiles = async () => {
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
            }
            setLoading(false);
        };
        fetchFiles();
    }, []);

    const handleSelect = (codigoCliente) => {
        const selectedFile = clientes.find((v) => v.codigo === codigoCliente);  

        if (selectedFile) {
            setClienteSelecionado(selectedFile);
            onSelect(selectedFile.cliente_id);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div>
            <table className="w-full text-nowrap bg-slate-600 shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <thead>
                    <tr>
                        <th className="w-1/6 px-4 py-2">Nome</th>   
                        <th className="w-1/6 px-4 py-2">CPF</th>
                        <th className="w-1/6 px-4 py-2">Endereço</th>
                        <th className="w-1/6 px-4 py-2">CEP</th>
                        <th className="w-1/6 px-4 py-2">Bairro</th>
                        <th className="w-1/6 px-4 py-2">Telefone</th>
                        <th className="w-1/6 px-4 py-2">Email</th>
                    </tr>
                </thead>
                <tbody>
                    {clientes.map((cliente) => (
                        <tr key={cliente.codigo}>
                            <td className="border px-4 py-2">{cliente.nome}</td>
                            <td className="border px-4 py-2">{cliente.cpf}</td>
                            <td className="border px-4 py-2">{cliente.endereco}</td>
                            <td className="border px-4 py-2">{cliente.cep}</td>
                            <td className="border px-4 py-2">{cliente.bairro}</td>
                            <td className="border px-4 py-2">{cliente.telefone}</td>
                            <td className="border px-4 py-2">{cliente.email}</td>
                            <td className="border px-4 py-2">
                                <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                    onClick={() => handleSelect(cliente.codigo)}
                                >
                                    Selecionar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ClienteConsulta;