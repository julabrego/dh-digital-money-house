import TransactionLogs from "@/components/activityLog/TransactionLogs";
import Button from "@/components/common/Button";
import Card from "@/components/common/Card";
import CardHeader from "@/components/common/CardHeader";
import SearchInput from "@/components/SearchInput";
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
        <section className="flex flex-row gap-4">
          <SearchInput />
          <div>
            <Button mode="primary" className="w-[150px]">
              Filtrar
            </Button>
          </div>
        </section>

        <section className="activity_log flex flex-col gap-[16px]">
          <Card>
            <CardHeader>Tu actividad</CardHeader>

            <TransactionLogs
              transactions={transactions || []}
              limit={LIMIT}
              paginate
            />
          </Card>
        </section>
      </main>
    </HeadersContextProvider>
  );
};

export default ActivityPage;
