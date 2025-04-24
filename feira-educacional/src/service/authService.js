import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";

const getAuthErrorMessage = (errorCode) => {
  switch (errorCode) {
    case "auth/email-already-in-use":
      return "Este e-mail já está em uso!";
    case "auth/invalid-email":
      return "E-mail inválido!";
    case "auth/weak-password":
      return "A senha precisa ter pelo menos 6 caracteres.";
    case "auth/user-not-found":
    case "auth/wrong-password":
      return "E-mail ou senha incorretos.";
    default:
      return "Erro desconhecido. Tente novamente.";
  }
};

export const AuthService = {
  async register(email, password, confirmPassword) {
    if (password !== confirmPassword) {
      throw new Error("As senhas não conferem.");
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      const message = getAuthErrorMessage(error.code);
      throw new Error(message);
    }
  },

  async login(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      const message = getAuthErrorMessage(error.code);
      throw new Error(message);
    }
  },
};
