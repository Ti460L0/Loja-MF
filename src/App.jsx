import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./App.css";
import Cadastrar from "./components/screens/Cadastar";
import Consultar from "./components/screens/Consultar";
import Agenda from "./components/screens/Agendar";
import Registrar from "./components/screens/registrar";

const App = () => {
  return (
    <Router>
  <div className="flex flex-col bg-green-600 w-full min-h-screen items-center justify-between overflow-x-hidden">
    <Header />
    <div className="flex-grow w-full mx-auto max-w-[100vw]">
      <main className="w-full h-full bg-slate-600">
        <Routes>
          <Route path="/" element={<Registrar />} />
          <Route path="/Cadastrar" element={<Cadastrar />} />
          <Route path="/Consultar" element={<Consultar />} />
          <Route path="/Agenda" element={<Agenda />} />
        </Routes>
      </main>
    </div>
    <Footer className="w-full text-left p-4 bg-stone-800" />
  </div>
</Router>

  );
};

export default App;
