import React, { useState, useEffect } from "react";
import Calendario from "./Calendario";
import LocacoesConsulta from "./forms/consulta/LocacoesConsulta";

const Agenda = () => {
  const [locacoes, setLocacoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(null);
  const [locacoesFiltradas, setLocacoesFiltradas] = useState({
    devolucao: [],
    retirada: [],
    prova: [],
  });
  const [formData, setFormData] = useState({
    data_retirada: "",
    data_devolucao: "",
    data_prova: "",
    notas: "",
  });

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;

  // Calcula o índice inicial e final com base na página atual
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedLocacoes = locacoes.slice(startIndex, endIndex);

  // Funções para navegar entre as páginas
  const nextPage = () => {
    if (startIndex + itemsPerPage < locacoes.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };


  
  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://vps55477.publiccloud.com.br/api/lo"
      );
      if (!response.ok) {
        throw new Error("Erro ao buscar locações");
      }
      const data = await response.json();
      setLocacoes(data);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  fetchData();

  const handleSelect = (date) => {
    setSelectedDate(date);
    const selectedDateStr = `${date.getDate().toString().padStart(2, "0")}/${(
      date.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}/${date.getFullYear()}`;

    const locacoesFiltradas = {
      devolucao: [],
      retirada: [],
      prova: [],
    };

    locacoes.forEach((locacao) => {
      if (locacao.data_devolucao === selectedDateStr) {
        locacoesFiltradas.devolucao.push(locacao);
      }
      if (locacao.data_retirada === selectedDateStr) {
        locacoesFiltradas.retirada.push(locacao);
      }
      if (locacao.data_prova === selectedDateStr) {
        locacoesFiltradas.prova.push(locacao);
      }
    });

    setLocacoesFiltradas(locacoesFiltradas);
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  const { devolucao, retirada, prova } = locacoesFiltradas;

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-7xl mx-auto bg-lightBrown shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div className="flex flex-row w-full items-center justify-center gap-8">
        <Calendario onDateSelect={handleSelect} locacoes={locacoes} />
        <LocacoesConsulta formData={formData} refreshData={fetchData} />
      </div>

      {selectedDate && (
        <p className="text-white">
          Data Selecionada: {selectedDate.toLocaleDateString("pt-BR")}
        </p>
      )}

<table className="min-w-full table-auto border border-gray-800 mt-4">
  <thead className="bg-brown text-white">
    <tr>
      <th className="border border-gray-600 p-2">Data</th>
      <th className="border border-gray-600 p-2">Tipo de Evento</th>
      <th className="border border-gray-600 p-2">Notas</th>
      <th className="border border-gray-600 p-2">Nome</th>
      <th className="border border-gray-600 p-2">Tipo</th>
      <th className="border border-gray-600 p-2">Modelo</th>
    </tr>
  </thead>
  <tbody>
    {[...devolucao, ...retirada, ...prova].map((locacao, index) => (
      <tr
        key={index}
        className="border-b border-gray-600 hover:bg-slate-200 cursor-pointer"
        onClick={() => setFormData(locacao)}
      >
        <td className="border bg-white text-black p-2">
          {locacao.data_devolucao ||
            locacao.data_retirada ||
            locacao.data_prova}
        </td>
        <td className="border bg-white text-black p-2">
          {locacao.data_devolucao
            ? "Devolução"
            : locacao.data_retirada
            ? "Retirada"
            : "Prova"}
        </td>
        <td className="border bg-white text-black p-2">{locacao.notas}</td>
        <td className="border bg-white text-black p-2">{locacao.nome}</td>
        <td className="border bg-white text-black p-2">{locacao.tipo}</td>
        <td className="border bg-white text-black p-2">{locacao.modelo}</td>
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
          disabled={startIndex + itemsPerPage >= locacoes.length}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Próximo
        </button>
      </div>
    </div>
  );
};

export default Agenda;
