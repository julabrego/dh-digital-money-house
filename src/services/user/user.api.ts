import { User } from "@/types/user.types";
import httpExternalAPI from "../common/http.external.service";

 class UserAPI {
  getUsers = async (token: string): Promise<User[]> =>
    httpExternalAPI.httpGet(`/api/users`, undefined, token);

  getUser = async (id: string, token: string): Promise<User> =>
    httpExternalAPI.httpGet(`/api/users/${id}`, undefined, token);
}

const userApi = new UserAPI();

export default userApi;