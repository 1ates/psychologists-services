import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import Psychologists from './pages/Psychologists/Psychologists';
import Favorites from './pages/Favorites/Favorites';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/psychologists" element={<Psychologists />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </main>
      </Router>
    </AuthProvider>
  );
}

export default App;
