import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import FormularioCadastro from './components/MainContent';
import './App.css';
  

const App = () => {
  return (
    <Router>
      <div className="app-container"> 
        <Header />
        <div className="content">
          <Sidebar />
          <main className="main-content">
            <Routes>
              <Route path="/registrar" element={<h2>Página de Registro</h2>} />
              <Route path="/cadastrar" element={<FormularioCadastro />} />
              <Route path="/agenda" element={<h2>Página de Agenda</h2>} />
            </Routes>
          </main>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
