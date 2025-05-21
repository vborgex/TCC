import { BrowserRouter, Routes, Route } from "react-router-dom";
import StartPage from "./pages/StartPage";
import SignUpPage from "./pages/SignUp";
import LoginPage from "./pages/Login";
import CreateProjectPage from "./pages/CreateProjectPage";
import ProjectDetailsPage from "./pages/ProjectDetailsPage";
import EvaluationPage from "./pages/EvaluationPage";
import HomePage from "./pages/HomePage";
import store from "../src/store/";
import { Provider } from "react-redux";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ProjectListPage from "./pages/ProjectListPage";

function RoutesApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/start" element={<StartPage />} />
        <Route path="/register" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/createProject" element={<CreateProjectPage />} />
        <Route path="/details" element={<ProjectDetailsPage />} />
        <Route path="/evaluate" element={<EvaluationPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/forgotPassword" element={<ForgotPasswordPage />} />
        <Route path="/projectList" element={<ProjectListPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default RoutesApp;
