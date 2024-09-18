import React from 'react'

const CadastroForm = () => {
  return (
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
      <button type="submit">Cadastrar</button>
    </form>
    
  )
}

export default CadastroForm
