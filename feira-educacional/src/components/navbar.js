import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { AuthService } from "./../service/authService";
import "./Navbar.css";
import logo from "../assets/Logo2.svg";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

function Navbar() {
  const isLoggedIn = useSelector((state) => state.usuario.usuarioLogado) > 0;
  const role = useSelector((state) => state.usuario.usuarioRole);
  const dispatch = useDispatch();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-5">
      <a className="navbar-brand">
        <img src={logo} alt="Logo" height="55" />
      </a>
      <button
        className="navbar-toggler border-0"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNavDropdown">
        <ul className="navbar-nav ms-auto">
          {isLoggedIn ? (
            <>
              <li className="nav-item">
                <Link to="/home" className="nav-link" aria-current="page">
                  Início
                </Link>
              </li>
              {role === "ORIENTADOR" ? (
                <li className="nav-item dropdown">
                  <Link
                    to="/"
                    className="nav-link dropdown-toggle"
                    id="navbarDropdownMenuLink"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Eventos
                  </Link>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdownMenuLink"
                  >
                    <li>
                      <Link
                        to="/myprojects"
                        className="dropdown-item align-items-center"
                      >
                        <i className="bi bi-folder me-1"></i>
                        Meus projetos
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/createProject"
                        className="dropdown-item align-items-center"
                      >
                        <i className="bi bi-heart me-1"></i>
                        Favoritos
                      </Link>
                    </li>
                  </ul>
                </li>
              ) : role === "AVALIADOR" ? (
                <li className="nav-item">
                  <Link to="" className="nav-link">
                    Eventos
                  </Link>
                </li>
              ) : role === "ORGANIZADOR" ? (
                  <li className="nav-item">
                    <Link to="" className="nav-link">
                      Eventos
                    </Link>
                  </li>
                ) :(<> </>)}

              <li className="nav-item">
                <Link to="" className="nav-link">
                  Notificações
                </Link>
              </li>
              <li className="nav-item dropdown">
                <Link
                  to=""
                  className="nav-link dropdown-toggle"
                  id="navbarDropdownMenuLink"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Minha conta
                </Link>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="navbarDropdownMenuLink"
                >
                  <li>
                    <Link to="" className="dropdown-item">
                      <i className="bi bi-person-circle me-1"></i>
                      Meu Perfil
                    </Link>
                  </li>
                  <Link
                    className="dropdown-item"
                    onClick={async () => {
                      try {
                        await AuthService.logout();
                        dispatch({ type: "LOG_OUT" });
                      } catch (error) {
                        console.error("Erro ao deslogar:", error);
                      }
                    }}
                  >
                    <i className="bi bi-box-arrow-right me-1"></i>
                    Sair
                  </Link>
                </ul>
              </li>
            </>
          ) : (
            <li className="nav-item">
              <Link to="/start" className="nav-link" aria-current="page">
                Login
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
