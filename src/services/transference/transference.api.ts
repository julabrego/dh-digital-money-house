import { AuthRequestParams } from "@/types/auth.types";
import { Transaction } from "@/types/transaction.types";
import httpExternalAPI from "../common/http.external.service";
import { TransferenceParams } from "@/types/transference.types";

class TransferenceAPI {
  getTransferences = async ({
    accountId,
    token,
  }: AuthRequestParams): Promise<Transaction[]> =>
    httpExternalAPI.httpGet(
      `/api/accounts/${accountId}/transferences`,
      undefined,
      token
    );

  deposit = async (
    transference: TransferenceParams,
    authData: AuthRequestParams
  ): Promise<Transaction> =>
    httpExternalAPI.httpPost(
      `/api/accounts/${authData.accountId}/deposits`,
      transference,
      authData.token
    );
}

const transferenceApi = new TransferenceAPI();

export default transferenceApi;
