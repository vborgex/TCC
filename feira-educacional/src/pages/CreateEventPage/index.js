import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import React, { useState } from "react";
import "./index.css";
import Navbar from "../../components/navbar";
import { useSelector } from "react-redux";
import { dbService } from "../../service/dbService";
import { useNavigate } from "react-router-dom";

function CreateEventPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [RulesFile, setRulesFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [categories, setCategories] = useState([]);
  const [educationLevels, setEducationLevels] = useState([]);
  const [phases, setPhases] = useState([]);
  const [error, setError] = useState({
    title: "",
    description: "",
    RulesFile: "",
    imageFile: "",
    categories: "",
    educationLevels: "",
    phases: "",
    general: "",
  });

  const navigate = useNavigate();

  const handleRulesFileChange = (file) => {
    if (file && file.type === "application/pdf") {
      setRulesFile(file);
      setError((prev) => ({ ...prev, RulesFile: "" }));
    } else {
      setError((prev) => ({
        ...prev,
        RulesFile: "Por favor selecione um arquivo tipo pdf",
      }));
      setRulesFile(null);
    }
  };

  const handleImageFileChange = (file) => {
    if ((file && file.type === "image/jpeg") || file.type === "image/png") {
      setImageFile(file);
      setError((prev) => ({ ...prev, imageFile: "" }));
    } else {
      setError((prev) => ({
        ...prev,
        imageFile: "Por favor selecione um arquivo tipo jpeg ou png",
      }));
      setImageFile(null);
    }
  };

  const onSubmit = async (e) => {};

  return (
    <div className="background min-vh-100 overflow-auto p-0">
      <Navbar />
      <div className=" d-flex p-2 justify-content-center">
        <div className="card-create-project p-3 w-100 max-w-900 mt-4 mb-4">
          <div className="text-center text-uppercase">
            <h2 id="eventName">Criar Evento</h2>
          </div>
          <form onSubmit={onSubmit}>
            <div className="row justify-content-start align-items-end">
              <div className="col-12 d-flex flex-column align-items-start">
                <label className="label mb-2">Nome do evento</label>
                <input
                  className="form-control mb-2"
                  placeholder="Nome do projeto"
                  onChange={(e) => setTitle(e.target.value)}
                  maxLength="100"
                />
                {error.title && <p className="text-danger">{error.title}</p>}
              </div>

              <div className="col-12 d-flex flex-column align-items-start">
                <label className="label mb-2">Descrição do evento</label>
                <textarea
                  className="form-control mb-2"
                  id="eventSummary"
                  placeholder="Escreva um resumo do projeto..."
                  rows="4"
                  maxLength="280"
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
                {error.description && (
                  <p className="text-danger">{error.description}</p>
                )}
              </div>

              <div className="col-12 d-flex flex-column align-items-start">
                <label className="label mb-2">Banner do evento</label>
                <label
                  className="btn btn-custom btn-regulamento mb-2 d-flex align-items-center text-truncate w-100"
                  htmlFor="fileInputImg"
                  style={{ cursor: "pointer" }}
                >
                  <i className="bi bi-file-earmark-arrow-up me-2 flex-shrink-0"></i>
                  <span className="text-truncate">
                    {imageFile
                      ? "Arquivo selecionado: " + imageFile.name
                      : "Adicionar Banner"}
                  </span>
                </label>

                <input
                  type="file"
                  id="fileInputImg"
                  accept=" image/*"
                  style={{ display: "none" }}
                  onChange={(e) => handleImageFileChange(e.target.files[0])}
                />
                {error.file && <p className="text-danger">{error.imageFile}</p>}
              </div>

              <div className="col-12 d-flex flex-column align-items-start">
                <label className="label mb-2">Regulamento do evento</label>
                <label
                  className="btn btn-custom btn-regulamento mb-2 d-flex align-items-center text-truncate w-100"
                  htmlFor="fileInputPdf"
                  style={{ cursor: "pointer" }}
                >
                  <i className="bi bi-file-earmark-arrow-up me-2 flex-shrink-0"></i>
                  <span className="text-truncate">
                    {RulesFile
                      ? "Arquivo selecionado: " + RulesFile.name
                      : "Adicionar Regulamento"}
                  </span>
                </label>

                <input
                  type="file"
                  id="fileInputPdf"
                  accept="application/pdf"
                  style={{ display: "none" }}
                  onChange={(e) => handleRulesFileChange(e.target.files[0])}
                />
                {error.file && <p className="text-danger">{error.rulesFile}</p>}
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

export default CreateEventPage;
