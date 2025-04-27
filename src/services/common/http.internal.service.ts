import HttpBaseAPI from "./http.service";

export const API_URL = "https://digitalmoney.digitalhouse.com";
export const API_PUBLIC_ENDPOINT = `/api`;

class HttpInternalAPI extends HttpBaseAPI {
  constructor() {
    super(API_URL, API_PUBLIC_ENDPOINT);
  }
}

const httpInternalAPI = new HttpInternalAPI();
export default httpInternalAPI;
