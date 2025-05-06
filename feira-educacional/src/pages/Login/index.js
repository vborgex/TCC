import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import React from "react";
import "./login.css";
import logo from "../../assets/Logo2.svg";
import { AuthService } from "../../service/authService";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState({
    email: "",
    password: "",
    general: "",
  });
  const navigate = useNavigate();
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
  const validatePassword = (value) => {
    setPassword(value);
    if (!value) {
      setError((prev) => ({
        ...prev,
        password: "Por favor, preencha a senha.",
      }));
    } else {
      setError((prev) => ({ ...prev, password: "" }));
    }
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    setError({
      email: " ",
      password: " ",
      general: " ",
    });
    if (!email || !password) {
      setError((prev) => ({ ...prev, general: "Preencha todos os campos." }));
      return;
    }

    try {
      await AuthService.login(email, password, rememberMe);
      navigate("/createProject");
    } catch (err) {
      switch (err.code) {
        case "auth/user-not-found":
          setError((prev) => ({ ...prev, email: "E-mail não cadastrado." }));
          break;
        case "auth/wrong-password":
          setError((prev) => ({
            ...prev,
            password: "A senha fornecida está incorreta.",
          }));
          break;
        case "auth/invalid-email":
          setError((prev) => ({
            ...prev,
            email: "O e-mail fornecido está em um formato inválido.",
          }));
          break;
        case "auth/user-disabled":
          setError((prev) => ({
            ...prev,
            general:
              "A conta do usuário registrada com este e-mail foi desativada.",
          }));
          break;
        default:
          setError((prev) => ({ ...prev, general: "Erro ao logar." }));
      }
    }
  };

  return (
    <div className="background d-flex justify-content-center align-items-center vh-100 p-3">
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
          {error.email && <p className="text-danger">{error.email}</p>}
          <div className="input-group mb-2">
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              placeholder="Senha"
              value={password}
              onChange={(e) => validatePassword(e.target.value)}
              required
            />
            <button
              className="btn-icon-only"
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              <i
                className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}
              ></i>
            </button>
          </div>
          {error.password && <p className="text-danger">{error.password}</p>}
          <div className="form-check mb-2">
            <input
              className="form-check-input"
              type="checkbox"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
            <label className="form-check-label" for="flexCheckDefault">
              Manter conectado
            </label>
          </div>
          <button className="btn btn-custom rounded-pill mb-2 w-100">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
