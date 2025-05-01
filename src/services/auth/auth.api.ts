import {
  LoginResponseType,
  RegisterUserResponseType,
} from "@/types/auth.types";
import httpInternalAPI from "../common/http.internal.service";
import { User } from "@/types/user.types";

class AuthAPI {
  login = async (email: string, password: string): Promise<LoginResponseType> =>
    httpInternalAPI.httpPostPublic(`/login`, { email, password });

  register = async ({
    dni,
    email,
    firstname,
    lastname,
    password,
    phone,
  }: User): Promise<RegisterUserResponseType> =>
    httpInternalAPI.httpPostPublic(`/users`, {
      dni,
      email,
      firstname,
      lastname,
      password,
      phone,
    });

  logout = async (): Promise<LoginResponseType> =>
    httpInternalAPI.httpPostPublic(`/logout`, {});
}

const authAPI = new AuthAPI();

export default authAPI;
