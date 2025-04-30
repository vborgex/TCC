import { BrowserRouter, Routes, Route } from "react-router-dom";
import StartPage from "./pages/StartPage";
import SignUpPage from "./pages/SignUp";
import NavBar from "./utils";
import LoginPage from "./pages/Login";
import CreateProjectPage from "./pages/CreateProjectPage";
import ProjectDetailsPage from "./pages/ProjectDetailsPage";
import EvaluationPage from "./pages/EvaluationPage";
function RoutesApp(){
    return (
        <BrowserRouter>
            {/* <Header /> */}
            <Routes>
                {/* <Route path='/' element={<Home/>} /> */}
                <Route path='/start' element={<StartPage/>} />
                <Route path='/cadastro' element={<SignUpPage/>} />
                <Route path='/login' element={<LoginPage/>}/>
                <Route path='/navbar' element = {<NavBar/>}/>
                <Route path='/createProject' element = {<CreateProjectPage/>}/>
                <Route path="/details" element={<ProjectDetailsPage/>}/>
                <Route path="/evaluate" element={<EvaluationPage/>}/>
                {/* <Route path='*'  element={<Erro/>} /> */}
            </Routes>
        </BrowserRouter>
    );
}

export default RoutesApp;