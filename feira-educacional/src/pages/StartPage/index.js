import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import "./index.css";
import logo from "../../assets/Logo2.svg";
import { Link } from "react-router-dom";


function StartPage() {
  return (
    <div className="background d-flex justify-content-center align-items-center vh-100 p-3">
      <div className="card-login text-center">
        <img
          src={logo}
          alt="Logo Saggio"
          className="logo mb-4 d-block mx-auto"
        />
        <Link  to="/register" className="btn btn-custom rounded-pill mb-2 w-100">
          Cadastre-se
        </Link>
        <Link to="/login" className="btn btn-custom rounded-pill mb-2 w-100">
          Já possuo uma conta
        </Link>
      </div>
    </div>
  );
}

export default StartPage;
