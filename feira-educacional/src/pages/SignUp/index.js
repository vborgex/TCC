import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useNavigate } from "react-router-dom"; 
import { AuthService } from "../../service/authService";
import React, { useState } from "react";
import "./index.css";
import logo from "../../assets/Logo2.svg";

function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false);
  const [selectedRole, setSelectedRole] = useState("Escolha uma opção");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState({
    email: " ",
    password: " ",
    confirmPassword: " ",
    role: " ",
    general: " ",
  });

  const navigate = useNavigate();

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    if (role === "Escolha uma opção") {
      setError((prev) => ({ ...prev, role: "Selecionar campo." }));
    } else {
      setError((prev) => ({ ...prev, role: "" }));
    }
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

  const validatePassword = (value) => {
    setPassword(value);

    if (!value) {
      setError((prev) => ({
        ...prev,
        password: "Por favor, preencha a senha.",
      }));
    } else if (value.length < 6) {
      setError((prev) => ({
        ...prev,
        password: "A senha deve ter pelo menos 6 caracteres.",
      }));
    } else {
      setError((prev) => ({ ...prev, password: "" }));
    }
  };

  const validateConfirmPassword = (value) => {
    setConfirmPassword(value);
    if (value !== password) {
      setError((prev) => ({
        ...prev,
        confirmPassword: "As senhas são incompatíveis.",
      }));
    } else {
      setError((prev) => ({ ...prev, confirmPassword: "" }));
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError({
      email: " ",
      password: " ",
      confirmPassword: " ",
      role: " ",
      general: " ",
    });
    if (!email || !password || !confirmPassword) {
      setError((prev) => ({ ...prev, general: "Preencha todos os campos." }));
      return;
    }

    if (password !== confirmPassword) {
      setError((prev) => ({
        ...prev,
        confirmPassword: "As senhas são incompatíveis.",
      }));
      return;
    }

    if (selectedRole === "Escolha uma opção") {
      setError((prev) => ({ ...prev, role: "Selecione uma opção." }));
      return;
    }

    try {
      await AuthService.register(email, password, selectedRole);
      navigate("/login");
    } catch (err) {
      switch (err.code) {
        case "auth/invalid-email":
          setError((prev) => ({ ...prev, email: "Email inválido." }));
          break;
        case "auth/weak-password":
          setError((prev) => ({ ...prev, password: "A senha é muito fraca." }));
          break;
        case "auth/email-already-in-use":
          setError((prev) => ({ ...prev, email: "Email já está em uso." }));
          break;
        default:
          setError((prev) => ({ ...prev, general: "Erro ao registrar." }));
      }
    }
  };

  return (
    <div className="background d-flex justify-content-center align-items-center vh-100 p-3">
      <div className="card-login text-center">
        <img
          src={logo}
          alt="Logo Saggio"
          className="logo mb-4 d-block mx-auto"
        />
        <form onSubmit={onSubmit}>
          <input
            className="form-control mb-1"
            placeholder="E-mail"
            type="email"
            value={email}
            onChange={(e) => validateEmail(e.target.value)}
            required
          />
          {error.email && <p className="text-danger">{error.email}</p>}

          <div className="input-group mb-1">
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

          <div className="input-group mb-1">
            <input
              type={showPasswordConfirmation ? "text" : "password"}
              className="form-control"
              placeholder="Confirmar Senha"
              value={confirmPassword}
              onChange={(e) => validateConfirmPassword(e.target.value)}
              required
            />
            <button
              className="btn-icon-only"
              type="button"
              onClick={() =>
                setShowPasswordConfirmation(!showPasswordConfirmation)
              }
            >
              <i
                className={`bi ${
                  showPasswordConfirmation ? "bi-eye-slash" : "bi-eye"
                }`}
              ></i>
            </button>
          </div>
          {error.confirmPassword && (
            <p className="text-danger">{error.confirmPassword}</p>
          )}

          <div className="dropdown mb-1 align-items-center">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {selectedRole}
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <li>
                <button
                  className="dropdown-item"
                  type="button"
                  onClick={() => handleRoleSelect("Orientador")}
                >
                  Orientador
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  type="button"
                  onClick={() => handleRoleSelect("Administrador")}
                >
                  Administrador
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  type="button"
                  onClick={() => handleRoleSelect("Aluno")}
                >
                  Aluno
                </button>
              </li>
            </ul>
          </div>
          {error.role && <p className="text-danger">{error.role}</p>}

          <button
            className="btn btn-custom rounded-pill mb-3 w-100"
            type="submit"
          >
            Cadastrar
          </button>

          {error.general && <p className="text-danger">{error.general}</p>}
        </form>
      </div>
    </div>
  );
}

export default SignUpPage;
