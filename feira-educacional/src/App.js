import { useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import RoutesApp from "./routes";
import { AuthService } from "./service/authService";
import { dbService } from "./service/dbService";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userData = await dbService.getUserData();
        dispatch({
          type: "LOG_IN",
          usuarioEmail: user.email,
          usuarioNome: userData?.name || "",
          usuarioRole: userData?.role || "",
        });
      } else {
        dispatch({ type: "LOG_OUT" });
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return <RoutesApp />;
}

export default App;
