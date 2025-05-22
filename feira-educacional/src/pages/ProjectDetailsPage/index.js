import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import React, { useEffect, useState } from "react";
import "./../ProjectDetailsPage/details.css";
import Navbar from "../../components/navbar";
import { useSelector } from "react-redux";
import { dbService } from "../../service/dbService";
import { useParams } from "react-router-dom";

function ProjectDetailsPage(props) {
  const { id } = useParams();
  const role = useSelector((state) => state.usuario.usuarioRole);
  const [project, setProject] = useState({});

  useEffect(() => {
    async function fetchProject() {
      try {
        const resultado = await dbService.getProjectData(id);
        setProject(resultado);
      } catch (error) {
        console.error("Erro ao buscar projeto:", error);
      }
    }

    fetchProject();
  }, [id]);
  return (
    <div className="background min-vh-100 overflow-auto p-0">
      <Navbar />
      <div className=" d-flex p-2 justify-content-center">
        <div className="card-create-project p-10 w-100 max-w-900 mt-4 mb-4">
          <div className="text-center text-uppercase">
            <h2 id="eventName">Educatech</h2>
          </div>
          <div className="row justify-content-start align-items-end">
            <div className="col-12 d-flex flex-column align-items-start">
              <label className="label mb-2">Nome do projeto</label>
              <h>{project?.title ?? "Carregando..."}</h>
            </div>
            <div className="col-lg-6 col-12 d-flex flex-column align-items-start">
              <label className="label mb-2">Categoria</label>
              <h>{project?.category ?? "Carregando..."}</h>
            </div>
            <div className="col-lg-6 col-12 d-flex flex-column align-items-start">
              <label className="label mb-2">Nivel de escolaridade</label>
              <h>{project?.educationLevel ?? "Carregando..."}</h>
            </div>
            {/* <div className="col-lg-6 col-12 d-flex flex-column align-items-start">
              <label className="label mb-2">Alunos</label>
              <ul>
                <li>
                  <h>Pensamento Computacional</h>
                </li>
                <li>
                  <h>Pensamento Computacional</h>
                </li>
              </ul>
            </div> */}
            <div className="col-12 d-flex flex-column align-items-start">
              <label className="label mb-2">Resumo do projeto</label>
              <p className="text-justify">
                {project?.description ?? "Carregando..."}
              </p>
            </div>

            <div className="col-12 d-flex flex-column align-items-start">
              <label className="label mb-2">Anexo da avaliação</label>
              <button className="btn btn-custom btn-regulamento mb-2">
                <i className="bi bi-file-earmark-arrow-down me-2"></i>
                Adicionar Anexo
              </button>
            </div>
            {role === "AVALIADOR" ? (
              <div className="col-12 d-flex flex-column align-items-start">
                <button className="btn btn-custom btn-regulamento mb-2">
                  <i className="bi bi-stars me-2"></i>
                  Avaliar
                </button>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectDetailsPage;
