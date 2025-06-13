import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./index.css";
import Navbar from "../../components/navbar";
import { useState, useEffect } from "react";
import { dbService } from "./../../service/dbService";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./../../config/firebase";
import astronaut from "./../../assets/Astronaut3.svg";
import ProjectCard from "../../components/projectCard";
import { useParams } from "react-router-dom";

function ProjectListPage() {
  const { eventId, userId } = useParams();
  const [projetos, setProjetos] = useState([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        if (!eventId) {
          try {
            const resultado = await dbService.getUserProjects();
            setProjetos(resultado);
          } catch (error) {
            console.error("Erro ao buscar projetos:", error);
          }
        } else if (!userId) {
          try {
            const resultado = await dbService.getEventProjects(eventId);
            setProjetos(resultado);
          } catch (error) {
            console.error("Erro ao buscar projetos:", error);
          }
        } else {
          const evaluatorAssessments = await dbService.getEvaluatorProjects();
          const projectIds = evaluatorAssessments.map((p) => p.projectId);
          const projectData = await dbService.getProjectsByIds(projectIds);
          setProjetos(projectData);
        }
      } else {
        console.warn("Usuário não está logado!");
      }
    });

    return () => unsubscribe();
  }, [eventId, userId]);
  const filteredProjects = projetos.filter((project) =>
    project.title.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="background min-vh-100 overflow-auto p-0">
      <Navbar />
      <div className="d-flex p-2 justify-content-center">
        <div className="pt-4 p-5 w-100 mb-4">
          <div className="text-center">
            <div className="input-group mb-4 rounded mx-auto search">
              <span className="input-group-text rounded-start">
                <i className="bi bi-search"></i>
              </span>
              <input
                type="text"
                className="form-control  rounded-end search-input"
                placeholder="Pesquisar projetos..."
                maxLength="50"
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          {projetos.length === 0 ? (
            <div className="card-create-project d-flex flex-column justify-content-center align-items-center m-auto">
              <h5>Nenhum projeto aqui por enquanto!</h5>
              <img
                src={astronaut}
                className="align-self-center w-50 h-auto m-1"
                alt="..."
              />
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="text-white text-center m-auto ">
              <h5 className="text-uppercase fs-4 ">
                <strong>Nenhum projeto corresponde à pesquisa!</strong>
              </h5>
            </div>
          ) : (
            <div className="row">
              {filteredProjects.map((item) => (
                <ProjectCard
                  id={item.id}
                  titulo={item.title}
                  status={"ok"}
                  description={item.description}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProjectListPage;
