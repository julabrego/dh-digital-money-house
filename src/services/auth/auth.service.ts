import {
  RegisterUserParamsType,
  RegisterUserResponseType,
} from "@/types/auth.types";
import authAPI from "./auth.api";

class AuthService {
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
