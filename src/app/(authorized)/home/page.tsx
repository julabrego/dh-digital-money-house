import { formatArgentinePesos } from "@/app/utils/number-utils";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import Button from "@/components/common/Button";
import CallToActionRow from "@/components/common/CallToActionRow";
import Card from "@/components/common/Card";
import HomeActivityLog from "@/components/home/activityLog";
import PATHS from "@/config/routing/paths";
import authAPI from "@/services/auth/auth.api";
import transactionApi from "@/services/transaction/transaction.api";
import { headers } from "next/headers";
import Link from "next/link";

const HomePage = async () => {
  const token = (await headers()).get("x-access-token") ?? null;
  const accountId = (await headers()).get("x-account-id") ?? null;

  const accountData =
    accountId && token ? await authAPI.getAccountInfo(token) : null;

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
            <Link href={PATHS.CARDS}>
              <p className="text-[12px] hover:underline cursor-pointer">
                Ver tarjetas
              </p>
            </Link>
            <Link href={PATHS.PROFILE}>
              <p className="text-[12px] hover:underline cursor-pointer">
                Ver CVU
              </p>
            </Link>
          </div>
          <p className="text-[16px] mb-[8px]">Dinero disponible</p>
          <div className="px-[16px] py-[8px] border border-primary rounded-[100px] w-fit min-w-[100px] text-center">
            <p className="text-[24px] font-semibold">
              {accountData &&
                `${formatArgentinePesos(accountData.available_amount)}`}
            </p>
          </div>
        </Card>
      </section>

      <section className="call-to-actions">
        <CallToActionRow>
          <Link href={PATHS.CHARGE_MONEY} className="w-full">
            <Button mode="primary" size="large">
              Ingresar dinero
            </Button>
          </Link>
          <Link href={PATHS.PAY_SERVICES} className="w-full">
            <Button mode="primary" size="large">
              Pago de servicios
            </Button>
          </Link>
        </CallToActionRow>
      </section>

      <HomeActivityLog transactions={transactions || []} />
    </main>
  );
};

export default HomePage;
