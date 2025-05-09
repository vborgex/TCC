import React, { useState } from "react";
import "./index.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "./../../service/authService";
import { useSelector } from "react-redux";
import logo from "./../../assets/Logo.svg";
import { AuthService } from "./../../service/authService";
function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmail(value);

    if (!value) {
      setError("Por favor, preencha o e-mail.");
    } else if (!emailRegex.test(value)) {
      setError("Email inválido.");
    } else {
      setError("");
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!email) {
      setError("Por favor, preencha o campo de e-mail");
      return;
    }

    try {
      await AuthService.retrievePassword(email);
      navigate("/login")
    } catch (err) {
      switch (err.code) {
        case "auth/invalid-email":
          setError("O e-mail fornecido está em um formato inválido.");
          break;
        default:
          setError("Erro na recuperação de senha");
      }
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
        <form onSubmit={onSubmit}>
          <input
            className="form-control mb-2"
            placeholder="E-mail"
            value={email}
            onChange={(e) => validateEmail(e.target.value)}
            required
          />
          {error && <p className="text-danger">{error}</p>}
          <button className="btn btn-custom rounded-pill mb-2 w-100">
            Recuperar minha senha
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
