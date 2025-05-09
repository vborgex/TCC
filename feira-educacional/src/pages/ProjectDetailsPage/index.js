import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import React, { useState } from "react";
import "./index.css";

function ProjectDetailsPage() {
  return (
    <div className="background d-flex align-items-center vh-100 p-2 justify-content-center">
      <div className="card-create-project">
        <div className="text-center text-uppercase">
          <h2 id="eventName">Educatech</h2>
        </div>
        <div className="row justify-content-start align-items-end">
          <div className="col-lg-6 col-12 d-flex flex-column align-items-start">
            <label className="label mb-2">Nome do projeto</label>
            <h>Aqui o nominhooo</h>
          </div>
          <div className="col-lg-6 col-12 d-flex flex-column align-items-start">
            <label className="label mb-2">Categoria</label>
            <h>Pensamento Computacional</h>
          </div>
          <div className="col-lg-6 col-12 d-flex flex-column align-items-start">
            <label className="label mb-2">Alunos</label>
            <ul>
              <li><h>Pensamento Computacional</h></li>
              <li><h>Pensamento Computacional</h></li>
            </ul>
          </div>
          <div className="col-12 d-flex flex-column align-items-start">
            <label className="label mb-2">Resumo do projeto</label>
            <p className="text-justify">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam faucibus feugiat erat, vel condimentum neque ultrices luctus. Curabitur dignissim diam ut urna sagittis tempor. Donec a velit sodales, iaculis dolor in, elementum lacus. Morbi semper justo eu sapien scelerisque, eget maximus nibh accumsan. Duis consectetur orci a eleifend consequat. Duis a tortor lorem. Cras id massa lectus.</p>
          </div>

          <div className="col-12 d-flex flex-column align-items-start">
            <label className="label mb-2">Anexo do projeto</label>
            <button className="btn btn-custom btn-regulamento mb-2">
              <i className="bi bi-file-earmark-arrow-down me-2"></i>
              Baixar Anexo
            </button>
          </div>  
        </div>
      </div>
    </div>
  );
}

export default ProjectDetailsPage;
