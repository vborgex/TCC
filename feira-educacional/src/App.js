import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import RoutesApp from "./routes";
import { dbService } from "./service/dbService";
import Loading from "./components/loading";

function App() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

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

      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [dispatch]);

  if (isLoading) {
    return <Loading/>;
  }

  return <RoutesApp />;
}

export default App;
