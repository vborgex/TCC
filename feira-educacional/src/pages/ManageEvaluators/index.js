import { Tab, Tabs, Table } from "react-bootstrap";
import Navbar from "../../components/navbar";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { dbService } from "../../service/dbService";
import React, { useEffect, useState } from "react";
import Loading from "../../components/loading";
import moment from "moment";
import { getCurrentPhase } from "../../utils/currentPhase";

function ManageEvaluatorsPage() {
  const { eventId } = useParams();
  const [evaluatorsPerProject, setEvaluatorsPerProject] = useState(2);
  const [key, setKey] = useState("byProject");
  const [assignments, setAssignments] = useState({});
  const [event, setEvent] = useState({});
  const [loading, setLoading] = useState(true);
  const [evaluators, setEvaluators] = useState([]);
  const [projects, setProjects] = useState([]);
  const [selectedPhase, setSelectedPhase] = useState("");
  const [currentDate] = useState(moment());
  const [currentPhase, setCurrentPhase] = useState({ phase: "", index: null });
  console.log(assignments);
  console.log("Fase", currentPhase.phase);

  useEffect(() => {
    async function fetchData() {
      try {
        const resultado = await dbService.getEventData(eventId);
        if (resultado) {
          setEvent(resultado);
          setSelectedPhase(resultado.phases?.[0]?.name || "");
          const fetchedProjects = await dbService.getEventProjects(eventId);
          const evaluatorsIds = resultado.evaluators;
          const evaluatorData = await Promise.all(
            evaluatorsIds.map(async (id) => {
              const data = await dbService.getUserDataById(id);
              return { id, name: data?.name || "" };
            })
          );
          setEvaluators(evaluatorData);
          setProjects(fetchedProjects);
          console.log(resultado.phases);
          setCurrentPhase(getCurrentPhase(resultado));
        }
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [eventId, getCurrentPhase]);

  const navigate = useNavigate();
  function shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  const handleDistribute = () => {
    const totalEvaluators = evaluators.length;
    if (evaluatorsPerProject > totalEvaluators) {
      alert(
        "Número de avaliadores por projeto maior que o total de avaliadores."
      );
      return;
    }

    const baseShuffled = shuffleArray(evaluators);
    const newAssignments = {};

    projects.forEach((project, idx) => {
      const offset = idx * evaluatorsPerProject;
      const evaluatorsForProject = [];

      for (let i = 0; i < evaluatorsPerProject; i++) {
        const evaluatorIndex = (offset + i) % totalEvaluators;
        evaluatorsForProject.push(baseShuffled[evaluatorIndex].name);
      }

      newAssignments[project.id] = evaluatorsForProject;
    });

    setAssignments(newAssignments);
  };

  const assignmentsByEvaluator = {};
  Object.entries(assignments).forEach(([projectId, evalNames]) => {
    evalNames.forEach((evalName) => {
      if (!assignmentsByEvaluator[evalName]) {
        assignmentsByEvaluator[evalName] = [];
      }
      const projectTitle =
        projects.find((p) => p.id === projectId)?.title || projectId;
      assignmentsByEvaluator[evalName].push(projectTitle);
    });
  });

  const isEditingAllowed = () => {
    return currentPhase.phase === "submission";
  };

  console.log(isEditingAllowed());

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isEditingAllowed()) {
      alert("Não é possível editar durante a fase de submissão");
    } else {
      try {
        for (const projectId in assignments) {
          const evaluatorNames = assignments[projectId];
          const evaluatorIds = evaluators
            .filter((e) => evaluatorNames.includes(e.name))
            .map((e) => e.id);

          await dbService.updateEvaluatorsForPhase(
            projectId,
            currentPhase.index,
            evaluatorIds
          );
        }
        navigate("/myevents");
      } catch (error) {
        throw error;
      }
    }
  };

  if (loading) {
    return (
      <div className="background min-vh-100 overflow-auto p-0">
        <Navbar />
        <Loading />
      </div>
    );
  }

  return (
    <div className="background min-vh-100 overflow-auto p-0">
      <Navbar />
      <div className="d-flex p-2 justify-content-center">
        <div className="card-create-project p-10 w-100 max-w-900 mt-4 mb-5">
          <form onSubmit={onSubmit}>
            <h2 className="text-center text-uppercase" id="eventName">
              Gerenciar Avaliadores
            </h2>
            {isEditingAllowed() ? (
              <h1 className="label mb-2 fs-4">{`Fase ${
                currentPhase.index + 1
              }`}</h1>
            ) : currentPhase.phase === "submission" ||
              currentPhase.phase === "evaluation" ? (
              <div className="alert alert-warning text-center">
                Fora do período de submissão da fase. Edição desativada.
              </div>
            ) : (
              <></>
            )}

            {currentPhase.phase === "submission" ||
            currentPhase.phase === "evaluation" ? (
              <>
                <div className="w-100 d-flex flex-column flex-sm-row gap-2 mb-2">
                  <input
                    type="text"
                    className="form-control"
                    placeholder={`Avaliadores por projeto`}
                    onChange={(e) =>
                      setEvaluatorsPerProject(Number(e.target.value))
                    }
                    disabled={!isEditingAllowed()}
                  />
                  <button
                    onClick={handleDistribute}
                    className="squareBtn"
                    type="button"
                    disabled={!isEditingAllowed()}
                  >
                    Distribuir
                  </button>
                </div>

                <Tabs
                  id="manage-evaluators-tabs"
                  activeKey={key}
                  onSelect={(k) => setKey(k)}
                  className="mb-3"
                >
                  <Tab eventKey="byProject" title="Por Projeto">
                    <Table
                      striped
                      bordered
                      hover
                      responsive="md"
                      className="w-100"
                    >
                      <thead>
                        <tr>
                          <th>Projeto</th>
                          <th>Avaliadores</th>
                        </tr>
                      </thead>
                      <tbody>
                        {projects.map((project) => (
                          <tr key={project.id}>
                            <td>{project.title}</td>
                            <td>
                              {assignments[project.id]?.length
                                ? assignments[project.id].join(", ")
                                : "Nenhum"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </Tab>

                  <Tab eventKey="byEvaluator" title="Por Avaliador">
                    <Table striped bordered hover className="w-100">
                      <thead>
                        <tr>
                          <th>Avaliador</th>
                          <th>Quantidade de Projetos</th>
                        </tr>
                      </thead>
                      <tbody>
                        {evaluators.map((evalr) => (
                          <tr key={evalr.id}>
                            <td>{evalr.name}</td>
                            <td>
                              {assignmentsByEvaluator[evalr.name]?.length || 0}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </Tab>
                </Tabs>
              </>
            ) : (
              <div className="alert alert-warning text-center">
                Fora do período de fases.
              </div>
            )}

            <div className="d-flex gap-2 mt-5 mb-3">
              <button className="btn btn-cancelar rounded-pill flex-fill">
                Cancelar
              </button>
              <button
                type="submit"
                className="btn btn-confirmar rounded-pill flex-fill"
                disabled={!isEditingAllowed}
              >
                Confirmar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ManageEvaluatorsPage;
