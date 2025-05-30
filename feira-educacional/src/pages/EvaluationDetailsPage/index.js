import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { dbService } from "../../service/dbService";
import Navbar from "../../components/navbar";
import astronaut from "./../../assets/Astronaut3.svg";

function EvaluationDetailsPage() {
  const { id } = useParams();
  const [evaluations, setEvaluations] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({
    event: false,
    eval: false,
    project: false,
  });
  const [project, setProject] = useState();
  const [event, setEvent] = useState();

  useEffect(() => {
    async function fetchEvaluationProjectEvent() {
      try {
        const projeto = await dbService.getProjectData(id);
        if (projeto) {
          setProject(projeto);
          const evento = await dbService.getEventData(projeto.eventId);
          if (evento) {
            setEvent(evento);
            const avaliacoes = await dbService.getEvaluationData(id);
            if (avaliacoes && avaliacoes.length > 0) {
              setEvaluations(avaliacoes);
            } else {
              setError((prev) => ({
                ...prev,
                eval: true,
              }));
            }
          } else {
            setError((prev) => ({
              ...prev,
              event: true,
            }));
          }
        } else {
          setError((prev) => ({
            ...prev,
            project: true,
          }));
        }
      } catch (error) {
        console.error("Error fetching project evaluations:", error);
        setError((prev) => ({
          ...prev,
          eval: true,
          project: true,
        }));
      } finally {
        setLoading(false);
      }
    }
    fetchEvaluationProjectEvent();
  }, [id]);

  return (
    <div className="background min-vh-100 overflow-auto p-0">
      <Navbar />
      <div className="d-flex p-2 justify-content-center">
        <div className="card-create-project p-10 w-100 max-w-900 mt-4 mb-4">
          <div className="text-center">
            {loading ? (
              <div className="text-center mt-4">
                <p>Carregando...</p>
              </div>
            ) : error.project ? (
              <div className="d-flex flex-column justify-content-center align-items-center">
                <h5>Projeto não encontrado!</h5>
                <img
                  src={astronaut}
                  className="align-self-center w-50 h-auto"
                  alt="..."
                />
              </div>
            ) : error.event ? (
              <div className="d-flex flex-column justify-content-center align-items-center">
                <h5>Evento não encontrado!</h5>
                <img
                  src={astronaut}
                  className="align-self-center w-50 h-auto"
                  alt="..."
                />
              </div>
            ) : error.eval ? (
              <>
                <h2 id="eventName" className="text-uppercase">
                  {event.title}
                </h2>
                <h5 id="projectName" className="">
                  {project.title}
                </h5>
                <div className="d-flex flex-column justify-content-center align-items-center">
                  <h5>Esse projeto ainda não foi avaliado!</h5>
                  <img
                    src={astronaut}
                    className="align-self-center w-50 h-auto"
                    alt="..."
                  />
                </div>
              </>
            ) : (
              <div>
                <h2 id="eventName" className="text-uppercase">
                  {event.title}
                </h2>
                <h5 id="projectName" className="">
                  {project.title}
                </h5>
                {evaluations.map((item) => (
                    <div key={item.id} className="row justify-content-start align-items-start mb-3 gx-5">
                        <label className="label fs-4 col-12 mb-2">Fase</label>
                      {Object.entries(item.evaluation).map(
                        ([criterio, nota]) => (
                          <div
                            key={criterio}
                            className="col-lg-6 col-12 d-flex flex-column align-items-start"
                          >
                            <label className="label mb-2 fs-5">
                              {criterio}
                            </label>
                            <label className="sublabel mb-2 fs-6">Nota</label>
                            <p>{nota.grade}</p>
                            <label className="sublabel mb-2 fs-6">
                              Comentário
                            </label>
                            <p className="text-justify text-break">{nota.comment}</p>
                          </div>
                        )
                      )}
                    </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EvaluationDetailsPage;
