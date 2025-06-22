"use client";
import Button from "@/components/common/Button";
import Card from "@/components/common/Card";
import TextInput from "@/components/common/TextInput";
import Typography from "@/components/common/Typography";
import {
  PaySelectedServiceContextProvider,
  usePaySelectedServiceContext,
} from "@/contexts/paySelectedService.context";
import { Service } from "@/types/service.types";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

type PaySelectedServiceViewProps = {
  service: Service;
};

const PaySelectedServiceView = ({ service }: PaySelectedServiceViewProps) => {
  const [step, setStep] = useState(1);
  const [accountNumber, setAccountNumber] = useState<number | null>(null);

  const goToNextStep = () => setStep(step + 1);
  const goToPrevStep = () => setStep(step - 1);

  let stepComponent = null;

  switch (step) {
    case 1:
      stepComponent = <PaySelectedServiceStep1 />;
      break;
  }

  return (
    <PaySelectedServiceContextProvider
      service={service}
      accountNumber={accountNumber}
      setAccountNumber={setAccountNumber}
      step={step}
      goToNextStep={goToNextStep}
      goToPrevStep={goToPrevStep}
    >
      {stepComponent};
    </PaySelectedServiceContextProvider>
  );
};

const PaySelectedServiceStep1 = () => {
  const [error, setError] = useState<string | null>(null);

  const methods = useForm<{ accountNumber: string }>({});

  const { goToNextStep, setAccountNumber, accountNumber } =
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
    setAccountNumber(null);
  };

  if (accountNumber !== null && accountNumber !== 123456) {
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

export default PaySelectedServiceView;
