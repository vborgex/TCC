import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import React from "react";
import "./projectCard.css";
import { Link } from "react-router-dom";

function ProjectCard({id, titulo, status, description }) {
  return (
    <div className="div col-md-3 col-sm-12  p-1">
      <Link to={'/project/'+id} className="card card-card card-body text-decoration-none">
        <h5 id="projectTitle" className="project-title text-truncate">
          {titulo}
        </h5>
        <p className="card-text text-justify text-body-secondary overflow-hidden">{description}</p>
        <span id="projectStatus">{status}</span>

      </Link>
          
    </div>
  );
}

export default ProjectCard;
