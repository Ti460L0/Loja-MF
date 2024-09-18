import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import './App.css';
  

const App = () => {
  return (
    <Router>
      <div className="min-h-screen flex items-center justify-center bg-dark">
        <div className="w-dvw h-dvh bg-dark">
          <Header />
          <div className="flex">
            <Sidebar />
            <main className="w-dvw h-full flex flex-col items-start bg-dark">
              <Routes>
                <Route path="/registrar" element={<h2 className="text-3xl font-bold text-[#F7DC6F]">Pgina de Registro</h2>} />
                <Route path='/cadastrar' element={<h2 className="text-3xl font-bold text-[#F7DC6F]">Pgina de Cadastramento</h2>} />
                <Route path="/agenda" element={<h2 className="text-3xl font-bold text-[#F7DC6F]">Pgina de Agenda</h2>} />
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
