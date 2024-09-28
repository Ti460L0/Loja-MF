import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import Login from './components/Login/Login.jsx';
import Register from './components/Login/Register.jsx'; // Importando o componente de registro
import './index.css';

function Root() {
  const [isLogged, setIsLogged] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false); // Estado para controlar a tela de registro

  const handleLogin = () => setIsLogged(true);
  const handleRegister = () => setIsRegistering(true); // Função para abrir a tela de registro

  if (isRegistering) {
    return <Register onRegister={() => setIsRegistering(false)} />; // Se registrando
  }

  if (!isLogged) {
    return <Login onLogin={handleLogin} onRegister={handleRegister} />; // Tela de login
  }

  return <App />; // Tela principal do aplicativo
}

const root = createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <Root />
  </StrictMode>
);
