import { AuthRequestParams } from "@/types/auth.types";
import { Card, CreateCardParams } from "@/types/card.types";
import httpExternalAPI from "../common/http.external.service";

class CardsAPI {
  getCards = async ({ accountId, token }: AuthRequestParams): Promise<Card[]> =>
    httpExternalAPI.httpGet(
      `/api/accounts/${accountId}/cards`,
      undefined,
      token
    );

  getCard = async (id: string, authData: AuthRequestParams): Promise<Card> =>
    httpExternalAPI.httpGet(
      `/api/accounts/${authData.accountId}/cards/${id}`,
      undefined,
      authData.token
    );

  createCard = async (card: CreateCardParams, authData: AuthRequestParams): Promise<Card> =>
    httpExternalAPI.httpPost(`/api/accounts/${authData.accountId}/cards`, card, authData.token);

  deleteCard = async (id: string, authData: AuthRequestParams): Promise<void> =>
    httpExternalAPI.httpDelete(`/api/accounts/${authData.accountId}/cards/${id}`, authData.token);
}

const cardsApi = new CardsAPI();

export default cardsApi;
