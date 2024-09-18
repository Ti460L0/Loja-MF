import React, { useState } from 'react';
import styles from '../../styles/FormularioCadastro.module.css';

const FormularioCadastro = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData); // Integre com sua API ou backend aqui
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <label>Nome</label>
      <input
        type="text"
        name="nome"
        value={formData.nome}
        onChange={handleChange}
        required
      />

      <label>Email</label>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
      />

      <label>Telefone</label>
      <input
        type="text"
        name="telefone"
        value={formData.telefone}
        onChange={handleChange}
      />

      <button type="submit">Cadastrar</button>
    </form>
  );
};

export default FormularioCadastro;
