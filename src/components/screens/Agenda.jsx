import React, { useState, useEffect } from "react";
import Calendario from "./Calendario";
import LocacoesConsulta from "./forms/consulta/LocacoesConsulta";

const Agenda = () => {
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(null);
  const [eventosFiltrados, setEventosFiltrados] = useState({
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://ec2-18-216-195-241.us-east-2.compute.amazonaws.com:3000/api/lo"
        );
        if (!response.ok) {
          throw new Error("Erro ao buscar locações");
        }
        const data = await response.json();
        setEventos(data);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleSelect = (date) => {
    setSelectedDate(date);
    const selectedDateStr = `${date.getDate().toString().padStart(2, "0")}/${(
      date.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}/${date.getFullYear()}`;

    const eventosFiltrados = {
      devolucao: [],
      retirada: [],
      prova: [],
    };

    eventos.forEach((event) => {
      if (event.data_devolucao === selectedDateStr) {
        eventosFiltrados.devolucao.push(event);
      }
      if (event.data_retirada === selectedDateStr) {
        eventosFiltrados.retirada.push(event);
      }
      if (event.data_prova === selectedDateStr) {
        eventosFiltrados.prova.push(event);
      }
    });

    setEventosFiltrados(eventosFiltrados);
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  const { devolucao, retirada, prova } = eventosFiltrados;

  return (
    <div>
      <div className="flex flex-row w-full items-center justify-center gap-8">
        <Calendario onDateSelect={handleSelect} eventos={eventos} />
        <LocacoesConsulta formData={formData} />
      </div>

      {selectedDate && (
        <p className="text-white">
          Data Selecionada: {selectedDate.toLocaleDateString("pt-BR")}
        </p>
      )}

      <table className="min-w-full table-auto border border-gray-800 mt-4">
        <thead>
          <tr className="bg-gray-700 text-white">
            <th className="border border-gray-600 p-2">Data</th>
            <th className="border border-gray-600 p-2">Tipo de Evento</th>
            <th className="border border-gray-600 p-2">Observação</th>
            <th className="border border-gray-600 p-2">Nome</th>
            <th className="border border-gray-600 p-2">Tipo</th>
            <th className="border border-gray-600 p-2">Modelo</th>
          </tr>
        </thead>
        <tbody>
          {[...devolucao, ...retirada, ...prova].map((event, index) => (
            <tr
              key={index}
              className="border-b border-gray-600 hover:bg-gray-600 cursor-pointer"
              onClick={() => setFormData(event)}
            >
              <td className="border border-gray-600 p-2">
                {event.data_devolucao ||
                  event.data_retirada ||
                  event.data_prova}
              </td>
              <td className="border border-gray-600 p-2">
                {event.data_devolucao
                  ? "Devolução"
                  : event.data_retirada
                  ? "Retirada"
                  : "Prova"}
              </td>
              <td className="border border-gray-600 p-2">{event.notas}</td>
              <td className="border border-gray-600 p-2">{event.nome}</td>
              <td className="border border-gray-600 p-2">{event.tipo}</td>
              <td className="border border-gray-600 p-2">{event.modelo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Agenda;
