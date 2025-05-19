import { CardDrawing } from "@/components/cardsPage/CardDrawing";
import { CardForm } from "@/components/cardsPage/cardForm";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import Card from "@/components/common/Card";
import { HeadersContextProvider } from "@/contexts/headers.context";
import { NewCardContextProvider } from "@/contexts/newCard.context";
import { headers } from "next/headers";

const NewCardPage = async () => {
  const token = (await headers()).get("x-access-token") ?? null;
  const userId = (await headers()).get("x-user-id") ?? null;
  const accountId = (await headers()).get("x-account-id") ?? null;

  return (
    <HeadersContextProvider userId={userId} token={token} accountId={accountId}>
      <NewCardContextProvider>
        <main className="main-panel items-center w-full h-full flex flex-col gap-[16px] bg-[#eeeaea] p-[16px]">
          <div className="w-full">
            <Breadcrumbs title="Tarjetas" />
          </div>

          <Card
            mode="white"
            className="card-form w-full max-w-[973px] flex flex-col items-center pt-[22px] pb-[22px]"
          >
            <CardDrawing />

            <section className="w-full   flex flex-col items-center">
              <CardForm />
            </section>
          </Card>
        </main>
      </NewCardContextProvider>
    </HeadersContextProvider>
  );
};

export default NewCardPage;
