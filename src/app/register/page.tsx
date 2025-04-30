"use client";

import Button from "@/components/common/Button";
import ErrorMessage from "@/components/common/ErrorMessage";
import MainContainer from "@/components/common/MainContainer";
import TextInput from "@/components/common/TextInput";
import AccountCreated from "@/components/registerPage/AccountCreated";
import { RegisterContextProvider } from "@/contexts/register.context";
import RegisterSchema from "@/schemas/register.schema";
import authAPI from "@/services/auth/auth.api";
import { RegisterUserParamsType } from "@/types/auth.types";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

const RegisterPage = () => {
  return (
    <RegisterContextProvider>
      <RegisterForm />
    </RegisterContextProvider>
  );
};

const RegisterForm = () => {
  const [serverError, setServerError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAccountCreated, setIsAccountCreated] = useState<boolean>(false);

  const methods = useForm<RegisterUserParamsType & { passwordRepeat: string }>({
    resolver: yupResolver(RegisterSchema),
  });

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

      const { firstname, lastname, dni, email, password, phone } = getValues();

      await authAPI.register({
        firstname,
        lastname,
        dni: Number(dni),
        email,
        password,
        phone,
      });

      setIsAccountCreated(true);
    } catch (error) {
      if (error instanceof Error) {
        setServerError(error.message);
      } else {
        setServerError("Ocurrió un error inesperado");
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (isAccountCreated) {
    return <AccountCreated />;
  }

  return (
    <MainContainer>
      <FormProvider {...methods}>
        <form className="form-container md:min-w-[715px]" onSubmit={handleSubmit(onSubmit)}>
          <h1 className="text-[20px] text-center">Crear cuenta</h1>

          <div className="fields-container register-form">
            <TextInput
              name="firstname"
              placeholder="Nombre*"
              disabled={isLoading}
            />
            <TextInput
              name="lastname"
              placeholder="Apellido*"
              disabled={isLoading}
            />
          <TextInput
            name="dni"
            placeholder="DNI*"
            type="number"
            min={10000000}
            disabled={isLoading}
          />
          <TextInput
            name="email"
            placeholder="Correo electrónico"
            disabled={isLoading}
          />

          <p className="full-width-row text-[11px] text-center">
            Usa entre 6 y 20 carácteres (debe contener al menos al menos 1
            carácter especial, una mayúscula y un número.
          </p>

          <TextInput
            name="password"
            placeholder="Contraseña*"
            type="password"
            disabled={isLoading}
          />
          <TextInput
            name="passwordRepeat"
            placeholder="Repite contraseña*"
            type="password"
            disabled={isLoading}
          />
          <TextInput
            name="phone"
            placeholder="Teléfono*"
            disabled={isLoading}
          />

          <Button mode="primary" type="submit" disabled={isLoading}>
            Crear cuenta
          </Button>
          {serverError ? (
            <ErrorMessage>{serverError}</ErrorMessage>
          ) : (
            errorMessages.length > 0 && (
              <ErrorMessage>{errorMessages[0].message}</ErrorMessage>
            )
          )}
</div>

        </form>
      </FormProvider>
    </MainContainer>
  );
};

export default RegisterPage;
