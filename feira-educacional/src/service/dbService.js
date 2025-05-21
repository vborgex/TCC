  import { db, auth } from "./../config/firebase";
  import { collection, addDoc, doc, getDoc, getDocs} from "firebase/firestore";
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
    async getProjectData(project){
      try{
        const user = auth.currentUser;
        const projectRef = collection(db, "users", user.iud, project.iud);
        await getDoc(doc(db, projectRef));
      }catch(error){
        console.error("Erro ao buscar projeto:", error);
      }
    },
    async getProjects(){
      try {
        
        const user = auth.currentUser;
        console.log("Usuária logada:", user);
        const projectRef = collection(db, "users", user.uid, "projects");
        const querySnapshot = await getDocs(projectRef);
        return querySnapshot
      } catch (error) {
        throw error;
      }
    },
    async getUserData() {
      try {
        const user = auth.currentUser;
        if (!user) return null;
        console.log(user.uid);
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (!userDoc.exists()) {
          console.warn("Documento do usuário não encontrado.");
          return null;
        }
        const userData = userDoc.data();
        return userData;
      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
        throw error;
      }
    },
  };
