import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./App.css";
import Cadastrar from "./components/screens/Cadastar.jsx";
import Consultar from "./components/screens/consultar.jsx";
import Agenda from "./components/screens/Agenda.jsx";
import MainPage from "./components/screens/MainPage.jsx";

const App = () => {
  return (
    <Router>
  <div className="flex flex-col w-full min-h-screen items-center justify-between overflow-x-hidden">
    <Header />
    <div className="flex-grow w-full mx-auto max-w-[100vw]">
      <main className="w-full h-full">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/Cadastrar" element={<Cadastrar />} />
          <Route path="/Consultar" element={<Consultar />} />
          <Route path="/Agenda" element={<Agenda />} />
        </Routes>
      </main>
    </div>
    <Footer className="w-full text-left p-4" />
  </div>
</Router>

  );
};

export default App;
