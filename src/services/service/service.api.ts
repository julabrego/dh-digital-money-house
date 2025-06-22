import { Service } from "@/types/service.types";
import httpPublicAPI from "../common/http.public.service";

class ServiceAPI {
  getServices = async (): Promise<Service[]> =>
    httpPublicAPI.httpGetPublic(`/service`);

  getService = async (id: string): Promise<Service> =>
    httpPublicAPI.httpGetPublic(`/service/${id}`);
}

const serviceApi = new ServiceAPI();

export default serviceApi;
