import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import React from "react";
import "./index.css";
import logo from "../../assets/Logo.svg";
import { useState } from "react";

function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);
  return (
    <div className="background d-flex justify-content-center align-items-center vh-100 p-3">
      <div className="card-login text-center">
        <img
          src={logo}
          alt="Logo Saggio"
          className="logo mb-4 d-block mx-auto"
        />
        <input className="form-control mb-2"
        placeholder="E-mail"/>
        <div className="input-group mb-2">
          <input
            type={showPassword ? "text" : "password"}
            className="form-control"
            placeholder="Senha"
          />
          <button
            className="btn-icon-only"
            type="button"
            onClick={() => setShowPassword(!showPassword)}
          >
            <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
          </button>
        </div>
        <div className="input-group mb-2">
          <input
            type={showPasswordConfirmation ? "text" : "password"}
            className="form-control"
            placeholder="Confirmar Senha"
          />
          <button
            className="btn-icon-only"
            type="button"
            onClick={() => setShowPasswordConfirmation(!showPasswordConfirmation)}
          >
            <i className={`bi ${showPasswordConfirmation ? "bi-eye-slash" : "bi-eye"}`}></i>
          </button>
        </div>
        <button className="btn btn-custom rounded-pill mb-3 w-100">
          Cadastrar
        </button>
      </div>
    </div>
  );
}

export default SignUpPage;
