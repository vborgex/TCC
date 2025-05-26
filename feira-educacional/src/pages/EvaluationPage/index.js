import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import React, { useEffect, useState } from "react";
import "./index.css";
import Navbar from "../../components/navbar";
import { useParams } from "react-router-dom";
import { dbService } from "../../service/dbService";
import astronaut from "./../../assets/Astronaut3.svg"

function EvaluationPage(props) {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleGradeBlur = (e) => {
    let value = parseFloat(e.target.value);

    if (isNaN(value)) {
      e.target.value = "0.1";
      return;
    }

    if (value < 0.1) value = 0.1;
    if (value > 10) value = 10;

    e.target.value = value.toFixed(2);
  };

  useEffect(() => {
    async function fetchProject() {
      try {
        const resultado = await dbService.getProjectData(id);
        if(resultado){
          setProject(resultado);
        }else{
          setError(true);
        }
      } catch (error) {
        setError(true);
      }finally{
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
          <div className="text-center">
            <h2 id="eventName" className="text-uppercase">
              Educatech
            </h2>
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
                <h5 id="projectName" className="">
                  {project.title}
                </h5>
                <div className="row justify-content-start align-items-end">
                  <div className="col-lg-6 col-12 d-flex flex-column align-items-start">
                    <label className="label mb-2">Caráter Científico</label>
                    <div className="input-group w-50">
                      <input
                        className="form-control mb-2 no-spinner"
                        id="projectGrade"
                        placeholder="Nota"
                        type="number"
                        min="0.1"
                        max="10.0"
                        onBlur={handleGradeBlur}
                      />
                      <span className="input-group-text">/10.00</span>
                    </div>

                    <textarea
                      className="form-control mb-2"
                      id="projectGradeComment"
                      placeholder="Escreva uma descrição da nota."
                      rows="4"
                      maxLength="280"
                    ></textarea>
                  </div>

                  <div className="col-12 d-flex flex-column align-items-start">
                    <label className="label mb-2">Anexo do projeto</label>
                    <button className="btn btn-custom btn-regulamento mb-2">
                      <i className="bi bi-file-earmark-arrow-up me-2"></i>
                      Adicionar Anexo
                    </button>
                  </div>

                  <div className="d-flex gap-2 mt-3">
                    <button className="btn btn-cancelar rounded-pill flex-fill">
                      Cancelar
                    </button>
                    <button className="btn btn-confirmar rounded-pill flex-fill">
                      Confirmar
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EvaluationPage;
