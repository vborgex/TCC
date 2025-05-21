import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import React from "react";
import "./projectCard.css";

function ProjectCard({titulo, status}) {
  return (
    <div className="list-group-item d-flex justify-content-between align-items-center flex-wrap m-1">
      <span id="projectTitle" className="project-title text-truncate">{titulo}</span>
      <span id="projectStatus">{status}</span>  
    </div>
  );
}

export default ProjectCard;
