import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import React, { useState } from "react";
import "./index.css";
import logo from "../../assets/Logo.svg";
import Navbar from "../../components/navbar";

function CreateProjectPage() {
  const [selectedEducationLevel, setSelectedEducationLevel] = useState(
    "Nível de Escolaridade"
  );
  const [selectedCategory, setSelectedCategory] = useState(
    "Selecionar Categoria"
  );
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };
  const handleEducationLevelSelect = (educationLevel) => {
    setSelectedEducationLevel(educationLevel);
  };

  return (
    <div>
      <Navbar />
      <div className="background d-flex min-vh-100 p-2 justify-content-center overflow-auto">
        <div className="card-create-project p-10 w-100 max-w-900 mt-4 mb-4">
          <div className="text-center text-uppercase">
            <h2 id="eventName">Educatech</h2>
          </div>
          <div className="row justify-content-start align-items-end">
            <div className="col-lg-6 col-12 d-flex flex-column align-items-start">
              <label className="label mb-2">Nome do projeto</label>
              <input
                className="form-control mb-2"
                id="projectName"
                placeholder="Nome do projeto"
              />
            </div>
            <div className="col-lg-6 col-12 d-flex flex-column align-items-start">
              <button className="btn btn-custom btn-regulamento mb-2">
                <i className="bi bi-book-half me-2"></i>
                Baixar Regulamento
              </button>
            </div>
            <div className="col-12 d-flex flex-column align-items-start">
              <label className="label mb-2">Resumo do projeto</label>
              <textarea
                className="form-control mb-2"
                id="projectSummary"
                placeholder="Escreva um resumo do projeto..."
                rows="4"
                maxLength="280"
              ></textarea>
            </div>

            <div className="col-12 col-lg-6 dropdown mb-2 align-items-center">
              <label className="label mb-2">Escolaridade dos alunos</label>
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {selectedEducationLevel}
              </button>
              <ul
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton"
              >
                <li>
                  <button
                    className="dropdown-item"
                    type="button"
                    onClick={() =>
                      handleEducationLevelSelect("Ensino Fundamental")
                    }
                  >
                    Ensino Fundamental
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item"
                    type="button"
                    onClick={() =>
                      handleEducationLevelSelect("Ensino Médio/Técnico")
                    }
                  >
                    Ensino Médio/Técnico
                  </button>
                </li>
              </ul>
            </div>

            <div className="col-12 col-lg-6 dropdown mb-2 align-items-center">
              <label className="label mb-2">Categoria do Projeto</label>
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {selectedCategory}
              </button>
              <ul
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton"
              >
                <li>
                  <button
                    className="dropdown-item"
                    type="button"
                    onClick={() =>
                      handleCategorySelect("Pensamento Computacional")
                    }
                  >
                    Pensamento Computacional
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item"
                    type="button"
                    onClick={() =>
                      handleCategorySelect(
                        "Automação, Robótica e Novos Produtos"
                      )
                    }
                  >
                    Automação, Robótica e Novos Produtos
                  </button>
                </li>
              </ul>
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
    </div>
  );
}

export default CreateProjectPage;
