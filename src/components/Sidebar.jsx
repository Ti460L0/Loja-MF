import React from 'react';
import { Link } from 'react-router-dom';


const Sidebar = () => {
  return (
    <div className=' bg-yellow-700'>
      <h2>Menu</h2>
      <ul className='list-none'>
        <li><Link to="/registrar">Registrar</Link></li>
        <li><Link to="/cadastrar">Cadastrar/Consultar</Link></li>
        <li><Link to="/agenda">Agenda</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
