import React from 'react'
import { Link } from 'react-router-dom'

const Agenda = () => {
  return (
    <div>
      <h1>Agendar Locação</h1>
      <p>
        <button><Link to="/registrar">Voltar</Link></button>
      </p>
    </div>
  )
}

export default Agenda
