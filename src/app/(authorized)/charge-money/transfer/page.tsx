import Card from "@/components/common/Card";
import DataRow from "@/components/profile/AccountData/DataRow";
import authAPI from "@/services/auth/auth.api";
import { headers } from "next/headers";

const ChargeMoneyPage = async () => {
  const token = (await headers()).get("x-access-token") ?? null;
  const accountId = (await headers()).get("x-account-id") ?? null;

  const accountData =
    accountId && token ? await authAPI.getAccountInfo(token) : null;

  if (!accountData) return <></>;

  return (
    <main className="main-panel h-full flex flex-col gap-[16px] bg-[#eeeaea] p-[16px]">
      <Card mode="dark">
        <article className="w-full flex flex-row gap-[16px] mb-[14px]">
          <p className="text-[16px] mb-[8px]">
            Copia tu cvu o alias para ingresar o transferir dinero desde otra
            cuenta
          </p>
        </article>
        <DataRow
          label={"CVU"}
          fieldName={"cvu"}
          value={String(accountData.cvu)}
          readOnly
        />
        <DataRow
          label={"Alias"}
          fieldName={"alias"}
          value={String(accountData.alias)}
          readOnly
        />
      </Card>
    </main>
  );
};

export default ChargeMoneyPage;
