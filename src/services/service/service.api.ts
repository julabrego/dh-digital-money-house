import { Service } from "@/types/service.types";
import httpPublicAPI from "../common/http.public.service";

class ServiceAPI {
  getServices = async (): Promise<Service[]> =>
    httpPublicAPI.httpGetPublic(`/service`);
}

const serviceApi = new ServiceAPI();

export default serviceApi;
