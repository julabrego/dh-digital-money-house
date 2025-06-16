import { spanishTextDate } from "@/app/utils/date";
import { formatArgentinePesos } from "@/app/utils/number-utils";
import Button from "@/components/common/Button";
import Card from "@/components/common/Card";
import Typography from "@/components/common/Typography";
import PATHS from "@/config/routing/paths";
import { HeadersContextProvider } from "@/contexts/headers.context";
import transactionApi from "@/services/transaction/transaction.api";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";

const ActivityDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const token = (await headers()).get("x-access-token") ?? null;
  const userId = (await headers()).get("x-user-id") ?? null;
  const accountId = (await headers()).get("x-account-id") ?? null;

  try {
    const transaction =
      accountId && token
        ? await transactionApi.getTransaction(id, { accountId, token })
        : null;

    if (!transaction) {
      return <></>;
    }

    return (
      <HeadersContextProvider
        userId={userId}
        token={token}
        accountId={accountId}
      >
        <main className="main-panel w-full h-full flex flex-col gap-[16px] bg-[#eeeaea] p-[16px]">
          <section className="activity-details">
            <Card mode="dark" className="flex flex-col gap-[16px]">
              <article className="w-full items-center flex flex-row justify-between gap-[16px] mb-[16px] border-b-1 border-b-white pb-[16px]">
                <div className="flex flex-row gap-[16px]">
                  <Image
                    src="/images/check.png"
                    alt="Aprobada"
                    width={33}
                    height={33}
                  />
                  <Typography type={"heading3"} className="text-primary">
                    Aprobada
                  </Typography>
                </div>

                <Typography type={"text2"}>
                  {spanishTextDate(new Date(transaction.dated))}
                </Typography>
              </article>

              <article className="w-full flex flex-col">
                <Typography type={"heading5"}>
                  {transaction.description}
                </Typography>
                <Typography type={"heading3"} className="text-primary">
                  {formatArgentinePesos(transaction.amount)}
                </Typography>
              </article>

              {transaction.origin && transaction.destination && (
                <article className="w-full flex flex-col">
                  <Typography type={"text2"}>
                    {transaction.amount < 0
                      ? "Le transferiste a"
                      : "Recibiste de"}
                  </Typography>
                  <Typography type={"heading3"} className="text-primary">
                    {transaction.amount < 0
                      ? transaction.destination
                      : transaction.origin}
                  </Typography>
                </article>
              )}

              <article className="w-full flex flex-col">
                <Typography type={"text2"}>Número de operación</Typography>
                <Typography type={"heading3"} className="text-primary">
                  {transaction.id}
                </Typography>
              </article>
            </Card>
          </section>

          <section className="flex flex-row gap-[16px] justify-end">
            <Link href={PATHS.ACTIVITY} className="w-[200px]">
              <Button mode="tertiary">Ir a inicio</Button>
            </Link>
            <Link href={"#"} className="w-[300px]">
              <Button className="w-[200px]">Decargar comprobante</Button>
            </Link>
          </section>
        </main>
      </HeadersContextProvider>
    );
  } catch (error) {
    console.error(error);
    return (
      <Typography type={"text2"}>No se encontró la transacción...</Typography>
    );
  }
};

export default ActivityDetailsPage;
