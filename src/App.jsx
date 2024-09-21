import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ButtonMenu from "./components/ButtonMenu";
import "./App.css";

import Registrar from "./components/screens/registrar";
import Consultar from "./components/screens/consultar";
import Agenda from "./components/screens/agenda";

const App = () => {
  return (
    <Router>
      <div className="flex flex-col w-full max-w-6xl min- m-0 items-center justify-center">
        <Header className="sticky top-0 w-full text-left p-4 bg-stone-800"/>
        <ButtonMenu />
        <div className="flex">
          <main className="w-full h-full bg-slate-600">
            <Routes>
              <Route path="/Registrar" element={<Registrar />} />
              <Route path="/Consultar" element={<Consultar />} />
              <Route path="/Agenda" element={<Agenda />} />
            </Routes>
          </main>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
