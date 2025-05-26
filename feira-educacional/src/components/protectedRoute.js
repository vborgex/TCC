import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

function ProtectedRoute({allowedRoutes}){
    const authUser = useSelector((state) => state.usuario.usuarioLogado);
    const userRole = useSelector((state) => state.usuario.usuarioRole);
    if (!authUser) return <Navigate to="/start"/>;
    if (!allowedRoutes.includes(userRole)) return <Navigate to="/home"/>;
    return <Outlet/>;
}

export default ProtectedRoute;