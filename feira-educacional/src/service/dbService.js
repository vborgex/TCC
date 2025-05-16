import { db, auth } from "./../config/firebase";
import { collection, addDoc, doc, getDoc } from "firebase/firestore";
export const dbService = {
  async createProject(title, description, educationLevel, category) {
    try {
      const user = auth.currentUser;
      const projectRef = collection(db, "users", user.uid, "projects");
      const newProject = {
        title:title,
        description:description,
        educationLevel:educationLevel,
        category:category
      };
      await addDoc(projectRef, newProject);

    } catch (error) {
      throw error;
    }
  },
  async getUserData() {
    try {
      const user = auth.currentUser;
      if (!user) return null;
      if(user) console.log("há usuario")
      console.log(user.uid);
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (!userDoc.exists()) {
        console.warn("Documento do usuário não encontrado.");
        return null;
      }
      const userData = userDoc.data();
      console.log("Dados do usuário:", userData); 
      return userData;
    } catch (error) {
      console.error("Erro ao buscar dados do usuário:", error);
      throw error;
    }
  },
};
