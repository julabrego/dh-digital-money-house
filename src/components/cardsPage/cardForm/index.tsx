"use client";
import Button from "@/components/common/Button";
import TextInput from "@/components/common/TextInput";
import { Card } from "@/types/card.types";
import { FormProvider, useForm } from "react-hook-form";

export const CardForm = () => {
  const methods = useForm<Card>({
    // resolver: yupResolver(RegisterSchema),
  });

  const {
    handleSubmit,
    formState: { errors },
    getValues,
  } = methods;

  return (
    <form
      className="form-container md:min-w-[715px]"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <div className="fields-container register-form gap-[8px]">
        <FormProvider {...methods}>
          <TextInput name="numberId" placeholder="Número de tarjeta*" />
          <TextInput name="cardHolderName" placeholder="Nombre y apellido*" />
          <TextInput
            name="expirationDate"
            placeholder="Fecha de vencimiento*"
          />
          <TextInput name="cvv" placeholder="Código de seguridad*" />
          <Button mode="primary" type="submit" className="mt-[16px]">Continuar</Button>
        </FormProvider>
      </div>
    </form>
  );
};
