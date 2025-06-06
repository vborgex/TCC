import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import React, { useEffect, useState } from "react";
import "./index.css";
import Navbar from "../../components/navbar";
import { useSelector } from "react-redux";
import { dbService } from "../../service/dbService";
import { useNavigate, useParams } from "react-router-dom";
import CreatePhase from "../../components/createPhase";
import { AuthService } from "../../service/authService";
import Loading from "../../components/loading";
import astronaut from "./../../assets/Astronaut3.svg";
import { storageService } from "../../service/storageService";
function CreateEventPage() {
  const { eventId } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [rulesFile, setRulesFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [existingRulesFile, setExistingRulesFile] = useState(null);
  const [existingImageFile, setExistingImageFile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [fail, setFail] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [categories, setCategories] = useState([{ value: "" }]);
  const [educationLevels, setEducationLevels] = useState([{ value: "" }]);
  const [event, setEvent] = useState(null);
  const [phases, setPhases] = useState([
    {
      textAreas: [{ value: "" }],
      criteria: [{ value: "" }],
      setSubmission: false,
      numberApproved: "",
    },
  ]);
  console.log("Phases:", phases)
  const [error, setError] = useState({
    title: "",
    description: "",
    rulesFile: "",
    imageFile: "",
    categories: "",
    educationLevels: "",
    phases: "",
    general: "",
  });

  useEffect(() => {
    async function fetchEvent() {
      const user = await AuthService.getCurrentUser();
      try {
        if (eventId) {
          const resultado = await dbService.getEventData(eventId);
          if (!resultado) {
            setFail(true);
            return;
          }
          if (!user || resultado.user_id !== user.id) {
            setFail(true);
            return;
          }

          setIsEditing(true);
          setEvent(resultado);
          setPhases(resultado.phases);
          setTitle(resultado.title);
          setDescription(resultado.description);
          setExistingImageFile(resultado.imgMetadata);
          setExistingRulesFile(resultado.fileMetadata);
          setImageFile(resultado.imgMetadata);
          setRulesFile(resultado.fileMetadata);
          setCategories(
            resultado.categories.map((category) => ({ value: category }))
          );
          setEducationLevels(
            resultado.educationLevels.map((educationLevel) => ({
              value: educationLevel,
            }))
          );
        }
      } catch (error) {
        console.error("Erro ao buscar evento:", error);
        setFail(true);
      } finally {
        setIsLoading(false);
      }
    }
    fetchEvent();
  }, [eventId]);

  const handlePhaseNumberApprovedBlur = (phaseIndex, e) => {
    let value = parseInt(e.target.value);
    if (isNaN(value)) {
      value = 100;
    }
    if (value < 1) value = 1;
    if (value > 5000) value = 5000;

    setPhases((oldPhases) =>
      oldPhases.map((phase, i) =>
        i === phaseIndex ? { ...phase, numberApproved: value } : phase
      )
    );
  };

  const handlePhaseFileSubmissionChange = (phaseIndex) => {
    const temp = phases.map((phase, index) => {
      if (index === phaseIndex) {
        return {
          ...phase,
          setSubmission: !phase.setSubmission,
        };
      }
      return phase;
    });
    setPhases(temp);
  };
const isFileDirty = (newFile, existingFile) => {
  if (!newFile && !existingFile) return false;
  if (!newFile || !existingFile) return true;
  return newFile.name !== existingFile.name || newFile.size !== existingFile.size;
};
  const addPhaseTextAreas = (phaseIndex) => {
    const temp = phases.map((phase, index) => {
      if (index === phaseIndex) {
        return {
          ...phase,
          textAreas: [...phase.textAreas, { value: "" }],
        };
      }
      return phase;
    });
    setPhases(temp);
  };

  const updatePhaseTextAreas = (phaseIndex, textAreasIndex, criterion) => {
    const temp = phases.map((phase, index) => {
      if (index === phaseIndex) {
        const newTextAreas = phase.textAreas.map((c, i) =>
          i === textAreasIndex ? { value: criterion } : c
        );
        return { ...phase, textAreas: newTextAreas };
      }
      return phase;
    });
    setPhases(temp);
  };

  const removePhaseTextAreas = (phaseIndex, textAreasIndex) => {
    const temp = phases.map((phase, index) => {
      if (index === phaseIndex && phase.textAreas.length > 1) {
        const newTextAreas = phase.textAreas.filter(
          (_, i) => i !== textAreasIndex
        );
        return {
          ...phase,
          textAreas: newTextAreas,
        };
      }
      return phase;
    });
    setPhases(temp);
  };

  const addPhaseCriteria = (phaseIndex) => {
    const temp = phases.map((phase, index) => {
      if (index === phaseIndex) {
        return {
          ...phase,
          criteria: [...phase.criteria, { value: "" }],
        };
      }
      return phase;
    });
    setPhases(temp);
  };

  const updatePhaseCriteria = (phaseIndex, criteriaIndex, criterion) => {
    const temp = phases.map((phase, index) => {
      if (index === phaseIndex) {
        const newCriteria = phase.criteria.map((c, i) =>
          i === criteriaIndex ? { value: criterion } : c
        );
        return { ...phase, criteria: newCriteria };
      }
      return phase;
    });
    setPhases(temp);
  };

  const removePhaseCriteria = (phaseIndex, criteriaIndex) => {
    const temp = phases.map((phase, index) => {
      if (index === phaseIndex && phase.criteria.length > 1) {
        const newCriteria = phase.criteria.filter(
          (_, i) => i !== criteriaIndex
        );
        return {
          ...phase,
          criteria: newCriteria,
        };
      }
      return phase;
    });
    setPhases(temp);
  };

  const removeInput = (list, setList, index) => {
    if (list.length > 1) {
      const temp = [...list];
      temp.splice(index, 1);
      setList(temp);
    }
  };

  const addInput = (list, setList) => {
    setList([...list, { value: "" }]);
  };

  const addPhase = () => {
    setPhases([
      ...phases,
      {
        textAreas: [{ value: "" }],
        criteria: [{ value: "" }],
        setSubmission: false,
        numberApproved: "",
      },
    ]);
  };

  const handleListChange = (list, setList, index, value) => {
    const temp = [...list];
    temp[index].value = value;
    setList(temp);
  };

  const navigate = useNavigate();

  const handleRulesFileChange = (file) => {
    if (file && file.type === "application/pdf") {
      setRulesFile(file);
      setError((prev) => ({ ...prev, rulesFile: "" }));
    } else {
      setError((prev) => ({
        ...prev,
        rulesFile: "Por favor selecione um arquivo tipo pdf",
      }));
      setRulesFile(null);
    }
  };

  const handleImageFileChange = (file) => {
    if (file && (file.type === "image/jpeg")) {
      setImageFile(file);
      setError((prev) => ({ ...prev, imageFile: "" }));
    } else {
      setError((prev) => ({
        ...prev,
        imageFile: "Por favor selecione um arquivo tipo jpeg",
      }));
      setImageFile(null);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError({
      title: "",
      description: "",
      rulesFile: "",
      imageFile: "",
      categories: "",
      educationLevels: "",
      phases: "",
      general: "",
    });

    const filteredCategories = categories.filter(
      (category) => category.value !== ""
    );
    const filteredEducationLevels = educationLevels.filter(
      (level) => level.value !== ""
    );

    const categoriesEmpty = filteredCategories.length === 0;
    const educationLevelsEmpty = filteredEducationLevels.length === 0;

    const phasesWithErrors = phases
      .map((phase, index) => {
        const hasCriteria = phase.criteria.some(
          (criterion) => criterion.value !== ""
        );
        const isNumberApprovedFilled = phase.numberApproved !== "";
        if (!hasCriteria && !isNumberApprovedFilled) {
          return `A fase ${
            index + 1
          } deve ter pelo menos um critério de avaliação e o campo de quantidade de alunos preenchido.`;
        }
        if (!hasCriteria && isNumberApprovedFilled) {
          return `A fase ${
            index + 1
          } deve ter pelo menos um critério de avaliação preenchido.`;
        }
        if (hasCriteria && !isNumberApprovedFilled) {
          return `A fase ${
            index + 1
          } deve ter o campo de quantidade de alunos preenchido.`;
        }
        return null;
      })
      .filter((error) => error !== null);

    const phasesEmpty = phases.every(
      (phase) => !phase.criteria.some((criterion) => criterion.value !== "")
    );

    if (
      categoriesEmpty ||
      educationLevelsEmpty ||
      phasesEmpty ||
      phasesWithErrors.length > 0
    ) {
      if (categoriesEmpty) {
        setError((prev) => ({
          ...prev,
          categories: "O evento deve possuir ao menos uma categoria",
        }));
      }
      if (educationLevelsEmpty) {
        setError((prev) => ({
          ...prev,
          educationLevels:
            "O evento deve possuir ao menos um nível de escolaridade",
        }));
      }
      if (phasesEmpty) {
        setError((prev) => ({
          ...prev,
          phases:
            "O evento deve possuir ao menos um critério de avaliação em cada fase.",
        }));
      }
      if (phasesWithErrors.length > 0) {
        setError((prev) => ({
          ...prev,
          phases: phasesWithErrors.join(" "),
        }));
      }
      return;
    }

    if (!title || !description) {
      setError((prev) => ({
        ...prev,
        general: "Verifique se todos os campos foram preenchidos/selecionados.",
      }));
      return;
    }
    setIsSubmitting(true);
    try {
      console.log("Phases before update", phases);
      let fileMetadata = null;
      let imgMetadata = null;
      if (isFileDirty(rulesFile, existingRulesFile)) {
        if (isEditing && existingRulesFile.path) {
          await storageService.deleteFile(event.fileMetadata.path);
        }
        fileMetadata = await storageService.uploadFile(rulesFile, "events");
      }else{
        fileMetadata = existingRulesFile
      }

      if (isFileDirty(imageFile, existingImageFile)) {
        if (isEditing && existingImageFile.path) {
          await storageService.deleteFile(event.imgMetadata.path);
        }
        imgMetadata = await storageService.uploadFile(imageFile, "banners");
      }else{
        imgMetadata = existingImageFile
      }

      if (eventId) {
        await dbService.updateEvent(
          eventId,
          title,
          description,
          filteredCategories,
          filteredEducationLevels,
          phases,
          fileMetadata,
          imgMetadata
        );
      } else {
        await dbService.createEvent(
          title,
          description,
          filteredCategories,
          filteredEducationLevels,
          phases,
          fileMetadata,
          imgMetadata
        );
      }
      navigate("/home");
    } catch (err) {
      setIsSubmitting(false);
      console.log(err);
      setError((prev) => ({ ...prev, general: "Erro ao cadastrar o evento" }));
    }
  };

  return (
    <div className="background min-vh-100 overflow-auto p-0">
      <Navbar />

      {isLoading ? (
        <Loading />
      ) : fail ? (
        <div className=" d-flex p-2 justify-content-center">
          <div className="card-create-project p-3 w-100 max-w-900 mt-4 mb-4">
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
          </div>
        </div>
      ) : (
        <div className=" d-flex p-2 justify-content-center">
          <div className="card-create-project p-3 w-100 max-w-900 mt-4 mb-4">
            <div className="text-center text-uppercase">
              {isEditing ? (
              <h2 id="eventName">Editar Evento</h2>
              ): (
              <h2 id="eventName">Criar Evento</h2>)}
            </div>
            <form onSubmit={onSubmit}>
              <div className="row justify-content-start align-items-end">
                <div className="col-12 d-flex flex-column align-items-start mb-3">
                  <label className="label mb-2">Nome do evento</label>
                  <input
                    className="form-control mb-2"
                    placeholder="Nome do evento"
                    onChange={(e) => setTitle(e.target.value)}
                    maxLength="100"
                    value={title}
                    disabled = {isSubmitting}
                  />
                  {error.title && (
                    <p className="text-danger fs-6">{error.title}</p>
                  )}
                </div>

                <div className="col-12 d-flex flex-column align-items-start mb-3">
                  <label className="label mb-2">Descrição do evento</label>
                  <textarea
                    className="form-control mb-2"
                    value={description}
                    id="eventSummary"
                    placeholder="Escreva um resumo do evento..."
                    rows="4"
                    maxLength="600"
                    onChange={(e) => setDescription(e.target.value)}
                    disabled = {isSubmitting}
                  ></textarea>
                  {error.description && (
                    <p className="text-danger fs-6">{error.description}</p>
                  )}
                </div>

                <div className="col-12 align-items-start mb-4">
                  <label className="label mb-2">Categorias</label>
                  {categories.map((item, i) => (
                    <div key={i} className="d-flex mb-2">
                      <div className="w-100 d-flex flex-column flex-sm-row gap-2">
                        <input
                          type="text"
                          className="form-control"
                          placeholder={`Categoria ${i + 1}`}
                          value={categories[i].value}
                          onChange={(e) =>
                            handleListChange(
                              categories,
                              setCategories,
                              i,
                              e.target.value
                            )
                          }
                          maxLength="80"
                          disabled = {isSubmitting}
                        />
                        <button
                          className="btn-remove"
                          onClick={() =>
                            removeInput(categories, setCategories, i)
                          }
                          disabled={categories.length <= 1 || isSubmitting}
                          type="button"
                        >
                          Remover
                        </button>
                      </div>
                    </div>
                  ))}
                  <button
                    className="squareBtn p-1 w-100 fs-6"
                    onClick={(e) => {
                      e.preventDefault();
                      addInput(categories, setCategories);
                    }}
                    disabled={categories.length >= 10 ||isSubmitting}
                  >
                    <i className="bi bi-plus me-2 flex-shrink-0"></i>
                    Adicionar categoria
                  </button>
                  {error.categories && (
                    <p className="text-danger fs-6">{error.categories}</p>
                  )}
                </div>

                <div className="col-12 align-items-start mb-4">
                  <label className="label mb-2">Níveis de escolaridade</label>
                  {educationLevels.map((item, i) => (
                    <div key={i} className="d-flex mb-2">
                      <div className="w-100 d-flex flex-column flex-sm-row gap-2">
                        <input
                          type="text"
                          className="form-control"
                          placeholder={`Nível ${i + 1}`}
                          value={educationLevels[i].value}
                          onChange={(e) =>
                            handleListChange(
                              educationLevels,
                              setEducationLevels,
                              i,
                              e.target.value
                            )
                          }
                          maxLength="80"
                          disabled = {isSubmitting}
                        />
                        <button
                          className="btn-remove"
                          onClick={() =>
                            removeInput(educationLevels, setEducationLevels, i)
                          }
                          disabled={educationLevels.length <= 1 || isSubmitting}
                          type="button"
                        >
                          Remover
                        </button>
                      </div>
                    </div>
                  ))}
                  <button
                    className="squareBtn p-1 w-100 fs-6"
                    onClick={(e) => {
                      e.preventDefault();
                      addInput(educationLevels, setEducationLevels);
                    }}
                    disabled={educationLevels.length >= 5 ||isSubmitting}
                  >
                    <i className="bi bi-plus me-2 flex-shrink-0"></i>
                    Adicionar nível
                  </button>
                  {error.educationLevels && (
                    <p className="text-danger fs-6">{error.educationLevels}</p>
                  )}
                </div>

                <div className="col-12 d-flex flex-column align-items-start" disabled = {isSubmitting}>
                  <label className="label mb-2">Banner do evento</label>
                  <label
                    className="btn btn-custom btn-regulamento mb-2 d-flex align-items-center text-truncate w-100"
                    htmlFor="fileInputImg"
                    style={{ cursor: "pointer" }}
                    disabled = {isSubmitting}
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
                    disabled = {isSubmitting}
                  />
                  {error.file && (
                    <p className="text-danger fs-6">{error.imageFile}</p>
                  )}
                </div>
                <div className="col-12 d-flex flex-column align-items-start">
                  <label className="label mb-2">Regulamento do evento</label>
                  <label
                    className="btn btn-custom btn-regulamento mb-2 d-flex align-items-center text-truncate w-100"
                    htmlFor="fileInputPdf"
                    style={{ cursor: "pointer" }}
                    disabled = {isSubmitting}
                  >
                    <i className="bi bi-file-earmark-arrow-up me-2 flex-shrink-0"></i>
                    <span className="text-truncate">
                      {rulesFile
                        ? "Arquivo selecionado: " + rulesFile.name
                        : "Adicionar Regulamento"}
                    </span>
                  </label>

                  <input
                    type="file"
                    id="fileInputPdf"
                    accept="application/pdf"
                    style={{ display: "none" }}
                    onChange={(e) => handleRulesFileChange(e.target.files[0])}
                    disabled = {isSubmitting}
                  />
                  {error.file && (
                    <p className="text-danger fs-6">{error.rulesFile}</p>
                  )}
                </div>

                <div className="col-12">
                  <div className="justify-content-center">
                    {phases.map((item, i) => (
                      <>
                        <CreatePhase
                          id={i}
                          criteria={
                            item.criteria?.map((c) =>
                              typeof c === "string" ? { value: c } : c
                            ) || [{ value: "" }]
                          }
                          textAreas={
                            item.textAreas?.map((t) =>
                              typeof t === "string" ? { value: t } : t
                            ) || [{ value: "" }]
                          }
                          setSubmission={phases[i].setSubmission}
                          numberApproved={phases[i].numberApproved}
                          isSubmitting = {isSubmitting}
                          addPhaseTextAreas={addPhaseTextAreas}
                          updatePhaseTextAreas={updatePhaseTextAreas}
                          removePhaseTextAreas={removePhaseTextAreas}
                          updatePhaseCriteria={updatePhaseCriteria}
                          addPhaseCriteria={addPhaseCriteria}
                          removePhaseCriteria={removePhaseCriteria}
                          handlePhaseFileSubmissionChange={
                            handlePhaseFileSubmissionChange
                          }
                          f
                          handlePhaseNumberApprovedBlur={
                            handlePhaseNumberApprovedBlur
                          }
                        />
                        <button
                          className="btn-remove p-1 w-100 fs-5 mb-2"
                          onClick={(e) => {
                            e.preventDefault();
                            removeInput(phases, setPhases, i);
                          }}
                          disabled={phases.length <= 1 ||isSubmitting}
                        >
                          <i className="bi bi-x me-2 flex-shrink-0"></i>
                          {`REMOVER FASE ${i + 1}`}
                        </button>
                      </>
                    ))}
                    <button
                      className="squareBtn p-1 w-100 fs-5"
                      onClick={(e) => {
                        e.preventDefault();
                        addPhase();
                      }}
                      disabled={phases.length >= 5 ||isSubmitting}
                    >
                      <i className="bi bi-plus me-2 flex-shrink-0"></i>
                      ADICIONAR FASE
                    </button>
                  </div>
                  {error.phases && (
                    <p className="text-danger fs-6">{error.phases}</p>
                  )}

                  <div className="d-flex gap-2 mt-5 mb-3">
                    <button className="btn btn-cancelar rounded-pill flex-fill" disabled = {isSubmitting}>
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="btn btn-confirmar rounded-pill flex-fill"
                      disabled = {isSubmitting}
                    >
                      Confirmar
                    </button>
                  </div>
                </div>

                {error.general && (
                  <p className="text-danger fs-6">{error.general}</p>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default CreateEventPage;
