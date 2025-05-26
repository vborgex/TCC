import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import React, { useEffect, useState } from "react";
import "./../ProjectDetailsPage/details.css";
import Navbar from "../../components/navbar";
import { useSelector } from "react-redux";
import { dbService } from "../../service/dbService";
import { Link, useParams } from "react-router-dom";
import astronaut from "./../../assets/Astronaut3.svg";

function ProjectDetailsPage() {
  const { id } = useParams();
  const role = useSelector((state) => state.usuario.usuarioRole);
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchProject() {
      try {
        const resultado = await dbService.getProjectData(id);
        if (resultado) {
          setProject(resultado);
        } else {
          setError(true);
        }
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchProject();
  }, [id]);

  return (
    <div className="background min-vh-100 overflow-auto p-0">
      <Navbar />
      <div className="d-flex p-2 justify-content-center">
        <div className="card-create-project p-10 w-100 max-w-900 mt-4 mb-4">
          <div className="text-center text-uppercase">
            <h2 id="eventName">Educatech</h2>
          </div>

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
            <div className="row justify-content-start align-items-end">
              <div className="col-12 d-flex flex-column align-items-start">
                <label className="label mb-2">Nome do projeto</label>
                <p>{project.title}</p>
              </div>
              <div className="col-lg-6 col-12 d-flex flex-column align-items-start">
                <label className="label mb-2">Categoria</label>
                <p>{project.category}</p>
              </div>
              <div className="col-lg-6 col-12 d-flex flex-column align-items-start">
                <label className="label mb-2">Nível de escolaridade</label>
                <p>{project.educationLevel}</p>
              </div>
              <div className="col-12 d-flex flex-column align-items-start">
                <label className="label mb-2">Resumo do projeto</label>
                <p className="text-justify">{project.description}</p>
              </div>

              {role === "AVALIADOR" && (
                <>
                  <div className="col-12 d-flex flex-column align-items-start">
                    <label className="label mb-2">Anexo do projeto</label>
                    <button className="btn btn-custom btn-regulamento mb-2">
                      <i className="bi bi-file-earmark-arrow-down me-2"></i>
                      Baixar Anexo
                    </button>
                  </div>
                  <div className="col-12 d-flex flex-column align-items-start">
                    <label className="label mb-2">Avaliar o projeto</label>
                    <Link
                      to={`/evaluate/${id}`}
                      className="btn btn-custom btn-regulamento mb-2"
                    >
                      <i className="bi bi-stars me-2"></i>
                      Avaliar
                    </Link>
                  </div>
                </>
              )}
              {role === "ORIENTADOR" && (
                  <div className="col-12 d-flex flex-column align-items-start">
                    <label className="label mb-2">Anexo do projeto</label>
                    <button className="btn btn-custom btn-regulamento mb-2">
                      <i className="bi bi-file-earmark-arrow-down me-2"></i>
                      Adicionar Anexo
                    </button>
                  </div>
                )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProjectDetailsPage;
