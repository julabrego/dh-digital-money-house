"use client";
import { spanishTextDate } from "@/app/utils/date";
import CardSelector from "@/components/carge-money/cardSelector";
import Button from "@/components/common/Button";
import Card from "@/components/common/Card";
import Typography from "@/components/common/Typography";
import PATHS from "@/config/routing/paths";
import {
  ChargeMoneyContextProvider,
  useChargeMoneyContext,
} from "@/contexts/chargeMoney.context";
import transferenceApi from "@/services/transference/transference.api";
import { Account } from "@/types/accout.types";
import { Card as CardType } from "@/types/card.types";
import { Transaction } from "@/types/transaction.types";
import { TransferenceParams } from "@/types/transference.types";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
type ChargeMoneyCardViewProps = {
  cards: CardType[];
  accountData: (Account & { token: string }) | null;
};

const ChargeMoneyCardView = ({
  cards,
  accountData,
}: ChargeMoneyCardViewProps) => {
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState(0);

  const handleSelectCard = (id: number) => setSelectedCard(id);

  const goToNextStep = () => setStep(step + 1);

  const goToPrevStep = () => setStep(step - 1);

  let stepComponent = null;

  switch (step) {
    case 1:
      stepComponent = (
        <ChargeWithCardStep1 handleSelectCard={handleSelectCard} />
      );
      break;
    case 2:
      stepComponent = <ChargeWithCardStep2 />;
      break;
    case 3:
      stepComponent = <ChargeWithCardStep3 />;
      break;
    case 4:
      stepComponent = <ChargeWithCardStep4 />;
      break;
    default:
      stepComponent = (
        <Card mode="dark">
          <Typography type={"heading4"}>Algo salió mal</Typography>
        </Card>
      );
      break;
  }

  return (
    <ChargeMoneyContextProvider
      accountData={accountData}
      amount={amount}
      setAmount={setAmount}
      cards={cards}
      step={step}
      goToNextStep={goToNextStep}
      goToPrevStep={goToPrevStep}
      selectedCard={selectedCard}
    >
      {stepComponent}
    </ChargeMoneyContextProvider>
  );
};

const ChargeWithCardStep1 = ({
  handleSelectCard,
}: {
  handleSelectCard: (id: number) => void;
}) => {
  const { cards, selectedCard, goToNextStep } = useChargeMoneyContext();

  return (
    <Card mode="dark">
      <article className="w-full flex flex-row gap-[16px] mb-[14px]">
        <Typography type={"heading4"}>Seleccionar tarjeta</Typography>
      </article>

      <Card mode="white">
        <CardSelector
          cards={cards}
          selectedCard={selectedCard}
          onSelectCard={handleSelectCard}
        />
      </Card>

      <div className="w-full flex flex-row justify-between items-center pt-[16px]">
        <Link href={PATHS.CARDS_NEW}>
          <div className="flex w-full flex-row gap-[16px] items-center ">
            <Image
              src="/images/plus-circle-green.svg"
              alt="Nueva tarjeta"
              width={33}
              height={33}
              className="w-[33px] h-[33px]"
            />
            <Typography type={"heading3"} className="text-primary">
              Nueva tarjeta
            </Typography>
          </div>
        </Link>
        <Button mode="primary" onClick={goToNextStep} disabled={!selectedCard}>
          Continuar
        </Button>
      </div>
    </Card>
  );
};

const ChargeWithCardStep2 = () => {
  const { goToNextStep, setAmount, amount } = useChargeMoneyContext();

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(event.target.value));
  };

  return (
    <Card mode="dark">
      <article className="w-full flex flex-row gap-[16px] mb-[14px]">
        <Typography type={"heading4"}>
          ¿Cuánto querés ingresar a la tarjeta?
        </Typography>
      </article>

      <article className="w-full flex flex-row gap-[16px] mb-[14px]">
        <div className="flex items-center w-[360px] rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">
          <div className="shrink-0 text-base text-gray-500 select-none">$</div>
          <input
            className="w-full block min-w-0 grow py-1.5 pr-3 pl-0 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none"
            placeholder="$0"
            name={"amount"}
            value={amount}
            onChange={handleAmountChange}
            type="number"
          />
        </div>
      </article>

      <div className="w-full flex flex-row justify-between items-center pt-[16px]">
        <Link href={PATHS.CARDS_NEW}>
          <div className="flex w-full flex-row gap-[16px] items-center ">
            <Image
              src="/images/plus-circle-green.svg"
              alt="Nueva tarjeta"
              width={33}
              height={33}
              className="w-[33px] h-[33px]"
            />
            <Typography type={"heading3"} className="text-primary">
              Nueva tarjeta
            </Typography>
          </div>
        </Link>
        <Button mode="primary" onClick={goToNextStep} disabled={amount <= 0}>
          Continuar
        </Button>
      </div>
    </Card>
  );
};

