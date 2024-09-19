import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import "./App.css";

import Registrar from "./components/screens/registrar";
import Cadastro from "./components/screens/cadastro";
import Agenda from "./components/screens/agenda";

const App = () => {

  return (
    <Router>
      <div className="min-h-screen flex items-center justify-center bg-dark">
        <div className="w-dvw h-dvh bg-dark">
          <Header />
          <div className="w-dvw">
            <Sidebar />
          </div>
          <div className="flex">
            <main className="flex w-full h-dvh flex-col items-start bg-red-900">
              <Routes>
                <Route path="/Registrar" element={<Registrar />} />
                <Route path="/Cadastro" element={<Cadastro />} />
                <Route path="/Agenda" element={<Agenda />} />
              </Routes>
            </main>
          </div>
          <Footer />
        </div>
      </div>
    </Router>
  );
};

export default App;
