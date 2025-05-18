"use client";
import Button from "@/components/common/Button";
import ErrorMessage from "@/components/common/ErrorMessage";
import TextInput from "@/components/common/TextInput";
import PATHS from "@/config/routing/paths";
import { useHeadersContext } from "@/contexts/headers.context";
import { useNewCardContext } from "@/contexts/newCard.context";
import useNavigation from "@/hooks/useNavigation";
import NewCardSchema from "@/schemas/newCard.schema";
import cardsApi from "@/services/cards/cards.api";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

export const CardForm = () => {
  const { goTo } = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const { accountId, token } = useHeadersContext();

  const methods = useForm<CardForm>({
    resolver: yupResolver(NewCardSchema),
  });
  const { setNewCardContextState } = useNewCardContext();

  useEffect(() => {
    const subscription = methods.watch((values) => {
      setNewCardContextState((prevState) => ({
        ...prevState,
        numberId: values.numberId || "",
        cardHolderName: values.cardHolderName || "",
        expirationDate: values.expirationDate || "",
        cvv: values.cvv || "",
      }));
    });

    return () => subscription.unsubscribe();
  }, [methods, setNewCardContextState]);

  const {
    handleSubmit,
    formState: { errors },
    getValues,
  } = methods;

  const errorMessages = Object.values(errors);

  const onSubmit = async () => {
    setServerError(null);

    try {
      setIsLoading(true);

      const { numberId, cardHolderName, expirationDate, cvv } = getValues();

      await cardsApi.createCard(
        {
          cod: Number(cvv),
          expiration_date: expirationDate,
          first_last_name: cardHolderName,
          number_id: Number(numberId),
        },
        {
          accountId: accountId ?? "",
          token: token ?? "",
        }
      );

      goTo(PATHS.CARDS);
    } catch (error) {
      if (error instanceof Error) {
        setServerError(error.message);
      } else {
        setServerError("Ocurrio un error inesperado");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      className="form-container md:min-w-[715px]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="fields-container register-form gap-[8px]">
        <FormProvider {...methods}>
          <TextInput
            disabled={isLoading}
            name="numberId"
            placeholder="Número de tarjeta*"
          />
          <TextInput
            disabled={isLoading}
            name="cardHolderName"
            placeholder="Nombre y apellido*"
          />
          <TextInput
            disabled={isLoading}
            name="expirationDate"
            placeholder="Fecha de vencimiento*"
          />
          <TextInput
            disabled={isLoading}
            name="cvv"
            placeholder="Código de seguridad*"
          />
          <Button mode="primary" type="submit" className="mt-[16px]">
            Continuar
          </Button>
        </FormProvider>

        {(serverError || errorMessages.length > 0) && (
          <div className="full-width-row text-[11px] text-center">
            {serverError ? (
              <ErrorMessage>{serverError}</ErrorMessage>
            ) : (
              errorMessages.length > 0 && (
                <ErrorMessage>{errorMessages[0].message}</ErrorMessage>
              )
            )}
          </div>
        )}
      </div>
    </form>
  );
};

type CardForm = {
  numberId: string;
  cardHolderName: string;
  expirationDate: string;
  cvv: string;
};
