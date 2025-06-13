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
import CreateEventPage from "./pages/CreateEventPage";
import EventListPage from "./pages/EventListPage";
import EventDetailsPage from "./pages/EventDetailsPage";
import PublicEventListPage from "./pages/PublicEventList";
import EvaluationDetailsPage from "./pages/EvaluationDetailsPage";
import ManageEvaluatorsPage from "./pages/ManageEvaluators";

function RoutesApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/project/:id" element={<ProjectDetailsPage />} />
        <Route path="/event/:id" element={<EventDetailsPage />} />
        <Route path="/createEvent" element={<CreateEventPage />} />
        <Route path="/editEvent/:eventId" element={<CreateEventPage/>}/>
        <Route path="/myEvents" element={<EventListPage />} />
        <Route path="/events" element={<PublicEventListPage />} />
        <Route path="/projects/:eventId" element={<ProjectListPage/>}/>
        <Route path="/projects/:eventId/:userId" element={<ProjectListPage/>}/>
        <Route
          path="/evaluationDetails/:id"
          element={<EvaluationDetailsPage />}
        />
        <Route path="/manageevaluators/:eventId" element={<ManageEvaluatorsPage/>}/>

        <Route element={<PublicOnlyRoute />}>
          <Route path="/start" element={<StartPage />} />
          <Route path="/register" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgotPassword" element={<ForgotPasswordPage />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoutes={["ORIENTADOR"]} />}>
          <Route
            path="/createproject/:eventId"
            element={<CreateProjectPage />}
          />
          <Route
            path="/editproject/:eventId/:projectId"
            element={<CreateProjectPage />}
          />

          <Route path="/myProjects" element={<ProjectListPage />} />
        </Route>
        <Route element={<ProtectedRoute allowedRoutes={["AVALIADOR"]} />}>
          <Route path="/evaluate/:id" element={<EvaluationPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default RoutesApp;
