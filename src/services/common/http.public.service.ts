import HttpBaseAPI from "./http.service";

export const API_URL = "https://digitalmoney.digitalhouse.com";
export const API_PUBLIC_ENDPOINT = ``;

class HttpPublicAPI extends HttpBaseAPI {
  constructor() {
    super(API_URL, API_PUBLIC_ENDPOINT);
  }
}

const httpPublicAPI = new HttpPublicAPI();

export default httpPublicAPI;
