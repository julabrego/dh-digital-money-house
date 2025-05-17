import { AuthRequestParams } from "@/types/auth.types";
import { Card } from "@/types/card.types";
import httpExternalAPI from "../common/http.external.service";

class CardsAPI {
  getCards = async ({
    accountId,
    token,
  }: AuthRequestParams): Promise<Card[]> =>
    httpExternalAPI.httpGet(
      `/api/accounts/${accountId}/cards`,
      undefined,
      token
    );

  getCard = async (
    id: string,
    authData: AuthRequestParams
  ): Promise<Card> =>
    httpExternalAPI.httpGet(
      `/api/accounts/${authData.accountId}/cards/${id}`,
      undefined,
      authData.token
    );
}

const cardsApi = new CardsAPI();

export default cardsApi;
