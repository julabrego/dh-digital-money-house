import CardsList from "@/components/cards/CardsList";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import Card from "@/components/common/Card";
import CardHeader from "@/components/common/CardHeader";
import Typography from "@/components/common/Typography";
import { HeadersContextProvider } from "@/contexts/headers.context";
import cardsApi from "@/services/cards/cards.api";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";

const CardsPage = async () => {
  const token = (await headers()).get("x-access-token") ?? null;
  const userId = (await headers()).get("x-user-id") ?? null;
  const accountId = (await headers()).get("x-account-id") ?? null;

  const cards =
    !!accountId && !!token ? await cardsApi.getCards({ accountId, token }) : [];

  return (
    <HeadersContextProvider userId={userId} token={token} accountId={accountId}>
      <main className="main-panel w-full h-full flex flex-col gap-[16px] bg-[#eeeaea] p-[16px]">
        <Breadcrumbs title="Tarjetas" />

        <section className="agregar-container">
          <Card mode="dark" className="p-[32px]">
            <article className="w-full flex flex-row gap-[16px] mb-[32px]">
              <Typography type={"heading6"}>
                Agregá tu tarjeta de débito o crédito
              </Typography>
            </article>

            {cards.length < 10 ? (
              <Link href="/cards/new">
                <article className="grid grid-cols-[1fr_min-content]">
                  <div className="w-full flex flex-row gap-[16px] items-center">
                    <Image
                      src="images/plus-circle-green.svg"
                      alt="Nueva tarjeta"
                      width={33}
                      height={33}
                      className="w-[33px] h-[33px]"
                    />
                    <Typography type={"heading3"} className="text-primary">
                      Agregar tarjeta
                    </Typography>
                  </div>
                  <div className="flex flex-row w-[18px] h-full items-center">
                    <Image
                      src="images/right-arrow-green.svg"
                      alt="Nueva tarjeta"
                      width={18}
                      height={18}
                      className="w-[18px] h-[18px]"
                    />
                  </div>
                </article>
              </Link>
            ) : (
              <article className="grid grid-cols-[1fr_min-content]">
                <div className="w-full flex flex-row gap-[16px] items-center">
                  <Typography type={"heading3"} className="text-primary">
                    Has alcanzado el límite de tarjetas
                  </Typography>
                </div>
              </article>
            )}
          </Card>
        </section>

        <section className="activity_log flex flex-col gap-[16px]">
          <Card>
            <CardHeader>Tus tarjetas</CardHeader>

            <CardsList cards={cards} />
          </Card>
        </section>
      </main>
    </HeadersContextProvider>
  );
};

export default CardsPage;