const ChargeWithCardStep3 = () => {
  const { goToPrevStep, goToNextStep, amount, accountData } =
    useChargeMoneyContext();

  return (
    <Card mode="dark">
      <article className="w-full flex flex-row gap-[16px] mb-[14px]">
        <Typography type={"heading4"}>Revisá que esté todo bien</Typography>
      </article>

      <article className="w-full flex flex-row gap-[16px] mb-[14px] items-center">
        <Typography type="text2">Vas a transferir</Typography>
        <Image
          src="/images/edit-icon.svg"
          alt="Nueva tarjeta"
          width={33}
          height={33}
          className="w-[33px] h-[33px] cursor-pointer"
          onClick={goToPrevStep}
        />
      </article>

      <article className="w-full flex flex-col gap-[16px] mb-[14px]">
        <Typography type="heading4">${amount}</Typography>
        <Typography type="text2">Para</Typography>
        <Typography type="heading4">Cuenta propia</Typography>
        {accountData && (
          <>
            <Typography type="text2">{accountData?.alias}</Typography>
            <Typography type="text2">{accountData?.cvu}</Typography>
          </>
        )}
      </article>

      <div className="w-full flex flex-row justify-end items-center pt-[16px]">
        <Button mode="primary" onClick={goToNextStep}>
          Continuar
        </Button>
      </div>
    </Card>
  );
};

const ChargeWithCardStep4 = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { accountData, amount } = useChargeMoneyContext();
  const [transferenceData, setTransferenceData] = useState<Transaction | null>(
    null
  );

  useEffect(() => {
    if (!accountData) return;

    const payload: TransferenceParams = {
      amount,
      origin: String(accountData.cvu),
      destination: String(accountData.cvu),
      dated: new Date().toISOString(),
    };

    const sendTransference = async () => {
      try {
        const deposit = await transferenceApi.deposit(payload, {
          accountId: String(accountData.id),
          token: String(accountData.token),
        });

        setTransferenceData(deposit);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Ocurrio un error inesperado");
        }
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    sendTransference();
  }, []);

  return (
    <>
      {isLoading ? (
        <Card mode="dark">
          <article className="w-full flex flex-row gap-[16px] mb-[14px]">
            <Typography type={"heading4"}>Enviando...</Typography>
          </article>
        </Card>
      ) : (
        <>
          {error || !transferenceData ? (
            <Card mode="dark">
              <article className="w-full flex flex-row gap-[16px] mb-[14px]">
                <Typography type={"heading4"}>Error</Typography>
              </article>
              <article className="w-full flex flex-row gap-[16px] mb-[14px]">
                <Typography type={"text2"}>{error}</Typography>
              </article>
              <article className="w-full flex flex-row justify-end gap-[16px] mb-[14px]">
                <Button mode="primary" onClick={() => window.location.reload()}>
                  Reintentar
                </Button>
              </article>
            </Card>
          ) : (
            <>
              <Card mode="green">
                <article className="w-full flex flex-col items-center gap-[16px] mb-[14px]">
                  <Image
                    src="/images/check-black.svg"
                    alt="Nueva tarjeta"
                    width={66}
                    height={66}
                    className="w-[66px] h-[66px]"
                  />
                  <Typography type={"heading4"}>
                    Ya cargamos el dinero en tu cuenta
                  </Typography>
                </article>
              </Card>
              <Card mode="dark">
                <article className="w-full flex flex-col gap-[16px] mb-[14px]">
                  <Typography type="text2">
                    {spanishTextDate(new Date(transferenceData.dated))}
                  </Typography>

                  <Typography type="heading4" className="text-primary">
                    ${transferenceData.amount}
                  </Typography>
                  <Typography type="text2">
                    Para
                  </Typography>

                  {accountData && (
                    <>
                      <Typography type="text2">{accountData?.alias}</Typography>
                      <Typography type="text2">{accountData?.cvu}</Typography>
                    </>
                  )}
                </article>
              </Card>
            </>
          )}
        </>
      )}
    </>
  );
};

export default ChargeMoneyCardView;
