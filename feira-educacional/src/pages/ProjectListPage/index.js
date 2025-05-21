import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./index.css";
import Navbar from "../../components/navbar";
import ProjectCard from "../../components/ProjectCard";
import { useState, useEffect } from "react";
import { dbService } from "./../../service/dbService";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./../../config/firebase";

function ProjectListPage() {
  const [projetos, setProjetos] = useState([]);
  let listaProjetos = [];
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const resultado = await dbService.getProjects();

          const listaProjetos = [];
          resultado.forEach((doc) => {
            listaProjetos.push({
              id: doc.id,
              ...doc.data(),
            });
          });
          console.log("Projetos:", listaProjetos);
          setProjetos(listaProjetos);
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
        <div className="card-create-project pt-4 p-3  w-100 max-w-900 mt-4 mb-4">
          <div className="text-center">
            <h2 className="text-uppercase" id="title">
              Meus projetos
            </h2>
          </div>

          <div className="list-group">
            {projetos.map((item) => (
              <ProjectCard titulo={item.title} status={"ok"} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectListPage;
