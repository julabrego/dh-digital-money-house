import { User } from "@/types/user.types";
import httpInternalAPI from "../common/http.internal.service";

class UserAPI {
  private token: string | undefined;
  constructor() {
    this.token = localStorage.getItem("token") || undefined;
  }

  getUsers = async (): Promise<User[]> =>
    httpInternalAPI.httpGet(`/users`, undefined, this.token);

  getUser = async (id: string): Promise<User> =>
    httpInternalAPI.httpGet(`/users/${id}`, undefined, this.token);
}

const userAPI = new UserAPI();

export default userAPI;
