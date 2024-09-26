import React, { useState, useEffect } from "react";
import Calendario from "./Calendario";

const Agenda = () => {
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const selectedData = (date) => {
    const selectedDate = `${
      date.getDay() + 1 < 10 ? "0" : ""
    }${date.getDay() + 1}/${
      date.getMonth() + 1 < 10 ? "0" : ""
    }${date.getMonth() + 1}/${date.getFullYear()}`;
    console.log(selectedDate);
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <Calendario onDateSelect={selectedData} eventos={eventos} />
      <p>Conteúdo</p>
    </div>
  );
};

export default Agenda;

