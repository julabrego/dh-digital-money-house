import {
  LoginResponseType,
  RegisterUserParamsType,
  RegisterUserResponseType,
} from "@/types/auth.types";
import authAPI from "./auth.api";

class AuthService {
  async login(email: string, password: string): Promise<LoginResponseType> {
    const token = await authAPI.login(email, password);
    if (token) {
      localStorage.setItem("token", token.token);
    }
    return token;
  }

  async register({
    dni,
    email,
    firstname,
    lastname,
    password,
    phone,
  }: RegisterUserParamsType): Promise<RegisterUserResponseType> {
    return await authAPI.register({
      dni,
      email,
      firstname,
      lastname,
      password,
      phone,
    });
  }

  async logout(): Promise<void> {
    await authAPI.logout();
  }
}

const authService = new AuthService();

export default authService;
