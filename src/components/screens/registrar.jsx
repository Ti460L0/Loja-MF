import React from 'react'
import { Link } from 'react-router-dom'

const Registrar = () => {
  return (
    <div>
      <h1>Registrar</h1>
      <p>
        <Link to="/login">Já tem uma conta? Clique aqui para logar.</Link>
      </p>
      <form>
        <label>
          Nome:
          <input type="text" name="nome" />
        </label>
        <label>
          Email:
          <input type="email" name="email" />
        </label>
        <label>
          Senha:
          <input type="password" name="senha" />
        </label>
        <label>
          Confirmar Senha:
          <input type="password" name="confirmacao" />
        </label>
        <button type="submit">Registrar</button>
      </form>
    </div>
  )
}

export default Registrar
