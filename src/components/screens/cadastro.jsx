import React from 'react'
import { Link } from 'react-router-dom'
import CadastroForm from '../forms/CadastroForm'

const Cadastro = () => {
  return (
    <div>
      <h1>Cadastrar</h1>
      <CadastroForm />
      <p>
        <Link to="/registrar">Voltar</Link>
      </p>
    </div>
  )
}

export default Cadastro

