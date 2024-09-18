import React from 'react';

const VestidoForm = () => {
  return (
    <div>
      <h2>Cadastro de Vestido</h2>
      <form>
        <label>
          Descrição:
          <textarea name="descricao" rows="10" cols="30" />
        </label>
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}

export default VestidoForm;