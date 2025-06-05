import { db, auth } from "./../config/firebase";
import {
  collection,
  addDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";

export const dbService = {
  async createProject(
    title,
    description,
    educationLevel,
    category,
    eventId,
    phasesReplies
  ) {
    try {
      const eventRef = doc(db, "events", eventId);
      const eventSnap = await getDoc(eventRef);

      if (!eventSnap.exists()) {
        throw new Error("O evento especificado não existe.");
      }

      const user = auth.currentUser;
      if (!user) throw new Error("Usuário não autenticado.");

      const newProject = {
        title,
        description,
        educationLevel,
        category,
        creatorId: user.uid,
        eventId,
        phasesReplies,
        createdAt: serverTimestamp(),
      };

      await addDoc(collection(db, "projects"), newProject);
    } catch (error) {
      throw error;
    }
  },
  async updateProject(
    id,
    title,
    description,
    educationLevel,
    category,
    phasesReplies
  ) {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("Usuário não autenticado.");
      const projectRef = doc(db, "projects", id);
      const projectSnap = await getDoc(projectRef);
      if (!projectSnap.exists()) {
        throw new Error("Projeto não encontrado.");
      }
      if (projectSnap.data().ownerId !== user.uid) {
        throw new Error("Você não tem permissão para editar esse projeto.");
      }
      await updateDoc(projectRef, {
        title,
        description,
        educationLevel,
        category,
        phasesReplies,
        updatedAt: serverTimestamp(),
      });
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
      const projectRef = collection(db, "projects");
      const querySnapshot = await getDocs(projectRef);
      const projects = [];
      querySnapshot.forEach((doc) => {
        projects.push({ id: doc.id, ...doc.data() });
      });
      return projects;
    } catch (error) {
      throw error;
    }
  },
  async getUserProjects() {
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

  async createEvent(title, description, categories, educationLevels, phases) {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("Usuário não autenticado.");

      const categoriesToSave = categories
        .map((cat) => cat.value.trim())
        .filter((val) => val !== "");
      const educationLevelsToSave = educationLevels
        .map((level) => level.value.trim())
        .filter((val) => val !== "");
      const phasesToSave = phases.map((phase) => ({
        criteria: phase.criteria
          .map((c) => (c && c.value ? c.value.trim() : null))
          .filter((val) => val !== null && val !== ""),
        textAreas: phase.textAreas
          .map((t) => (t && t.value ? t.value.trim() : null))
          .filter((val) => val !== null && val !== ""),
        setSubmission: phase.setSubmission,
        numberApproved: phase.numberApproved,
      }));

      const newEvent = {
        title,
        description,
        categories: categoriesToSave,
        educationLevels: educationLevelsToSave,
        phases: phasesToSave,
        creatorId: user.uid,
        createdAt: new Date(),
      };

      await addDoc(collection(db, "events"), newEvent);
    } catch (error) {
      throw error;
    }
  },
  async updateEvent(
    id,
    title,
    description,
    categories,
    educationLevels,
    phases
  ) {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("Usuário não autenticado.");
      const eventRef = doc(db, "events", id);
      const eventSnap = await getDoc(eventRef);
      if (!eventSnap.exists()) {
        throw new Error("Evento não encontrado");
      }
      if (eventSnap.data().creatorId !== user.uid) {
        throw new Error("Você não tem permissão para editar esse evento.");
      }
      const categoriesToSave = categories
        .map((cat) => cat.value.trim())
        .filter((val) => val !== "");
      const educationLevelsToSave = educationLevels
        .map((level) => level.value.trim())
        .filter((val) => val !== "");
      const phasesToSave = phases.map((phase) => ({
        criteria: phase.criteria
          .map((c) => (c && c.value ? c.value.trim() : null))
          .filter((val) => val !== null && val !== ""),
        textAreas: phase.textAreas
          .map((t) => (t && t.value ? t.value.trim() : null))
          .filter((val) => val !== null && val !== ""),
        setSubmission: phase.setSubmission,
        numberApproved: phase.numberApproved,
      }));

      await updateDoc(eventRef, {
        title,
        description,
        categories: categoriesToSave,
        educationLevels: educationLevelsToSave,
        phases: phasesToSave,
        updatedAt: new Date(),
      });
    } catch (error) {
      throw error;
    }
  },
  async getEventData(eventId) {
    try {
      const eventDoc = await getDoc(doc(db, "events", eventId));
      if (!eventDoc.exists()) return null;
      return eventDoc.data();
    } catch (error) {
      throw error;
    }
  },
  async getAdmEvents() {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("Usuário não autenticado.");

      const eventRef = collection(db, "events");
      const q = query(eventRef, where("creatorId", "==", user.uid));
      const querySnapshot = await getDocs(q);

      const events = [];
      querySnapshot.forEach((doc) => {
        events.push({ id: doc.id, ...doc.data() });
      });

      return events;
    } catch (error) {
      throw error;
    }
  },
  async getEvents() {
    try {
      const eventRef = collection(db, "events");
      const querySnapshot = await getDocs(eventRef);
      const events = [];
      querySnapshot.forEach((doc) => {
        events.push({ id: doc.id, ...doc.data() });
      });
      return events;
    } catch (error) {
      throw error;
    }
  },
  async createEvaluation(projectId, eventId, evaluation) {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("Usuário não autenticado.");

      const newEvaluation = {
        projectId: projectId,
        eventid: eventId,
        evaluation: evaluation,
        evaluatorId: user.uid,
        createdAt: new Date(),
      };
      const evaluationRef = collection(db, "evaluations");
      await addDoc(evaluationRef, newEvaluation);
    } catch (error) {
      throw error;
    }
  },
  async getEvaluationData(projectId) {
    try {
      const evaluationRef = collection(db, "evaluations");
      const q = query(evaluationRef, where("projectId", "==", projectId));
      const querySnapshot = await getDocs(q);

      const evaluations = [];
      querySnapshot.forEach((doc) => {
        evaluations.push({ id: doc.id, ...doc.data() });
      });
      return evaluations;
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
