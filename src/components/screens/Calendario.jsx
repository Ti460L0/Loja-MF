import React, { useState } from 'react';

const CalendarComponent = ({ onDateSelect }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  // Função para renderizar os dias do mês atual
  const renderDaysInMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDayOfMonth = new Date(year, month, 1).getDay(); // Primeiro dia do mês
    const daysInMonth = new Date(year, month + 1, 0).getDate(); // Número de dias no mês

    const calendarDays = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      calendarDays.push(<div key={`empty-${i}`} className="py-2 px-4" />); // Dias vazios no início
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      calendarDays.push(
        <div
          key={day}
          className="w-12 h-12 py-2 px-4 rounded-lg text-center transition duration-800 ease-in-out hover:bg-gray-800 hover:text-white  cursor-pointer"
          onClick={() => handleDateClick(date)}
        >
          {day}
        </div>
      );
    }

    return calendarDays;
  };

  const handleDateClick = (date) => {
    onDateSelect(date); // Chama a função recebida como prop
  };

  // Função para mudar o mês
  const changeMonth = (direction) => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() + direction); // Muda o mês da nova data
      return newDate; // Retorna a nova data
    });
  };

  return (
    <div className="max-w-xl bg-gray-950 p-4 rounded-lg shadow-md">
    <div className="flex items-center justify-between mb-4">
      <button 
        onClick={() => changeMonth(-1)} 
        className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600 transition"	
      >
        Anterior
      </button>
      <h2 className="text-xl font-bold text-white">
        {currentDate.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
      </h2>
      <button 
        onClick={() => changeMonth(1)} 
        className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
      >
        Próximo
      </button>
    </div>
    <div className="grid grid-cols-7 gap-2 mb-2">
      {/* Nomes dos dias */}
      {["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"].map((day, index) => (
        <div key={index} className="text-center text-white font-semibold">{day}</div>
      ))}
    </div>
    <div className="grid grid-cols-7 gap-2">
      {renderDaysInMonth()}
    </div>
  </div>
  

  );
};

export default CalendarComponent;
