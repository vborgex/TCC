import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import React, { useEffect, useState } from "react";
import "./index.css";
import Navbar from "../../components/navbar";
import { useParams,useNavigate } from "react-router-dom";
import { dbService } from "../../service/dbService";
import astronaut from "./../../assets/Astronaut3.svg";

function EvaluationPage() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [event, setEvent] = useState(null);
  const [error, setError] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [evaluation, setEvaluation] = useState({});

  const handleGradeBlur = (e, criterion) => {
    let value = parseFloat(e.target.value);
    if (isNaN(value)) {
      value = 0.1;
    }

    if (value < 0.1) value = 0.1;
    if (value > 10) value = 10;
    value = value.toFixed(2);
    e.target.value = value;

    setEvaluation((prev) => ({
      ...prev,
      [criterion]: {
        ...prev[criterion],
        grade: value,
      },
    }));
  };

  const handleCommentChange = (criterion, value) => {
    setEvaluation((prev) => ({
      ...prev,
      [criterion]: {
        ...prev[criterion],
        comment: value,
      },
    }));
  };

  useEffect(() => {
  async function fetchProjectEvent() {
    try {
      const projeto = await dbService.getProjectData(id);
      if (projeto) {
        setProject(projeto);
        const evento = await dbService.getEventData(projeto.eventId);
        if (evento) {
          setEvent(evento);
        } else {
          setError(true);
        }
      } else {
        setError(true);
      }
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }
  fetchProjectEvent();
}, [id]);

  useEffect(() => {
  if (event) {
    const initialEval = {};
    event.phases[0].criteria.forEach((criterion) => {
      initialEval[criterion] = { grade: "", comment: "" };
    });
    setEvaluation(initialEval);
  }
}, [event]);

  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrMsg("");
    const evaluationEmpty = Object.values(evaluation).some(
      (value) => !value || !value.grade || value.grade === ""
    );

    if (evaluationEmpty) {
      setErrMsg("Por favor , preencha todos os campos");
      return;
    }
    try {
      await dbService.createEvaluation(id, project.eventId, evaluation);
      navigate('/home')
    } catch (error) {}
  };
  return (
    <div className="background min-vh-100 overflow-auto p-0">
      <Navbar />
      <div className="d-flex p-2 justify-content-center">
        <div className="card-create-project p-10 w-100 max-w-900 mt-4 mb-4">
          <div className="text-center">
            {loading ? (
              <div className="text-center mt-4">
                <p>Carregando projeto...</p>
              </div>
            ) : error ? (
              <div className="d-flex flex-column justify-content-center align-items-center">
                <h5>Projeto não encontrado!</h5>
                <img
                  src={astronaut}
                  className="align-self-center w-50 h-auto"
                  alt="..."
                />
              </div>
            ) : (
              <>
                <h2 id="eventName" className="text-uppercase">
                  {event.title}
                </h2>
                <h5 id="projectName" className="">
                  {project.title}
                </h5>
                <form onSubmit={onSubmit}>
                  <div className="row justify-content-start align-items-end">
                    {event.phases[0].criteria.map((item, index) => (
                      <div
                      key={index}
                        className="col-lg-6 col-12 d-flex flex-column align-items-start"
                      >
                        <label className="label mb-2">{item.value}</label>
                        <div className="input-group w-50">
                          <input
                            className="form-control mb-2 no-spinner"
                            placeholder="Nota"
                            type="number"
                            step="0.1"
                            onBlur={(e) => handleGradeBlur(e, item)}
                          />
                          <span className="input-group-text">/10.00</span>
                        </div>

                        <textarea
                          className="form-control mb-2"
                          id="projectGradeComment"
                          placeholder="Escreva uma descrição da nota."
                          rows="4"
                          onChange={(e) =>
                            handleCommentChange(item, e.target.value)
                          }
                          maxLength="280"
                        ></textarea>
                      </div>
                    ))}

                    <div className="col-12 d-flex flex-column align-items-start">
                      <label className="label mb-2">Anexo do projeto</label>
                      <button className="btn btn-custom btn-regulamento mb-2">
                        <i className="bi bi-file-earmark-arrow-up me-2"></i>
                        Adicionar Anexo
                      </button>
                    </div>
                    {errMsg && <p className="text-danger fs-6">{errMsg}</p>}
                    <div className="d-flex gap-2 mt-3">
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
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EvaluationPage;
