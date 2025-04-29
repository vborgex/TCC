import { AuthService } from "../service/authService";

export const AuthController = {
  async registerUser(email, password, confirmPassword) {
    try {
      const user = await AuthService.register(email, password, confirmPassword);
      return user;
    } catch (error) {
      throw error;
    }
  },

  async loginUser(email, password) {
    try {
      const user = await AuthService.login(email, password);
      return user;
    } catch (error) {
      throw error;
    }
  },
};
