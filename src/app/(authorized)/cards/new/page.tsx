import { CardDrawing } from "@/components/cardsPage/CardDrawing";
import { CardForm } from "@/components/cardsPage/cardForm";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import Card from "@/components/common/Card";
import { HeadersContextProvider } from "@/contexts/headers.context";
import { headers } from "next/headers";

const NewCardPage = async () => {
  const token = (await headers()).get("x-access-token") ?? null;
  const userId = (await headers()).get("x-user-id") ?? null;
  const accountId = (await headers()).get("x-account-id") ?? null;

  return (
    <HeadersContextProvider userId={userId} token={token} accountId={accountId}>
      <main className="main-panel w-full h-full flex flex-col gap-[16px] bg-[#eeeaea] p-[16px]">
        <Breadcrumbs title="Tarjetas" />

        <Card mode="white" className="card-form flex flex-col items-center pt-[22px] pb-[22px]">
          <CardDrawing />

          <section className="w-full flex flex-col items-center">
            <CardForm />
          </section>
        </Card>
      </main>
    </HeadersContextProvider>
  );
};

export default NewCardPage;
