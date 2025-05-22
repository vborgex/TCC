import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

function PublicOnlyRoute() {
  const authUser = useSelector((state) => state.usuario.usuarioLogado);
  if (authUser) return <Navigate to="/home" />;
  
  return <Outlet />;
}

export default PublicOnlyRoute;
