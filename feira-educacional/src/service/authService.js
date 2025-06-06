import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
  signOut,
  browserSessionPersistence,
  sendPasswordResetEmail,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../config/firebase";

export const AuthService = {
  async register(email, password, selectedRole, name) {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      await setDoc(doc(db, "users", user.uid), {
        email: email,
        role: selectedRole,
        name: name,
      });
      return user;
    } catch (error) {
      console.log(error)
      throw error;
    }
  },
  async getCurrentUser(){
    try {
      const user = await auth.currentUser;
      return user;
      } catch (error) {
        console.log(error)
        throw error;
      }
  },
  async login(email, password, rememberMe = false) {
    try {
      await setPersistence(
        auth,
        rememberMe ? browserLocalPersistence : browserSessionPersistence
      );
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      return userCredential.user;
    } catch (error) {
      throw error;
    }
  },
    async logout() {
    try {
      await signOut(auth); 
    } catch (error) {
      console.error("Erro ao deslogar:", error);
      throw error; 
    }
  },
  async retrievePassword(email) {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      throw error;
    }
  },
};
