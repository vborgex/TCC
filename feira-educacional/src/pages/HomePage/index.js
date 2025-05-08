import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import React from "react";
import "./index.css";
import astronaut from "./../../assets/Astronaut2.svg";
import NavBar from "./../../components/navbar"

function HomePage() {
  return (
    <div>
      <NavBar/>
    <div className="background-home container-fluid d-flex min-vh-100 justify-content-center overflow-auto">

      <div className="row ">
        <div className="col-md-6 col-12 d-flex flex-column justify-content-start align-items-start ps-5  m-0">
          <h1 className="text-uppercase display-3" id="welcome">
            Bem vinda,
          </h1>
          <h1 className="text-uppercase display-3" id="username">
            Vanessa
          </h1>
        </div>
        <div className="col-md-6 col-12 d-flex justify-content-center align-items-center p-0 m-0">
          <img src={astronaut} className="mw-100 img-fluid object-fit-scale"></img>
        </div>
      </div>
    </div>
    </div>
  );
}

export default HomePage;
