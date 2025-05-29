import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import React, { useEffect, useState } from "react";
import "./../EventDetailsPage/index.css";
import Navbar from "../../components/navbar";
import { useSelector } from "react-redux";
import { dbService } from "../../service/dbService";
import astronaut from "./../../assets/Astronaut3.svg";
import { Link, useParams } from "react-router-dom";

function EventDetailsPage() {
  const { id } = useParams();
  const role = useSelector((state) => state.usuario.usuarioRole);
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const isLoggedIn = useSelector((state) => state.usuario.usuarioLogado);
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchEvent() {
      try {
        const resultado = await dbService.getEventData(id);
        if (resultado) {
          setEvent(resultado);
        } else {
          setError(true);
        }
      } catch (error) {
        console.error("Error fetching event data:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    async function getUser() {
      if (isLoggedIn) {
        const userData = await dbService.getUserData();
        setUser(userData);
      }
    }
    getUser();
    fetchEvent();
  }, [id]);

  return (
    <div className="background min-vh-100 overflow-auto p-0">
      <Navbar />
      <div className="d-flex p-2 justify-content-center">
        <div className="card-create-project p-10 w-100 max-w-900 mt-4 mb-4">
          {loading ? (
            <div className="text-center mt-4">
              <p>Carregando...</p>
            </div>
          ) : error ? (
            <div className="d-flex flex-column justify-content-center align-items-center">
              <h5>Evento não encontrado!</h5>
              <img
                src={astronaut}
                className="align-self-center w-50 h-auto"
                alt="..."
              />
            </div>
          ) : (
            <>
              <div className="text-center text-uppercase">
                <h2 id="eventName" className="fs-3 text-truncate">
                  {event.title}
                </h2>
              </div>
              <div className="col-12 d-flex flex-column align-items-start">
                <label className="label mb-2">Resumo do evento</label>
                <p className="text-justify">{event.description}</p>
              </div>

              <div className="row justify-content-start align-items-start">
                <div className="col-lg-6 col-12 d-flex flex-column align-items-start">
                  <label className="label mb-2">Categorias</label>
                  {event.categories.map((item, i) => (
                    <p key={i}>{item}</p>
                  ))}
                </div>
                <div className="col-lg-6 col-12 d-flex flex-column align-items-start">
                  <label className="label mb-2">Níveis de escolaridade</label>
                  {event.educationLevels.map((item, i) => (
                    <p key={i}>{item}</p>
                  ))}
                </div>

                {isLoggedIn && role === "ORIENTADOR" ? (
                  <>
                    <div class="col-auto me-auto">
                      <Link className=" btn btn-create btn-sm" to={`/createproject/${id}`}>
                        Criar projeto
                      </Link>
                    </div>
                    <div class="col-auto">
                      <button className="btn btn-favorite">
                        <i className="bi bi-heart"></i>
                      </button>
                    </div>
                  </>
                ) : null}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default EventDetailsPage;
