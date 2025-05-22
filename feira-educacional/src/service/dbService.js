import { db, auth } from "./../config/firebase";
import {  collection, addDoc, doc, getDoc, getDocs, query, where,} from "firebase/firestore";

export const dbService = {
  async createProject(title, description, educationLevel, category) {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("Usuário não autenticado.");

      const newProject = {
        title,
        description,
        educationLevel,
        category,
        creatorId: user.uid,
        createdAt: new Date(),
      };

      await addDoc(collection(db, "projects"), newProject);
    } catch (error) {
      throw error;
    }
  },

  async getProjectData(projectId) {
    try {
      const projectDoc = await getDoc(doc(db, "projects", projectId));
      if (!projectDoc.exists()) return null;
      return projectDoc.data();
    } catch (error) {
      throw error;
    }
  },

  async getProjects() {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("Usuário não autenticado.");

      const projectRef = collection(db, "projects");
      const q = query(projectRef, where("creatorId", "==", user.uid));
      const querySnapshot = await getDocs(q);

      const projects = [];
      querySnapshot.forEach((doc) => {
        projects.push({ id: doc.id, ...doc.data() });
      });

      return projects;
    } catch (error) {
      throw error;
    }
  },

  async getUserData() {
    try {
      const user = auth.currentUser;
      if (!user) return null;

      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (!userDoc.exists()) return null;

      return userDoc.data();
    } catch (error) {
      throw error;
    }
  },
};
