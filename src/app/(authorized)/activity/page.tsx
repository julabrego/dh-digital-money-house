import ActivityView from "@/components/activity/activityView";
import { HeadersContextProvider } from "@/contexts/headers.context";
import transactionApi from "@/services/transaction/transaction.api";
import { headers } from "next/headers";

const LIMIT = 10;

const ActivityPage = async () => {
  const token = (await headers()).get("x-access-token") ?? null;
  const userId = (await headers()).get("x-user-id") ?? null;
  const accountId = (await headers()).get("x-account-id") ?? null;

  const transactions =
    accountId && token
      ? await transactionApi.getTransactions({ accountId, token })
      : null;

  return (
    <HeadersContextProvider userId={userId} token={token} accountId={accountId}>
      <main className="main-panel h-full flex flex-col gap-[16px] bg-[#eeeaea] p-[16px]">
        <ActivityView transactions={transactions || []} limit={LIMIT} />
      </main>
    </HeadersContextProvider>
  );
};

export default ActivityPage;
