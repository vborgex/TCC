import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import React, { useState } from "react";
import "./index.css";
import Navbar from "../../components/navbar";
import { useSelector } from "react-redux";
import { dbService } from "../../service/dbService";
import { useNavigate } from "react-router-dom";
import CreatePhase from "../../components/createPhase";

function CreateEventPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [RulesFile, setRulesFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [categories, setCategories] = useState([{ value: "" }]);
  const [educationLevels, setEducationLevels] = useState([{ value: "" }]);
  const [phases, setPhases] = useState([
    { criteria: [{ value: "" }], setSubmission: false, numberApproved:""},
  ]);
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

  console.log(phases)

  const handlePhaseNumberApprovedBlur =(phaseIndex, e)=>{
    let value = parseInt(e.target.value)
    if(isNaN(value)){
      value=100;
    }
    if (value<1) value = 1;
    if (value>5000) value = 5000;
    e.target.value = value;
    const temp = phases.map((phase, index)=>{
      if(index === phaseIndex){
        return{
          ...phase,
          numberApproved: value,
        };
      }
      return phase;
    });
    setPhases(temp);
  }

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
    setPhases([...phases, { criteria: [{ value: "" }], setSubmission: false, numberApproved: ""}]);
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
    if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
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
              <div className="col-12 d-flex flex-column align-items-start mb-3">
                <label className="label mb-2">Nome do evento</label>
                <input
                  className="form-control mb-2"
                  placeholder="Nome do projeto"
                  onChange={(e) => setTitle(e.target.value)}
                  maxLength="100"
                />
                {error.title && <p className="text-danger">{error.title}</p>}
              </div>

              <div className="col-12 d-flex flex-column align-items-start mb-3">
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
                      />
                      <button
                        className="btn-remove"
                        onClick={() =>
                          removeInput(categories, setCategories, i)
                        }
                        disabled={categories.length <= 1}
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
                  disabled={categories.length >= 10}
                >
                  <i className="bi bi-plus me-2 flex-shrink-0"></i>
                  Adicionar categoria
                </button>
                {error.categories && (
                  <p className="text-danger">{error.categories}</p>
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
                      />
                      <button
                        className="btn-remove"
                        onClick={() =>
                          removeInput(educationLevels, setEducationLevels, i)
                        }
                        disabled={educationLevels.length <= 1}
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
                  disabled={educationLevels.length >= 5}
                >
                  <i className="bi bi-plus me-2 flex-shrink-0"></i>
                  Adicionar nível
                </button>
                {error.educationLevels && (
                  <p className="text-danger">{error.educationLevels}</p>
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

              <div className="col-12">
                <div className="justify-content-center">
                  {phases.map((item, i) => (
                    <>
                      <CreatePhase
                        id={i}
                        criteria={phases[i].criteria}
                        numberApproved={phases[i].numberApproved}
                        updatePhaseCriteria={updatePhaseCriteria}
                        addPhaseCriteria={addPhaseCriteria}
                        removePhaseCriteria={removePhaseCriteria}
                        handlePhaseFileSubmissionChange={
                          handlePhaseFileSubmissionChange
                        }
                        handlePhaseNumberApprovedBlur={handlePhaseNumberApprovedBlur}
                      />
                      <button
                        className="btn-remove p-1 w-100 fs-5 mb-2"
                        onClick={(e) => {
                          e.preventDefault();
                          removeInput(phases, setPhases, i);
                        }}
                        disabled={phases.length <= 1}
                      >
                        <i className="bi bi-x me-2 flex-shrink-0"></i>
                        {`REMOVER FASE ${i+1}`}
                      </button>
                    </>
                  ))}
                  <button
                    className="squareBtn p-1 w-100 fs-5"
                    onClick={(e) => {
                      e.preventDefault();
                      addPhase();
                    }}
                    disabled={phases.length >= 5}
                  >
                    <i className="bi bi-plus me-2 flex-shrink-0"></i>
                    ADICIONAR FASE
                  </button>
                </div>

                <div className="d-flex gap-2 mt-5 mb-3">
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
