import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import React from "react";
import "./projectCard.css";
import { Link } from "react-router-dom";

function ProjectCard({id, titulo, status }) {
  return (
    <div className="list-group-item d-flex justify-content-between align-items-center flex-wrap m-1">
      <Link to={'/details/'+id}>
        <span id="projectTitle" className="project-title text-truncate">
          {titulo}
        </span>
      </Link>
      <Link to="">
        <span id="projectStatus">{status}</span>
      </Link>
    </div>
  );
}

export default ProjectCard;
