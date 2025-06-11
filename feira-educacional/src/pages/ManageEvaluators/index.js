import { Tab, Tabs, Table} from "react-bootstrap";
import Navbar from "../../components/navbar";
import { useParams } from "react-router-dom";
import { dbService } from "../../service/dbService";
import React, { useEffect, useState } from "react";
import Loading from "../../components/loading";
import moment from "moment"; 
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
        }
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [eventId]);

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
      alert("Número de avaliadores por projeto maior que o total de avaliadores.");
      return;
    }

    const phaseAssignments = assignments[selectedPhase] || {};
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

    setAssignments((prev) => ({
      ...prev,
      [selectedPhase]: newAssignments
    }));
  };

  const getAssignmentsForPhase = (phaseName) => {
    return assignments[phaseName] || {};
  };

  const assignmentsByEvaluator = {};
  const currentAssignments = getAssignmentsForPhase(selectedPhase);
  Object.entries(currentAssignments).forEach(([projectId, evalNames]) => {
    evalNames.forEach((evalName) => {
      if (!assignmentsByEvaluator[evalName]) {
        assignmentsByEvaluator[evalName] = [];
      }
      const projectTitle = projects.find((p) => p.id === projectId)?.title || projectId;
      assignmentsByEvaluator[evalName].push(projectTitle);
    });
  });

  const isEditingAllowed = () => {
    const phase = event.phases?.find((p) => p.name === selectedPhase);
    return phase && currentDate.isBetween(moment(phase.submissionStart), moment(phase.submissionEnd), null, "[]");
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
          <h2 className="text-center text-uppercase">Gerenciar Avaliadores</h2>

          <div className="mb-3">
            <label>Fase</label>
            <select className="" value={selectedPhase} onChange={(e) => setSelectedPhase(e.target.value)}>
              {event.phases?.map((p) => (
                <option key={p.name} value={p.name}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          <div className="w-100 d-flex flex-column flex-sm-row gap-2 mb-2">
            <input
              type="text"
              className="form-control"
              placeholder={`Avaliadores por projeto`}
              onChange={(e) => setEvaluatorsPerProject(Number(e.target.value))}
              disabled={!isEditingAllowed()}
            />
            <button onClick={handleDistribute} className="squareBtn" type="button" disabled={!isEditingAllowed()}>
              Distribuir
            </button>
          </div>

          {!isEditingAllowed() && (
            <div className="alert alert-warning text-center">
              Fora do período de submissão da fase. Edição desativada.
            </div>
          )}

          <Tabs id="manage-evaluators-tabs" activeKey={key} onSelect={(k) => setKey(k)} className="mb-3">
            <Tab eventKey="byProject" title="Por Projeto">
              <Table striped bordered hover responsive="md" className="w-100">
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
                        {currentAssignments[project.id]?.length
                          ? currentAssignments[project.id].join(", ")
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
                      <td>{assignmentsByEvaluator[evalr.name]?.length || 0}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Tab>
          </Tabs>

          <div className="d-flex gap-2 mt-5 mb-3">
            <button className="btn btn-cancelar rounded-pill flex-fill">Cancelar</button>
            <button type="submit" className="btn btn-confirmar rounded-pill flex-fill">
              Confirmar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageEvaluatorsPage;
