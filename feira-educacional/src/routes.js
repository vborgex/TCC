import { BrowserRouter, Routes, Route } from 'react-router-dom';
import StartPage from './pages/StartPage';
import SignUpPage from './pages/SignUp';
import LoginPage from './pages/Login';
import CreateProjectPage from './pages/CreateProjectPage';
import ProjectDetailsPage from './pages/ProjectDetailsPage';
import EvaluationPage from './pages/EvaluationPage';
import LayoutWNavbar from "./components/layoutWNavbar";

function RoutesApp() {
  const usuarioAutenticado = true;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/start" element={<StartPage />} />
        <Route path="/cadastro" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />

        {usuarioAutenticado && (
          <Route element={<LayoutWNavbar />}>
            <Route path="/createProject" element={<CreateProjectPage />} />
            <Route path="/details" element={<ProjectDetailsPage />} />
            <Route path="/evaluate" element={<EvaluationPage />} />
          </Route>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default RoutesApp;
