import Card from "@/components/common/Card";
import Typography from "@/components/common/Typography";
import PATHS from "@/config/routing/paths";
import Image from "next/image";
import Link from "next/link";

const ChargeMoneyPage = async () => {
  return (
    <main className="main-panel h-full flex flex-col gap-[16px] bg-[#eeeaea] p-[16px]">
      <Link href={PATHS.CHARGE_MONEY_TRANSFER}>
        <Card mode="dark" className="flex flex-col gap-[16px]">
          <article className="w-full items-center flex flex-row justify-between gap-[16px] p-[16px]">
            <div className="flex flex-row gap-[16px]">
              <Image
                src="/images/person-green.svg"
                alt="Aprobada"
                width={33}
                height={33}
              />
              <Typography type={"heading4"} className="text-primary">
                Transferencia bancaria
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
        </Card>
      </Link>

      <Link href={PATHS.CHARGE_MONEY_CARD}>
        <Card mode="dark" className="flex flex-col gap-[16px]">
          <article className="w-full items-center flex flex-row justify-between gap-[16px] p-[16px]">
            <div className="flex flex-row gap-[16px]">
              <Image
                src="/images/cards-green.svg"
                alt="Aprobada"
                width={33}
                height={33}
              />
              <Typography type={"heading4"} className="text-primary">
                Seleccionar tarjeta
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
        </Card>
      </Link>
    </main>
  );
};

export default ChargeMoneyPage;
