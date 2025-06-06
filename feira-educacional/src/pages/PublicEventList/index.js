import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./index.css";
import Navbar from "../../components/navbar";
import { useState, useEffect } from "react";
import { dbService } from "./../../service/dbService";
import astronaut from "./../../assets/Astronaut3.svg";
import EventCard from "../../components/eventCard";

function PublicEventListPage() {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    async function fetchEvents() {
      try {
        const resultado = await dbService.getEvents();
        setEvents(resultado);
      } catch (error) {
        console.error("Erro ao buscar eventos:", error);
      }
    }

    fetchEvents();
  }, []);
  
  
  const filteredEvents = events.filter((event) => event.title.toLowerCase().includes(search.toLowerCase()));
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
                placeholder="Pesquisar eventos..."
                maxLength="50"
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          {events.length === 0 ? (
            <div className="card-create-project d-flex flex-column justify-content-center align-items-center m-auto">
              <h5>Nenhum evento por aqui!</h5>
              <img
                src={astronaut}
                className="align-self-center w-50 h-auto m-1"
                alt="..."
              />
            </div>
          ) : filteredEvents.length === 0 ? (
            <div className="text-white text-center m-auto ">
              <h5 className="text-uppercase fs-4 ">
                <strong>Nenhum evento corresponde à pesquisa!</strong>
              </h5>
            </div>
          ) : (
            <div className="row">
              {filteredEvents.map((item) => (
                <EventCard
                  img = {item.imgMetadata.url}
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

export default PublicEventListPage;
