/**
 * Sidebar
 *
 * @returns {JSX.Element}
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { buttonEffect } from './styles/styles';


const Sidebar = () => {
  
  return (
    <div className='bg-yellow-200'>
      <h2 className='text-2xl text-indigo-950 font-bold pb-4'>Menu</h2>
      <ul className='flex justify-center content-center gap-4'>
        <li className={buttonEffect}><Link to="/Registrar">Registrar</Link></li>
        <li className={buttonEffect}><Link to="/Cadastro">Cadastrar/Consultar</Link></li>
        <li className={buttonEffect}><Link to="/Agenda">Agenda</Link></li>
      </ul>
    </div>
  );
};


export default Sidebar;

