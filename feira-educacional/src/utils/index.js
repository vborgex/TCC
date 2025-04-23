import React, { useState } from 'react';
import './Navbar.css'; // Importando o CSS personalizado

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={`top-navbar ${isOpen ? 'open' : ''}`}>
      <div className="container-fluid">
        {/* Logo à esquerda */}
        <a className="navbar-brand" href="#">MinhaLogo</a>

        {/* Botão toggle para mobile */}
        <button className="navbar-toggler" onClick={toggleNavbar}>
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Itens da navbar */}
        <div className={`nav-items ${isOpen ? 'open' : ''}`}>
          <a href="#inicio" className="nav-item">
            <span>Início</span>
          </a>
          <a href="#sobre" className="nav-item">
            <span>Sobre</span>
          </a>
          <a href="#contato" className="nav-item">
            <span>Contato</span>
          </a>
        </div>
      </div>
    </nav>
  );
}
