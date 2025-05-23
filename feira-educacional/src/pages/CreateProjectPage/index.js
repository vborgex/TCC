import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import React, { useState } from "react";
import "./index.css";
import Navbar from "../../components/navbar";
import { useSelector } from "react-redux";
import { dbService } from "../../service/dbService";
import { useNavigate } from "react-router-dom";

function CreateProjectPage() {
  const [selectedEducationLevel, setSelectedEducationLevel] = useState(
    "Selecionar Nível de Escolaridade"
  );
  const [selectedCategory, setSelectedCategory] = useState(
    "Selecionar Categoria"
  );
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState({
    title: "",
    description: "",
    file: "",
    category: "",
    educationLevel: "",
    general: "",
  });
  
  const navigate = useNavigate();
  const usuarioEmail = useSelector((state) => state.usuario.usuarioEmail);
  console.log(usuarioEmail)

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleEducationLevelSelect = (educationLevel) => {
    setSelectedEducationLevel(educationLevel);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
      setError((prev) => ({ ...prev, file: "" }));
    } else {
      setError((prev) => ({
        ...prev,
        file: "Por favor selecione um arquivo tipo pdf",
      }));
      setSelectedFile(null);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError({
      title: "",
      description: "",
      file: "",
      category: "",
      educationLevel: "",
      general: "",
    });

    if (
      !title ||
      !description ||
      selectedCategory === "Selecionar Categoria" ||
      selectedEducationLevel === "Selecionar Nível de Escolaridade"
    ) {
      setError((prev) => ({
        ...prev,
        general: "Verifique se todos os campos foram preenchidos/selecionados.",
      }));
      return;
    }
    try {
      await dbService.createProject(title, description, selectedEducationLevel,  selectedCategory, selectedFile);
      navigate("/home");
      
    } catch(err) {
      console.log(err)
      setError((prev) => ({...prev, general: "Erro ao cadastrar o projeto" }));
    }
  };
  return (
    <div className="background min-vh-100 overflow-auto p-0">
      <Navbar />
      <div className=" d-flex p-2 justify-content-center">
        <div className="card-create-project p-3 w-100 max-w-900 mt-4 mb-4">
          <div className="text-center text-uppercase">
            <h2 id="eventName">Educatech</h2>
          </div>
          <form onSubmit={onSubmit}>
            <div className="row justify-content-start align-items-end">
              <div className="col-lg-6 col-12 d-flex flex-column align-items-start">
                <label className="label mb-2">Nome do projeto</label>
                <input
                  className="form-control mb-2"
                  id="projectName"
                  placeholder="Nome do projeto"
                  onChange={(e) => setTitle(e.target.value)}
                />
                {error.title && <p className="text-danger">{error.title}</p>}
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
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
                {error.description && (
                  <p className="text-danger">{error.description}</p>
                )}
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
                {error.educationLevel && (
                  <p className="text-danger">{error.educationLevel}</p>
                )}
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
                {error.category && (
                  <p className="text-danger">{error.category}</p>
                )}
              </div>

              <div className="col-12 d-flex flex-column align-items-start">
                <label
                  className="btn btn-custom btn-regulamento mb-2 d-flex align-items-center text-truncate w-100"
                  htmlFor="fileInput"
                  style={{ cursor: "pointer" }}
                >
                  <i className="bi bi-file-earmark-arrow-up me-2 flex-shrink-0"></i>
                  <span className="text-truncate">
                    {selectedFile
                      ? "Arquivo selecionado: " + selectedFile.name
                      : "Adicionar Anexo"}
                  </span>
                </label>

                <input
                  type="file"
                  id="fileInput"
                  accept="application/pdf"
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
                {error.file && <p className="text-danger">{error.file}</p>}
              </div>

              <div className="d-flex gap-2 mt-3 mb-3">
                <button className="btn btn-cancelar rounded-pill flex-fill">
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="btn btn-confirmar rounded-pill flex-fill"
                >
                  Confirmar
                </button>
              </div>
              {error.general && (
                <p className="text-danger fs-6">{error.general}</p>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateProjectPage;
