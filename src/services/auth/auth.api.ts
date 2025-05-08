import { Account } from "@/types/accout.types";
import {
  LoginResponseType,
  RegisterUserResponseType,
} from "@/types/auth.types";
import { User } from "@/types/user.types";
import httpInternalAPI from "../common/http.internal.service";

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

  getAccountInfo = async (token: string): Promise<Account> =>
    httpInternalAPI.httpGet(`/account`, undefined, token);
}

const authAPI = new AuthAPI();

export default authAPI;
