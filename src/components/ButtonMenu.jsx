import React from 'react';
import { Link } from 'react-router-dom';

const ButtonMenu = (props) => {
  return (
    <div {...props}>
      <ul className="flex justify-center content-center gap-4 p-4 rounded-lg">
        <li>
          <Link
            to="/"
            className="text-black px-4 py-2 rounded-md transition duration-300"
          >
            Registrar
          </Link>
        </li>
        <li>
          <Link
            to="/cadastrar"
            className="text-black px-4 py-2 rounded-md transition duration-300"
          >
            Cadastrar
          </Link>
        </li>
        <li>
          <Link
            to="/consultar"
            className="text-black px-4 py-2 rounded-md transition duration-300"
          >
            Consultar
          </Link>
        </li>
        <li>
          <Link
            to="/agenda"
            className="text-black px-4 py-2 rounded-md transition duration-300"
          >
            Agenda
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default ButtonMenu;



