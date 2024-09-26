import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';

const Agenda = () => {
  const [value, setValue] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Função para buscar eventos do banco de dados
  const fetchEvents = async () => {
    try {
      const res = await axios.get('http://ec2-18-216-195-241.us-east-2.compute.amazonaws.com:3000/api/lo');  // Chamada ao endpoint
      setEvents(res.data);
    } catch (err) {
      console.error('Erro ao buscar eventos:', err);
    }
  };

  useEffect(() => {
    fetchEvents(); // Carregar eventos ao montar o componente
  }, []);

  // Função para verificar se uma data tem um evento
  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const eventDate = events.find((event) =>
        new Date(event.date).toDateString() === date.toDateString()
      );
      return eventDate ? <div className="bg-green-200 p-1 rounded">{eventDate.description}</div> : null;
    }
  };

  // Função para obter o evento do dia selecionado
  const handleDateChange = (selectedDate) => {
    setValue(selectedDate);
    const eventOnSelectedDate = events.find((event) =>
      new Date(event.date).toDateString() === selectedDate.toDateString()
    );
    setSelectedEvent(eventOnSelectedDate || null);
  };

  return (
    <div className="w-full bg-slate-600 shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h1 className="text-center text-white font-bold text-xl mb-4">Consulte suas locações</h1>
      
      <div className="flex justify-center gap-4 m-2">
        <Calendar
          className="bg-black text-white"
          onChange={handleDateChange}
          value={value}
          tileContent={tileContent}  // Mostra eventos no calendário
        />
      </div>
      
      <div className="block justify-center gap-10 m-10 text-center">
        <p className="text-white text-lg">Data selecionada: <span className="font-bold">{value.toLocaleDateString('pt-BR')}</span></p>
        <button 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
          onClick={() => console.log("Selecionado:", value)}>
          Ver Data Selecionada
        </button>
      </div>

      <div className="bg-white p-4 rounded shadow-md">
        <h2 className="text-center font-bold text-lg mb-2">Eventos do dia:</h2>
        {selectedEvent ? (
          <div className="text-center">
            <p className="text-green-700">{selectedEvent.description}</p>
          </div>
        ) : (
          <p className="text-center text-red-500">Nenhum evento para esta data.</p>
        )}
      </div>
    </div>
  );
};

export default Agenda;
