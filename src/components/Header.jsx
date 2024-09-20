import React from "react";

const Header = (props) => {
  return (
    <header {...props}>
      <div className="flex flex-row justify-between">
        <img className="w-20 h-20 drop-shadow-sm" src="./logo.png" alt="Logo Milla Fashion" />
        <h2 className="text-3xl text-indigo-950 font-sans font-bold">
          Sistema de vendas Milla Fashion{" "}
        </h2>
      </div>
    </header>
  );
};

export default Header;
