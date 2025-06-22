"use client";
import { spanishTextDate } from "@/app/utils/date";
import { formatArgentinePesos } from "@/app/utils/number-utils";
import { capitalizeFirstLetter } from "@/app/utils/string-utils";
import { determineCardProvider } from "@/components/cardsPage/CardDrawing";
import CardSelector from "@/components/carge-money/cardSelector";
import Button from "@/components/common/Button";
import Card from "@/components/common/Card";
import TextInput from "@/components/common/TextInput";
import Typography from "@/components/common/Typography";
import PATHS from "@/config/routing/paths";
import {
    PaySelectedServiceContextProvider,
    usePaySelectedServiceContext,
} from "@/contexts/paySelectedService.context";
import useNavigation from "@/hooks/useNavigation";
import { Card as CardType } from "@/types/card.types";
import { Service } from "@/types/service.types";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

type PaySelectedServiceViewProps = {
  service: Service;
  cards: CardType[];
};

const PaySelectedServiceView = ({
  service,
  cards,
}: PaySelectedServiceViewProps) => {
  const [step, setStep] = useState(1);
  const [accountNumber, setAccountNumber] = useState<number | null>(null);
  const [selectedCard, setSelectedCard] = useState<number | null>(null);

  const goToNextStep = () => setStep(step + 1);
  const goToPrevStep = () => setStep(step - 1);

  const handleSelectCard = (id: number) => setSelectedCard(id);

  let stepComponent = null;

  switch (step) {
    case 1:
      stepComponent = <PaySelectedServiceStep1 />;
      break;
    case 2:
      stepComponent = (
        <PaySelectedServiceStep2 handleSelectCard={handleSelectCard} />
      );
      break;
    case 3:
      stepComponent = <PaySelectedServiceStep3 />;
      break;
    default:
      stepComponent = null;
  }

  return (
    <PaySelectedServiceContextProvider
      service={service}
      accountNumber={accountNumber}
      setAccountNumber={setAccountNumber}
      cards={cards}
      selectedCard={selectedCard}
      step={step}
      goToNextStep={goToNextStep}
      goToPrevStep={goToPrevStep}
    >
      {stepComponent}
    </PaySelectedServiceContextProvider>
  );
};

const PaySelectedServiceStep1 = () => {
  const [error, setError] = useState<string | null>(null);
  const { goTo } = useNavigation();
  const methods = useForm<{ accountNumber: string }>({});

  const { service, goToNextStep, setAccountNumber, accountNumber } =
    usePaySelectedServiceContext();

  const { register, handleSubmit, getValues } = methods;

  useEffect(() => {
    if (accountNumber !== null && accountNumber === 123456) {
      goToNextStep();
    }
  }, [accountNumber, goToNextStep]);

  const onSubmit = () => {
    const formAccountNumber = getValues("accountNumber");
    if (formAccountNumber === "" || isNaN(Number(formAccountNumber))) {
      setError("Ingrese un valor numérico");
      return;
    }
    setError(null);
    setAccountNumber(Number(formAccountNumber));
  };

  const handleReset = () => {
    if (!service?.invoice_value) {
      goTo(PATHS.PAY_SERVICES);
    } else {
      setAccountNumber(null);
    }
  };

  if (
    (accountNumber !== null && accountNumber !== 123456) ||
    !service?.invoice_value
  ) {
    return (
      <section className="flex flex-col gap-[16px]">
        <Card mode="dark">
          <article className="w-full flex flex-col items-center gap-[16px] mb-[14px]">
            <Image
              src="/images/red-cross.svg"
              alt="Nueva tarjeta"
              width={66}
              height={66}
              className="w-[66px] h-[66px]"
            />
            <Typography type={"heading4"}>
              No encontramos facturas asociadas a este dato
            </Typography>

            <div className="w-full border-b-1 border-y-gray-400" />

            <Typography type={"text1"}>
              Revisá el dato ingresado. Si es correcto, es posible que la
              empresa aún no haya cargado tu factura.
            </Typography>
          </article>
        </Card>
        <div className="flex flex-row justify-end">
          <Button mode="primary" onClick={handleReset} className="w-[233px]">
            Revisar dato
          </Button>
        </div>
      </section>
    );
  }

  return (
    <Card mode="dark">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <section className="flex flex-col gap-4">
            <Typography type={"heading3"} className="text-primary">
              Número de cuenta sin el primer 2
            </Typography>

            <TextInput
              placeholder="Número de cuenta"
              type="text"
              {...register("accountNumber")}
              className="w-[475px]"
            />

            {error && (
              <Typography type={"error"} className="text-red-500">
                {error}
              </Typography>
            )}

            <Typography type={"text2"}>
              Son 11 números sin espacios, sin el “2” inicial. Agregá ceros
              adelante si tenés menos.
            </Typography>

            <div className="flex flex-row justify-end">
              <Button mode="primary" type="submit" className="w-[233px]">
                Continuar
              </Button>
            </div>
          </section>
        </form>
      </FormProvider>
    </Card>
  );
};

