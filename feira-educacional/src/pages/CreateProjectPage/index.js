import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import React, { useEffect, useState } from "react";
import "./index.css";
import Navbar from "../../components/navbar";
import { dbService } from "../../service/dbService";
import { useNavigate, useParams } from "react-router-dom";
import astronaut from "./../../assets/Astronaut3.svg";
import { AuthService } from "../../service/authService";
import CreateProjectPhase from "../../components/createProjectPhase";

function CreateProjectPage() {
  const { eventId, projectId } = useParams();
  const [selectedEducationLevel, setSelectedEducationLevel] = useState(
    "Selecionar Nível de Escolaridade"
  );
  const [selectedCategory, setSelectedCategory] = useState(
    "Selecionar Categoria"
  );
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [fail, setFail] = useState(false);
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [phasesReplies, setPhasesReplies] = useState([]);
  const [error, setError] = useState({
    title: "",
    description: "",
    file: "",
    category: "",
    educationLevel: "",
    phases: "",
    general: "",
  });

  useEffect(() => {
    console.log("eventId:", eventId);
    async function fetchEvent() {
      const user = await AuthService.getCurrentUser();
      try {
        const resultado = await dbService.getEventData(eventId);
        if (resultado) {
          setEvent(resultado);
          const initialPhases = resultado.phases.map((phase) => ({
            textAreas: Array.isArray(phase.textAreas)
              ? Object.fromEntries(phase.textAreas.map((label) => [label, ""]))
              : {},
            file: null,
          }));
          setPhasesReplies(initialPhases);
          if (projectId) {
            const projeto = await dbService.getProjectData(projectId);

            if (!projeto) {
              setFail(true);
              return;
            }

            if (!user || projeto.creatorId !== user.uid) {
              setFail(true);
              return;
            }

            setIsEditing(true);

            setTitle(projeto.title);
            setDescription(projeto.description);
            setSelectedCategory(projeto.category);
            setSelectedEducationLevel(projeto.educationLevel);

            const fasesSalvas = projeto.phasesReplies || [];
            const newPhases = resultado.phases.map((phase, index) => ({
              textAreas: Object.fromEntries(
                (phase.textAreas || []).map((label) => [
                  label,
                  fasesSalvas[index]?.textAreas?.[label] || "",
                ])
              ),
              file: fasesSalvas[index]?.file || null,
            }));

            setPhasesReplies(newPhases);
          }
        } else {
          setFail(true);
        }
      } catch (error) {
        setFail(true);
      } finally {
        setLoading(false);
      }
    }

    fetchEvent();
  }, [eventId, projectId]);
  const navigate = useNavigate();

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleEducationLevelSelect = (educationLevel) => {
    setSelectedEducationLevel(educationLevel);
  };

  const handlePhaseTextAreaChange = (value, index, label) => {
    const newReplies = [...phasesReplies];
    newReplies[index].textAreas[label] = value;
    setPhasesReplies(newReplies);
  };

  const handleFileChange = (file, index) => {
    if (file && file.type === "application/pdf") {
      const newReplies = [...phasesReplies];
      newReplies[index].file = file;
      setPhasesReplies(newReplies);
      setError((prev) => ({ ...prev, file: "" }));
    } else {
      setError((prev) => ({
        ...prev,
        file: "Por favor selecione um arquivo tipo pdf",
      }));
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
      phases: "",
      general: "",
    });

    const hasEmptyTextAreas = phasesReplies.some(
      (response, i) =>
        event.phases[i].textAreas.length > 0 &&
        Object.values(response.textAreas).some((text) => text.trim() === "")
    );

    // const hasMissingFile = event.phases.some(
    //   (phase, i) => phase.setSubmission && !phasesReplies[i].file
    // );

    if (
      !title ||
      !description ||
      selectedCategory === "Selecionar Categoria" ||
      selectedEducationLevel === "Selecionar Nível de Escolaridade" ||
      hasEmptyTextAreas
    ) {
      setError((prev) => ({
        ...prev,
        general: "Verifique se todos os campos foram preenchidos/selecionados.",
      }));
      return;
    }
    try {
      if (projectId) {
        await dbService.updateProject(
          projectId,
          title,
          description,
          selectedEducationLevel,
          selectedCategory,
          phasesReplies
        );
      } else {
        await dbService.createProject(
          title,
          description,
          selectedEducationLevel,
          selectedCategory,
          eventId,
          phasesReplies
        );
      }

      navigate("/myprojects");
    } catch (err) {
      console.log(err);
      setError((prev) => ({ ...prev, general: "Erro ao cadastrar o projeto" }));
    }
  };

  return (
    <div className="background min-vh-100 overflow-auto p-0">
      <Navbar />
      <div className=" d-flex p-2 justify-content-center">
        <div className="card-create-project p-3 w-100 max-w-900 mt-4 mb-4">
          {loading ? (
            <div className="text-center mt-4">
              <p>Carregando...</p>
            </div>
          ) : fail ? (
            <div className="d-flex flex-column justify-content-center align-items-center">
              {event ? (
                <>
                  <h5>Você não tem permissão para editar esse projeto.</h5>
                  <img
                    src={astronaut}
                    className="align-self-center w-50 h-auto"
                    alt="..."
                  />
                </>
              ) : (
                <>
                  <h5>Evento não encontrado!</h5>
                  <img
                    src={astronaut}
                    className="align-self-center w-50 h-auto"
                    alt="..."
                  />
                </>
              )}
            </div>
          ) : (
            <>
              <div className="text-center text-uppercase">
                <h2 id="eventName" className="text-truncate fs-3">
                  {event.title}
                </h2>
              </div>
              <form onSubmit={onSubmit}>
                <div className="row justify-content-start align-items-end">
                  <div className="col-lg-6 col-12 d-flex flex-column align-items-start">
                    <label className="label mb-2">Nome do projeto</label>
                    <input
                      className="form-control mb-2"
                      id="projectName"
                      placeholder="Nome do projeto"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      maxLength="100"
                      disabled={isEditing}
                    />
                    {error.title && (
                      <p className="text-danger">{error.title}</p>
                    )}
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
                      maxLength="600"
                      value={description}
                      disabled={isEditing}
                      onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                    {error.description && (
                      <p className="text-danger">{error.description}</p>
                    )}
                  </div>

                  <div className="col-12 col-lg-6 dropdown mb-2 align-items-center">
                    <label className="label mb-2">
                      Escolaridade dos alunos
                    </label>
                    <button
                      className="btn btn-secondary dropdown-toggle"
                      type="button"
                      id="dropdownMenuButton"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      disabled={isEditing}
                    >
                      {selectedEducationLevel}
                    </button>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton"
                    >
                      {event.educationLevels.map((item, i) => (
                        <li>
                          <button
                            className="dropdown-item"
                            type="button"
                            onClick={() => handleEducationLevelSelect(item)}
                          >
                            {item}
                          </button>
                        </li>
                      ))}
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
                      disabled={isEditing}
                    >
                      {selectedCategory}
                    </button>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton"
                    >
                      {event.categories.map((item, i) => (
                        <li>
                          <button
                            className="dropdown-item"
                            type="button"
                            onClick={() => handleCategorySelect(item)}
                          >
                            {item}
                          </button>
                        </li>
                      ))}
                    </ul>
                    {error.category && (
                      <p className="text-danger">{error.category}</p>
                    )}
                  </div>

                  {event.phases.map((phase, index) => (
                    <>
                      <CreateProjectPhase
                        numberApproved={phase.numberApproved}
                        phase={phase}
                      />
                      <label className="label mb-2 fs-4">{`Fase ${
                        index + 1
                      }`}</label>

                      {Object.entries(
                        phasesReplies[index]?.textAreas || {}
                      ).map(([label, value]) => (
                        <div
                          className="col-12 d-flex flex-column align-items-start"
                          key={label}
                        >
                          <label className="label mb-2">{label}</label>
                          <textarea
                            className="form-control mb-2"
                            placeholder="..."
                            rows="4"
                            maxLength="600"
                            value={value}
                            onChange={(e) =>
                              handlePhaseTextAreaChange(
                                e.target.value,
                                index,
                                label
                              )
                            }
                          />
                        </div>
                      ))}

                      {phase.setSubmission ? (
                        <div className="col-12 d-flex flex-column align-items-start">
                          <label
                            className="btn btn-custom btn-regulamento mb-2 d-flex align-items-center text-truncate w-100"
                            htmlFor="fileInput"
                            style={{ cursor: "pointer" }}
                          >
                            <i className="bi bi-file-earmark-arrow-up me-2 flex-shrink-0"></i>
                            <span className="text-truncate">
                              {phasesReplies[index]?.file
                                ? "Arquivo selecionado: " +
                                  phasesReplies[index].file.name
                                : "Adicionar Anexo"}
                            </span>
                          </label>
                          <input
                            type="file"
                            id={`fileInput-${index}`}
                            accept="application/pdf"
                            style={{ display: "none" }}
                            onChange={(e) =>
                              handleFileChange(e.target.files[0], index)
                            }
                          />

                          {error.file && (
                            <p className="text-danger">{error.file}</p>
                          )}
                        </div>
                      ) : (
                        <></>
                      )}
                    </>
                  ))}
                  {/*             
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
                      onChange={(e) => handleFileChange(e.target.files[0])}
                    />
                    {error.file && <p className="text-danger">{error.file}</p>}
                  </div> */}

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
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default CreateProjectPage;
