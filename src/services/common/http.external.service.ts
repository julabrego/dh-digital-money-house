import HttpBaseAPI from "./http.service";

export const API_URL = "https://digitalmoney.digitalhouse.com";
export const API_PUBLIC_ENDPOINT = `/api`;

class HttpExternalAPI extends HttpBaseAPI {
  constructor() {
    super(API_URL, API_PUBLIC_ENDPOINT);
  }
}

const httpExternalAPI = new HttpExternalAPI();

export default httpExternalAPI;
