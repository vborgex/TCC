import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import React, { useState } from "react";
import "./index.css";
import logo from "../../assets/Logo.svg";

function EvaluationPage() {
  return (
    <div className="background d-flex align-items-center vh-100 p-2 justify-content-center  ">
      <div className="card-create-project">
        <div className="text-center text-uppercase">
          <h2 id="eventName">Educatech</h2>
        </div>
        <div className="row justify-content-start align-items-end">
          <div className="col-lg-6 col-12 d-flex flex-column align-items-start">
            <label className="label mb-2">Caráter Científico</label>
            <input
              className="form-control mb-2 grade-input"
              id="projectGrade"
              placeholder="Nota"
              type="number"
              min="0.1"
              max="10.0"
              step="0.1"
            />
            <textarea
              className="form-control mb-2"
              id="projectGradeComment"
              placeholder="Escreva uma descrição da nota."
              rows="4"
              maxLength="280"
            ></textarea>
          </div>
          <div className="col-lg-6 col-12 d-flex flex-column align-items-start">
            <label className="label mb-2">Caráter Científico</label>
            <input
              className="form-control mb-2 grade-input"
              id="projectGrade"
              placeholder="Nota"
              type="number"
              min="0.1"
              max="10.0"
              step="0.1"
            />
            <textarea
              className="form-control mb-2"
              id="projectGradeComment"
              placeholder="Escreva uma descrição da nota."
              rows="4"
              maxLength="280"
            ></textarea>
          </div>

          <div className="col-12 d-flex flex-column align-items-start">
            <label className="label mb-2">Anexo do projeto</label>
            <button className="btn btn-custom btn-regulamento mb-2">
              <i className="bi bi-file-earmark-arrow-up me-2"></i>
              Adicionar Anexo
            </button>
          </div>

          <div className="d-flex gap-2 mt-3">
            <button className="btn btn-cancelar rounded-pill flex-fill">
              Cancelar
            </button>
            <button className="btn btn-confirmar rounded-pill flex-fill">
              Confirmar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EvaluationPage;
