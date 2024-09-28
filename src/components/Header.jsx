import React from "react";
import ButtonMenu from "./ButtonMenu";

const Header = () => {
  return (
    <div className="sticky top-0 w-dvw text-center" style={{ background: 'linear-gradient(to right, #cea42e, #e4d494)' }}>
      <header className="flex max-w-7xl mx-auto items-center p-4 justify-between">
        <div className="flex items-center">
          <img
            className="w-20 h-30 drop-shadow-sm"
            src="img/logo.png"
            alt="Logo Milla Fashion"
          />
          <h2 className="text-left ml-6 text-2xl font-sans font-bold text-black">
            Sistema de vendas Milla Fashion
          </h2>
        </div>
        <ButtonMenu className="w-auto text-left" />
      </header>
    </div>
  );
};

export default Header;
