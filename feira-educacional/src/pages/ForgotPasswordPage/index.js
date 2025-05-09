import React, { useState } from "react";
import "./index.css";
import { Link, Navigate } from "react-router-dom";
import "./../../service/authService";
import { useSelector } from "react-redux";
import logo from "./../../assets/Logo.svg";

function ForgotPasswordPage() {
  const [email, setEmail] = useState();
  const [error, setError] = {
    email: "",
    password: "",
    general: "",
  };
  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmail(value);

    if (!value) {
      setError((prev) => ({ ...prev, email: "Por favor, preencha o e-mail." }));
    } else if (!emailRegex.test(value)) {
      setError((prev) => ({ ...prev, email: "Email inválido." }));
    } else {
      setError((prev) => ({ ...prev, email: "" }));
    }
  };
  return (
    <div className="background d-flex justify-content-center align-items-center vh-100 p-3">
      {useSelector((state) => state.usuario.usuarioLogado) > 0 ? (
        <Navigate to="/home" />
      ) : null}
      <div className="card-login">
        <img
          src={logo}
          alt="Logo Saggio"
          className="logo mb-4 d-block mx-auto"
        />
        {/* <form onSubmit={onSubmit}> */}
        <input
          className="form-control mb-2"
          placeholder="E-mail"
          value={email}
          onChange={(e) => validateEmail(e.target.value)}
          required
        />
        {error.email && <p className="text-danger">{error.email}</p>}
        <button className="btn btn-custom rounded-pill mb-2 w-100">
          Recuperar minha senha
        </button>
        {/* </form> */}
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
