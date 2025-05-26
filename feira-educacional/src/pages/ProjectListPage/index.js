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

function ProjectListPage() {
  const [projetos, setProjetos] = useState([]);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const resultado = await dbService.getProjects();
          setProjetos(resultado);
        } catch (error) {
          console.error("Erro ao buscar projetos:", error);
        }
      } else {
        console.warn("Usuária não está logada!");
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="background min-vh-100 overflow-auto p-0">
      <Navbar />
      <div className="d-flex p-2 justify-content-center">
        <div className="pt-4 p-5 w-100 mt-3 mb-4">
          <div className="text-center">
            <h2 className="text-uppercase" id="title-white">
              Meus projetos
            </h2>
          </div>
          {projetos.length === 0 ? (
            <div className="card-create-project d-flex flex-column justify-content-center align-items-center m-auto">
              <h5>Você ainda não possui nenhum projeto!</h5>
              <img
                src={astronaut}
                className="align-self-center w-50 h-auto m-1"
                alt="..."
              />
            </div>
          ) : (
            <div className="row">
              {projetos.map((item) => (
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
