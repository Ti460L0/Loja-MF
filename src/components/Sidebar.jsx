/**
 * Sidebar
 *
 * @returns {JSX.Element}
 */
import React from 'react';
import { Link } from 'react-router-dom';


const Sidebar = () => {
  return (
    <div className='bg-yellow-200'>
      <h2 className='text-2xl text-indigo-950 font-bold pb-4'>Menu</h2>
      <ul className='list-none'>
        <li><Link to="/Registrar">Registrar</Link></li>
        <li><Link to="/Cadastro">Cadastrar/Consultar</Link></li>
        <li><Link to="/Agenda">Agenda</Link></li>
      </ul>
    </div>
  );
};


export default Sidebar;

