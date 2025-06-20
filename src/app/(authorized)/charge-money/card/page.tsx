import ChargeMoneyCardView from "@/components/carge-money/cardSelector/ChargeMoneyCardView";
import authAPI from "@/services/auth/auth.api";
import cardsApi from "@/services/cards/cards.api";
import { headers } from "next/headers";

const ChargeMoneyCardPage = async () => {
  const token = (await headers()).get("x-access-token") ?? null;
  const accountId = (await headers()).get("x-account-id") ?? null;

  const cards =
    accountId && token ? await cardsApi.getCards({ accountId, token }) : null;

  const accountData = token ? {
    ...(await authAPI.getAccountInfo(token)),
    token
  } : null;

  if (!cards) return <></>;

  return (
    <main className="main-panel h-full flex flex-col gap-[16px] bg-[#eeeaea] p-[16px]">
      <ChargeMoneyCardView accountData={accountData} cards={cards} />
    </main>
  );
};

export default ChargeMoneyCardPage;
