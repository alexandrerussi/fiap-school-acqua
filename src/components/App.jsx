// src/components/App.jsx
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import RegistrationForm from './RegistrationForm';
import DisplayPlayers from './DisplayPlayers';
import { PlayerProvider } from '../context/PlayerContext';

function Main() {
  const location = useLocation(); // Corretamente posicionado dentro do Router

  return (
    <PlayerProvider>
      <div className="App">
        {/* Condiciona a renderização do cabeçalho */}
        {location.pathname !== '/display' && <h1>Registro de Jogadores - Acqua Robot</h1>}
        <Routes>
          <Route path="/" element={<RegistrationForm />} />
          <Route path="/display" element={<DisplayPlayers />} />
        </Routes>
      </div>
    </PlayerProvider>
  );
}

// O componente Main é agora um filho do Router
function App() {
  return (
    <Router>
      <Main />
    </Router>
  );
}

export default App;
