import { AuthRequestParams } from "@/types/auth.types";
import { Transaction } from "@/types/transaction.types";
import httpExternalAPI from "../common/http.external.service";

class TransactionAPI {
  getTransactions = async ({
    accountId,
    token,
  }: AuthRequestParams): Promise<Transaction[]> =>
    httpExternalAPI.httpGet(
      `/api/accounts/${accountId}/activity`,
      undefined,
      token
    );

  getTransaction = async (
    id: string,
    authData: AuthRequestParams
  ): Promise<Transaction> =>
    httpExternalAPI.httpGet(
      `/api/accounts/${authData.accountId}/transactions/${id}`,
      undefined,
      authData.token
    );
}

const transactionApi = new TransactionAPI();

export default transactionApi;
