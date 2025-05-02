import { User } from "@/types/user.types";
import httpInternalAPI from "../common/http.internal.service";

export default class UserAPI {
  private _userToken: string | undefined;

  constructor(userToken?: string) {
    this._userToken = userToken;
  }

  getUsers = async (): Promise<User[]> =>
    httpInternalAPI.httpGet(`/users`, undefined, this._userToken);

  getUser = async (id: string): Promise<User> =>
    httpInternalAPI.httpGet(`/users/${id}`, undefined, this._userToken);
}
