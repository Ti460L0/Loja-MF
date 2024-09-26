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
      calendarDays.push(<div key={`empty-${i}`} className="empty-day" />); // Dias vazios no início
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      calendarDays.push(
        <div
          key={day}
          className="calendar-day"
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
      const newDate = new Date(prevDate.setMonth(prevDate.getMonth() + direction));
      return newDate;
    });
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button onClick={() => changeMonth(-1)}>Anterior</button>
        <h2>{currentDate.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}</h2>
        <button onClick={() => changeMonth(1)}>Próximo</button>
      </div>
      <div className="calendar-grid">
        {renderDaysInMonth()}
      </div>
    </div>
  );
};

export default CalendarComponent;
