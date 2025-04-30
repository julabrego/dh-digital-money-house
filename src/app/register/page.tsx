"use client";

import Button from "@/components/common/Button";
import ErrorMessage from "@/components/common/ErrorMessage";
import TextInput from "@/components/common/TextInput";
import { RegisterContextProvider } from "@/contexts/register.context";
import RegisterSchema from "@/schemas/register.schema";
import { RegisterUserParamsType } from "@/types/auth.types";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";

const RegisterPage = () => {
  return (
    <RegisterContextProvider>
      <RegisterForm />
    </RegisterContextProvider>
  );
};

const RegisterForm = () => {
  const methods = useForm<RegisterUserParamsType & { passwordRepeat: string }>({
    resolver: yupResolver(RegisterSchema),
  });

  const {
    handleSubmit,
    formState: { errors },
    getValues,
  } = methods;

  const errorMessages = Object.values(errors);

  const onSubmit = () => {
    console.log(getValues());
  };

  return (
    <main className="w-full flex justify-center pt-4 pb-4">
      <FormProvider {...methods}>
        <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
          <h1 className="text-[20px] text-center">Crear cuenta</h1>
          
          <TextInput name="firstname" placeholder="Nombre*" />
          <TextInput name="lastname" placeholder="Apellido*" />
          <TextInput name="dni" placeholder="DNI*" type="number" min={10000000} />
          <TextInput name="email" placeholder="Correo electrónico" />
          
          <p className="text-[11px] text-center">
            Usa entre 6 y 20 carácteres (debe contener al menos al menos 1
            carácter especial, una mayúscula y un número.
          </p>
          
          <TextInput name="password" placeholder="Contraseña*" type="password" />
          <TextInput name="passwordRepeat" placeholder="Repite contraseña*" type="password" />
          <TextInput name="phone" placeholder="Teléfono*" />

          <Button mode="primary" type="submit">
            Crear cuenta
          </Button>
          {errorMessages.length > 0 && (
            <ErrorMessage>{errorMessages[0].message}</ErrorMessage>
          )}
        </form>
      </FormProvider>
    </main>
  );
};

export default RegisterPage;
