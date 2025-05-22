import { BrowserRouter, Routes, Route } from "react-router-dom";
import StartPage from "./pages/StartPage";
import SignUpPage from "./pages/SignUp";
import LoginPage from "./pages/Login";
import CreateProjectPage from "./pages/CreateProjectPage";
import ProjectDetailsPage from "./pages/ProjectDetailsPage";
import EvaluationPage from "./pages/EvaluationPage";
import HomePage from "./pages/HomePage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ProjectListPage from "./pages/ProjectListPage";
import ProtectedRoute from "./components/protectedRoute";
import PublicOnlyRoute from "./components/publicOnlyRoute";

function RoutesApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/details/:id" element={<ProjectDetailsPage />} />

        <Route element={<PublicOnlyRoute />}>
          <Route path="/start" element={<StartPage />} />
          <Route path="/register" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgotPassword" element={<ForgotPasswordPage />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoutes={["ORIENTADOR"]} />}>
          <Route path="/createProject" element={<CreateProjectPage />} />
          <Route path="/projectList" element={<ProjectListPage />} />
        </Route>
        <Route element={<ProtectedRoute allowedRoutes={["AVALIADOR"]} />}>
          <Route path="/evaluate" element={<EvaluationPage />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default RoutesApp;
