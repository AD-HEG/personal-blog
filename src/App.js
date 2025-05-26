import React from 'react';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Skills from './components/Skills/Skills';
import Experience from './components/Experience/Experience';
import Formation from './components/Formation/Formation';
import Contact from './components/Contact/Contact';
import ApiActivity from './components/ApiActivity/ApiActivity';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Home />
      <Skills />
      <Experience />
      <Formation />
      <Contact />
      <ApiActivity />

      {/* Footer */}
      <footer className="py-3" style={{ backgroundColor: '#001a4d', color: '#deba5a' }}>
        <div className="container text-center">
          <p>&copy; 2025 Ana Sierra - Todos los derechos reservados</p>
        </div>
      </footer>
    </div>
  );
}

export default App;