import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import React from "react";
import "./index.css";
import astronaut from "./../../assets/Astronaut2.svg";
import NavBar from "./../../components/navbar";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function HomePage() {
  return (
    <div className="background-home min-vh-100 overflow-auto p-0">

      <NavBar />
      <div className="container-fluid d-flex flex-column justify-content-between p-5 min-vh-100">
        <div className="row flex-grow-1">
          <div className="col-md-6 col-12 d-flex flex-column justify-content-start align-items-start ps-5 m-0">
            <h1 className="text-uppercase display-3" id="welcome">
              Bem vinda,
            </h1>
            <h1 className="text-uppercase display-3" id="username">
              {useSelector((state) => state.usuario.usuarioEmail)}
            </h1>
          </div>
          <div className="col-md-6 col-12 d-flex align-items-center p-0 m-0 justify-content-lg-center justify-content-end">
            <img
              src={astronaut}
              className="mw-100 img-fluid object-fit-scale"
              alt="Astronaut"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
