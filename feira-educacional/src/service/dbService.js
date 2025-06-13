import { db, auth } from "./../config/firebase";
import {
  collection,
  addDoc,
  doc,
  getDoc,
  setDoc,
  getDocs,
  query,
  where,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";

export const dbService = {
  async getAssessment(projectId) {
    try {
      const assessmentRef = collection(db, "assessments", projectId);
      const assessment = await getDoc(assessmentRef);
      return assessment.data();
    } catch (error) {
      throw error;
    }
  },
  async createAssessment(projectId, eventId) {
    try {
      const assessmentRef = doc(db, "assessments", projectId);
      const assessment = {
        projectId,
        eventId,
        phases: [],
      };
      await setDoc(assessmentRef, assessment);
    } catch (error) {
      throw error;
    }
  },
  async updateEvaluatorsForPhase(projectId, phaseIndex, newEvaluators) {
    try {
      const assessmentRef = doc(db, "assessments", projectId);
      const snapshot = await getDoc(assessmentRef);

      if (!snapshot.exists()) {
        throw new Error("Assessment não encontrado");
      }

      const assessmentData = snapshot.data();
      const phases = assessmentData.phases || [];

      while (phases.length <= phaseIndex) {
        phases.push({ evaluators: [], grades: {}, average: null });
      }

      phases[phaseIndex].evaluators = newEvaluators;

      await updateDoc(assessmentRef, { phases });
    } catch (error) {
      console.error("Erro ao atualizar avaliadores da fase:", error);
      throw error;
    }
  },
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

      const project = await addDoc(collection(db, "projects"), newProject);
      const projectId = project.id;
      await this.createAssessment(projectId, eventId);
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
      if (projectSnap.data().creatorId !== user.uid) {
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
  async getProjectsByIds(projectIds) {
    try {
      const projects = await Promise.all(
        projectIds.map(async (id) => {
          const docSnap = await getDoc(doc(db, "projects", id));
          if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() };
          }
          return null;
        })
      );

      return projects.filter((p) => p !== null);
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
  async getEventProjects(eventId) {
    try {
      const projectRef = collection(db, "projects");
      const q = query(projectRef, where("eventId", "==", eventId));
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
  async validateEvaluatorEmails(evaluatorEmails) {
    const cleanedEmails = evaluatorEmails
      .map((email) => email.trim())
      .filter((email) => email !== "");

    if (cleanedEmails.length === 0) return [];

    const usersRef = collection(db, "users");
    const q = query(usersRef, where("email", "in", cleanedEmails));
    const querySnapshot = await getDocs(q);

    const validEvaluators = querySnapshot.docs.filter((doc) => {
      const data = doc.data();
      return data.role === "AVALIADOR";
    });

    const validEmails = validEvaluators.map((doc) => doc.data().email);
    const invalidEmails = cleanedEmails.filter(
      (email) => !validEmails.includes(email)
    );

    if (invalidEmails.length > 0) {
      throw new Error(
        `Os seguintes emails não possuem a role de AVALIADOR ou não existem: ${invalidEmails.join(
          ", "
        )}`
      );
    }

    return validEvaluators.map((doc) => doc.id);
  },
  async createEvent(
    title,
    description,
    enrollmentRange,
    categories,
    educationLevels,
    phases,
    fileMetadata,
    imgMetadata,
    evaluators
  ) {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("Usuário não autenticado.");

      const evaluatorEmails = evaluators
        .map((ev) => ev.value.trim())
        .filter((email) => email !== "");
      const evaluatorIds = await this.validateEvaluatorEmails(evaluatorEmails);

      const categoriesToSave = categories
        .map((cat) => cat.value.trim())
        .filter((val) => val !== "");
      const educationLevelsToSave = educationLevels
        .map((level) => level.value.trim())
        .filter((val) => val !== "");

      const newEvent = {
        title,
        description,
        categories: categoriesToSave,
        enrollmentRange,
        educationLevels: educationLevelsToSave,
        phases: phases,
        creatorId: user.uid,
        createdAt: new Date(),
        fileMetadata,
        imgMetadata,
        evaluators: evaluatorIds,
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
    enrollmentRange,
    categories,
    educationLevels,
    phases,
    fileMetadata,
    imgMetadata,
    evaluators
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

      const evaluatorEmails = evaluators
        .map((ev) => ev.value.trim())
        .filter((email) => email !== "");
      const evaluatorIds = await this.validateEvaluatorEmails(evaluatorEmails);

      const categoriesToSave = categories
        .map((cat) => cat.value.trim())
        .filter((val) => val !== "");
      const educationLevelsToSave = educationLevels
        .map((level) => level.value.trim())
        .filter((val) => val !== "");

      await updateDoc(eventRef, {
        title,
        description,
        categories: categoriesToSave,
        enrollmentRange,
        educationLevels: educationLevelsToSave,
        phases,
        updatedAt: new Date(),
        fileMetadata,
        imgMetadata,
        evaluators: evaluatorIds,
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
  async getEvaluatorEvents() {
    try {
      const user = auth.currentUser;

      if (!user) throw new Error("Usuário não autenticado.");

      const eventRef = collection(db, "events");
      const q = query(
        eventRef,
        where("evaluators", "array-contains", user.uid)
      );
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
  async getEvaluatorProjects() {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("Usuário não autenticado.");

      const assessmentsRef = collection(db, "assessments");
      const snapshot = await getDocs(assessmentsRef);

      const projects = [];

      snapshot.forEach((docSnap) => {
        const data = docSnap.data();
        const phases = data.phases || [];

        const isEvaluator = phases.some((phase) =>
          phase.evaluators?.includes(user.uid)
        );

        if (isEvaluator) {
          projects.push({
            assessmentId: docSnap.id,
            projectId: data.projectId,
            eventId: data.eventId,
          });
        }
      });

      return projects;
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
  async getUserDataById(userId) {
    try {
      const userDoc = await getDoc(doc(db, "users", userId));
      if (!userDoc.exists()) return null;
      return userDoc.data();
    } catch (error) {
      throw error;
    }
  },
};
