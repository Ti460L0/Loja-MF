import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../../styles/Sidebar.module.css';

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <h2>Menu</h2>
      <ul className={styles.ul}>
        <li><Link to="/registrar">Registrar</Link></li>
        <li><Link to="/cadastrar">Cadastrar/Consultar</Link></li>
        <li><Link to="/agenda">Agenda</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
