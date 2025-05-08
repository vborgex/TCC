import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import React from "react";
import "./Navbar.css";
import logo from "../assets/Logo2.svg";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-5">
      <a className="navbar-brand">
        <img src={logo} alt="Logo" height="55" />
      </a>
      <button
        className="navbar-toggler border-0"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNavDropdown">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <a className="nav-link" aria-current="page" href="/home">
              Início
            </a>
          </li>
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdownMenuLink"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Eventos
            </a>
            <ul
              className="dropdown-menu"
              aria-labelledby="navbarDropdownMenuLink"
            >
              <li>
                <a className="dropdown-item" href="">
                  <i className="bi bi-folder me-1"></i>
                  Meus projetos
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="/createProject">
                  <i className="bi bi-file-earmark-plus me-1"></i>
                  Criar projeto
                </a>
              </li>
            </ul>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Notificações
            </a>
          </li>
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdownMenuLink"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Minha conta
            </a>
            <ul
              className="dropdown-menu"
              aria-labelledby="navbarDropdownMenuLink"
            >
              <li>
                <a className="dropdown-item" href="#">
                  <i className="bi bi-person-circle me-1"></i>
                  Meu Perfil
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  <i className="bi bi-box-arrow-right me-1"></i>
                  Sair
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
