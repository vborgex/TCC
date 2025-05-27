import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Link } from "react-router-dom";
import "./eventCard.css";

function EventCard({ id, titulo, status, description }) {
  return (
    
    <div className="div col-md-3 col-sm-12  p-1">
      <Link to={"/details/" + id} className="card text-decoration-none">
        <img src="https://placehold.co/600x400" className="card-img-top card-img object-fit-cover" alt="..."/>
        <div className="card-body">
          <h5 id="projectTitle" className="project-title text-truncate">
            {titulo}
          </h5>
          <p className="card-text text-justify text-body-secondary overflow-hidden">
            {description}
          </p>
          <span id="projectStatus">{status}</span>
        </div>
      </Link>
    </div>
        
  );
}

export default EventCard;
