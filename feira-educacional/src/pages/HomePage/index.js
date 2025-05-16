import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import React  from "react";
import "./index.css";
import astronaut from "./../../assets/Astronaut2.svg";
import NavBar from "./../../components/navbar";
import { useSelector } from "react-redux";

function HomePage() {
  const isLoggedIn = useSelector((state) => state.usuario.usuarioLogado) > 0;
  const userRole = useSelector((state) => state.usuario.usuarioRole);
  const userName = useSelector((state)=> state.usuario.usuarioNome);
  return (
    <div className="background-home min-vh-100 overflow-auto p-0">
      <NavBar />
      <div className="container-fluid d-flex flex-column justify-content-between p-5 min-vh-100">
        <div className="row flex-grow-1">
          <div className="col-md-6 col-12 d-flex flex-column justify-content-start align-items-start ps-5 m-0">
            {isLoggedIn ? (
              <>
                <h1 className="text-uppercase display-3" id="welcome">
                  Welcome, {userRole}!
                </h1>
                <h1 className="text-uppercase display-3" id="username">
                  {userName}
                </h1>
              </>
            ) : (
              <>
                <h1 className="text-uppercase display-3" id="welcome">Bem vindo!</h1>
                <h2 id="welcome"> Entre ou cadastre-se e aproveite o Saggio!</h2>
              </>
            )}
          </div>
          <div className="col-md-6 col-12 d-flex align-items-center p-0 m-0 justify-content-lg-center justify-content-end">
            <img
              src={astronaut}
              className="mw-100 img-fluid object-fit-scale"
              alt="Astronaut"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
