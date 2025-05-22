import React from "react";
import "./loading.css";
import Logo from "./../assets/Logo2.svg"

function Loading() {
  return (
    <div className="background loading-background">
      <div className="card-create-project loading-card">
        <img src={Logo} alt="Logo" className="logo loading-logo" />
        <div className="spinner"></div>
        <p className="loading-text">Carregando...</p>
      </div>
    </div>
  );
}

export default Loading;
