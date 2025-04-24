import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useNavigate } from "react-router-dom"; // Usando o useNavigate
import { AuthService } from "../../service/authService";
import React, { useState } from "react";
import "./index.css";
import logo from "../../assets/Logo.svg";

function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false);
  const [selectedRole, setSelectedRole] = useState("Escolha uma opção");
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
  
    try {
      await AuthService.register(email, password, confirmPassword);
      navigate("/login");
    } catch (err) {
      setError(err.message);
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
        <input
          className="form-control mb-2"
          placeholder="E-mail"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <div className="input-group mb-2">
          <input
            type={showPassword ? "text" : "password"}
            className="form-control"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
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
            value={confirmPassword}
            onChange={(e)=>setConfirmPassword(e.target.value)}
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
              }`}></i>
          </button>
        </div>

        <div className="dropdown mb-2 align-items-center">
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
        <p className="text-danger">{error}</p>
        <button
          className="btn btn-custom rounded-pill mb-3 w-100"
          type="submit"
          onClick={onSubmit}
        >
          Cadastrar
        </button>
      </div>
    </div>
  );
}

export default SignUpPage;
