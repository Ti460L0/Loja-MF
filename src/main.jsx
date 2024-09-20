import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
// import Login from './components/Login/Login.jsx';
import './index.css';

// const Main = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   const handleLogin = (value) => {
//     setIsLoggedIn(value);
//   };

//   return (
//     <>
//       {isLoggedIn ? <App /> : <Login handleLogin={handleLogin} />}
//     </>
//   );
// };

const root = createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
