import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import Login from "./components/Login/Login.jsx";
// import Register from "./components/Login/Register.jsx"; 
import "./index.css";
import "./App.css";

function Root() {
  const [isLogged, setIsLogged] = useState(false); // Mudar para true para modo desenvolvimento
  // const [isRegistering, setIsRegistering] = useState(false); // Estado para controlar a tela de registro

  const handleLogin = () => setIsLogged(true);
  // const handleRegister = () => setIsRegistering(true); // Função para abrir a tela de registro

  // if (isRegistering) {
  //   return <Register onRegister={() => setIsRegistering(false)} />; // Se registrando
  // }

  if (!isLogged) {
    return <Login onLogin={handleLogin} />; // Tela de login onRegister={handleRegister} />;
  }

  return <App />; // Tela principal do aplicativo
}

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <Root />
  </StrictMode>
);