const PaySelectedServiceStep2 = ({
  handleSelectCard,
}: {
  handleSelectCard: (id: number) => void;
}) => {
  const { service, cards, selectedCard, goToNextStep } =
    usePaySelectedServiceContext();

  return (
    <section className="flex flex-col gap-[16px]">
      <Card mode="dark">
        <section className="flex flex-col gap-4">
          <Typography type={"heading3"} className="text-primary">
            {service?.name}
          </Typography>

          <div className="w-full border-b-1 border-y-gray-400" />

          <div className="flex flex-row justify-between">
            <Typography type={"heading3"}>Total a pagar</Typography>
            <Typography type={"heading3"}>
              {formatArgentinePesos(service?.invoice_value || 0)}
            </Typography>
          </div>
        </section>
      </Card>
      <Card mode="white">
        <CardSelector
          cards={cards}
          selectedCard={selectedCard}
          onSelectCard={handleSelectCard}
        />
        {cards.length < 10 && (
          <Link href={PATHS.CARDS_NEW}>
            <div className="flex w-full flex-row gap-[16px] items-center pt-[16px]">
              <Typography type={"text2"} className="text-black">
                + Agregar medio de pago
              </Typography>
            </div>
          </Link>
        )}
      </Card>
      <div className="flex flex-row justify-end">
        <Button
          mode="primary"
          type="submit"
          className="w-[233px]"
          disabled={!selectedCard}
          onClick={goToNextStep}
        >
          Continuar
        </Button>
      </div>
    </section>
  );
};

const PaySelectedServiceStep3 = () => {
  const { service, cards, selectedCard } = usePaySelectedServiceContext();

  const selectedCardData = cards.find((card) => card.id === selectedCard);
  const selectedCardLastFourNumbers = String(selectedCardData?.cod).slice(-4);
  const cardProvider = determineCardProvider(String(selectedCardData?.cod));

  return (
    <section className="flex flex-col gap-[16px]">
      <Card mode="green">
        <article className="w-full flex flex-col items-center gap-[16px] mb-[14px]">
          <Image
            src="/images/check-black.svg"
            alt="Ya realizaste tu pago"
            width={66}
            height={66}
            className="w-[66px] h-[66px]"
          />
          <Typography type={"heading4"}>Ya realizaste tu pago</Typography>
        </article>
      </Card>
      <Card mode="dark">
        <article className="w-full flex flex-col gap-[16px] mb-[14px]">
          <Typography type="text2">{spanishTextDate(new Date())}</Typography>

          <Typography type="heading4" className="text-primary">
            ${service?.invoice_value}
          </Typography>
          <Typography type="text2">Para</Typography>
          <Typography type="heading4" className="text-primary">
            {service?.name}
          </Typography>

          <Typography type="text2">Tarjeta</Typography>
          <Typography type="text2">
            {capitalizeFirstLetter(cardProvider || "")} ************
            {selectedCardLastFourNumbers}
          </Typography>
        </article>
      </Card>
      <div className="flex flex-row justify-end gap-[16px]">
        <Link href={PATHS.HOME}>
          <Button mode="tertiary" className="w-[233px]">
            Ir a inicio
          </Button>
        </Link>
        <Button
          mode="primary"
          type="submit"
          onClick={() => console.log("😅😅😅")}
          className="w-[260px]"
        >
          Descargar comprobante
        </Button>
      </div>
    </section>
  );
};

export default PaySelectedServiceView;
