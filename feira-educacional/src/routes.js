import { BrowserRouter, Routes, Route } from "react-router-dom";
import StartPage from "./pages/StartPage";
import SignUpPage from "./pages/SignUp";
import LoginPage from "./pages/Login";
import NavBar from "./utils";
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
                {/* <Route path='*'  element={<Erro/>} /> */}
            </Routes>
        </BrowserRouter>
    );
}

export default RoutesApp;