import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CharacterDetail from './pages/CharacterDetail'; // ¡Asegúrate de importar este componente!

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/personajes/:id" element={<CharacterDetail />} />
    </Routes>
  );
}

export default App;