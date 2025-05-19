import HttpBaseAPI from "./http.service";

export const API_URL = "http://localhost:3000/api";
export const API_PUBLIC_ENDPOINT = ``;

class HttpInternalAPI extends HttpBaseAPI {
  constructor() {
    super(API_URL, API_PUBLIC_ENDPOINT);
  }
}

const httpInternalAPI = new HttpInternalAPI();

export default httpInternalAPI;
