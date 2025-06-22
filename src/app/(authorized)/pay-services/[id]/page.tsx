import PaySelectedServiceView from "@/components/service/paySelectedServiceView";
import cardsApi from "@/services/cards/cards.api";
import serviceApi from "@/services/service/service.api";
import { headers } from "next/headers";

const ChargeMoneyPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const token = (await headers()).get("x-access-token") ?? null;
  const accountId = (await headers()).get("x-account-id") ?? null;

  const selectedServiceData = await serviceApi.getService(id);
  const cards =
    accountId && token ? await cardsApi.getCards({ accountId, token }) : [];

  return (
    <main className="h-full gap-[16px] bg-[#eeeaea] p-[16px]">
      <PaySelectedServiceView service={selectedServiceData} cards={cards} />
    </main>
  );
};

export default ChargeMoneyPage;
