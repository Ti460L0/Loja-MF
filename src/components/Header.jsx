import React from "react";
import ButtonMenu from "./ButtonMenu";

const Header = () => {
  return (
    <div className="sticky top-0 w-dvw text-center" style={{ background: 'linear-gradient(to right, #d4af37,#d4af37, #f0e68c)' }}>
  <header className="flex max-w-7xl mx-auto items-center p-2 justify-center">
    <img
      className="w-20 h-30 drop-shadow-sm"
      src="img/logo.png"
      alt="Logo Milla Fashion"
    />
    <h2 className="text-left ml-6 text-2xl font-sans font-bold">
      Sistema de vendas Milla Fashion{" "}
    </h2>
    <ButtonMenu className="sticky top-12 w-full text-left content-center" />
  </header>
</div>

  );
};

export default Header;
