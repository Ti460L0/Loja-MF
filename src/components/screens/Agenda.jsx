import React, { useState, useEffect } from "react";
import Calendario from "./Calendario";

const Agenda = () => {
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState("");
  const [eventosFiltrados, setEventosFiltrados] = useState({
    devolucao: [],
    retirada: [],
    prova: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://ec2-18-216-195-241.us-east-2.compute.amazonaws.com:3000/api/lo"
        );
        if (!response.ok) {
          throw new Error("Erro ao buscar vestidos");
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
    const selectedDate = `${date.getDate().toString().padStart(2, "0")}/${(
      date.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}/${date.getFullYear()}`;
    setSelectedDate(selectedDate);
    const devolucao = eventos.filter(
      (event) => event.data_devolucao === selectedDate
    );
    const retirada = eventos.filter(
      (event) => event.data_retirada === selectedDate
    );
    const prova = eventos.filter((event) => event.data_prova === selectedDate);
    setEventosFiltrados({ devolucao, retirada, prova });
    console.log(selectedDate);
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  const { devolucao, retirada, prova } = eventosFiltrados;

  return (
    <div>
  <Calendario onDateSelect={handleSelect} eventos={eventos} />
  <p className="text-white">{selectedDate}</p>
  <table className="min-w-full table-auto border border-gray-800">
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
    {[
      ...devolucao.map(event => ({ ...event, tipoEvento: 'Devolução', data: event.data_devolucao })),
      ...retirada.map(event => ({ ...event, tipoEvento: 'Retirada', data: event.data_retirada })),
      ...prova.map(event => ({ ...event, tipoEvento: 'Prova', data: event.data_prova }))
    ].map((event, index) => (
      <tr key={index} className="border-b border-gray-600 hover:bg-gray-600">
        <td className="border border-gray-600 p-2">{event.data}</td>
        <td className="border border-gray-600 p-2">{event.tipoEvento}</td>
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
