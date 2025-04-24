import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import React from "react";
import "./index.css";
import logo from "../../assets/Logo.svg";

function CreateEventPage() {
  return (
    <div className="background d-flex justify-content-center align-items-center vh-100 p-2">
      <div className="card-createevent text-center">
        <div className="row">
          
        </div>
        <input className="form-control mb-2"
        placeholder="E-mail"/>
        <button className="btn btn-custom rounded-pill mb-3 w-100">
          Cadastrar
        </button>
      </div>
    </div>
  );
}

export default CreateEventPage;
