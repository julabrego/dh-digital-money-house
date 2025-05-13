import TransactionLogs from "@/components/activityLog/TransactionLogs";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import Button from "@/components/common/Button";
import CallToActionRow from "@/components/common/CallToActionRow";
import Card from "@/components/common/Card";
import CardFooter from "@/components/common/CardFooter";
import CardHeader from "@/components/common/CardHeader";
import SearchInput from "@/components/SearchInput";
import PATHS from "@/config/routing/paths";
import transactionApi from "@/services/transaction/transaction.api";
import { headers } from "next/headers";

const HomePage = async () => {
  const token = (await headers()).get("x-access-token") ?? null;
  const accountId = (await headers()).get("x-account-id") ?? null;

  console.log({token, accountId})
  const transactions =
    accountId && token
      ? await transactionApi.getTransactions({ accountId, token })
      : null;

  return (
    <main className="main-panel w-full h-full flex flex-col gap-[16px] bg-[#eeeaea] p-[16px]">
      <Breadcrumbs title="Inicio" />

      <section className="summary">
        <Card mode="dark">
          <div className="w-full flex flex-row gap-[16px] justify-end mb-[14px]">
            <p className="text-[12px] hover:underline cursor-pointer">
              Ver tarjetas
            </p>
            <p className="text-[12px] hover:underline cursor-pointer">
              Ver CVU
            </p>
          </div>
          <p className="text-[16px] mb-[8px]">Dinero disponible</p>
          <div className="px-[16px] py-[8px] border border-primary rounded-[100px] w-fit min-w-[100px] text-center">
            <p className="text-[24px] font-semibold">$6.890.534,17</p>
          </div>
        </Card>
      </section>

      <section className="call-to-actions">
        <CallToActionRow>
          <Button mode="primary" size="large">
            Ingresar dinero
          </Button>
          <Button mode="primary" size="large">
            Pago de servicios
          </Button>
        </CallToActionRow>
      </section>

      <section className="activity_log flex flex-col gap-[16px]">
        <SearchInput />

        <Card>
          <CardHeader>Tu actividad</CardHeader>

          <TransactionLogs transactions={transactions || []} limit={10} />

          <CardFooter footerClickPath={PATHS.TRANSACTION_LOG}>
            Ver toda tu actividad
          </CardFooter>
        </Card>
      </section>
    </main>
  );
};

export default HomePage;
