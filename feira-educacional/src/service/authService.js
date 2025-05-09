import { createUserWithEmailAndPassword, signInWithEmailAndPassword, setPersistence, browserLocalPersistence, signOut, sendPasswordResetEmail} from "firebase/auth";
import { auth } from "../config/firebase";

export const AuthService = {
  async register(email, password, selectedRole) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      throw error;
    }
  },

  async login(email, password, rememberMe = false) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      throw error;
    }
  },
  
  async retrievePassword(email){
    try{
      await sendPasswordResetEmail(auth, email);
    }
    catch(error) {
      throw error;  
    }
  }
};
