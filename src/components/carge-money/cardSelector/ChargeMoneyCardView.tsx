"use client";
import CardSelector from "@/components/carge-money/cardSelector";
import Button from "@/components/common/Button";
import Card from "@/components/common/Card";
import Typography from "@/components/common/Typography";
import PATHS from "@/config/routing/paths";
import {
    ChargeMoneyContextProvider,
    useChargeMoneyContext,
} from "@/contexts/chargeMoney.context";
import { Card as CardType } from "@/types/card.types";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
type ChargeMoneyCardViewProps = {
  cards: CardType[];
};

const ChargeMoneyCardView = ({ cards }: ChargeMoneyCardViewProps) => {
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState(0);

  const handleSelectCard = (id: number) => setSelectedCard(id);

  const goToNextStep = () => setStep(step + 1);

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
      amount={amount}
      setAmount={setAmount}
      cards={cards}
      step={step}
      goToNextStep={goToNextStep}
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
  return (
    <Card mode="dark">
      <article className="w-full flex flex-row gap-[16px] mb-[14px]">
        <Typography type={"heading4"}>Confirmar</Typography>
      </article>
    </Card>
  );
};

const ChargeWithCardStep4 = () => {
  return (
    <Card mode="dark">
      <article className="w-full flex flex-row gap-[16px] mb-[14px]">
        <Typography type={"heading4"}>Todo bien</Typography>
      </article>
    </Card>
  );
};

export default ChargeMoneyCardView;
