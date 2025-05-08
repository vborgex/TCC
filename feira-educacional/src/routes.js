import { BrowserRouter, Routes, Route } from "react-router-dom";
import StartPage from "./pages/StartPage";
import SignUpPage from "./pages/SignUp";
import LoginPage from "./pages/Login";
import CreateProjectPage from "./pages/CreateProjectPage";
import ProjectDetailsPage from "./pages/ProjectDetailsPage";
import EvaluationPage from "./pages/EvaluationPage";
import HomePage from "./pages/HomePage";

function RoutesApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/start" element={<StartPage />} />
        <Route path="/register" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/createProject" element={<CreateProjectPage />} />
        <Route path="/details" element={<ProjectDetailsPage />} />
        <Route path="/evaluate" element={<EvaluationPage />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default RoutesApp;
