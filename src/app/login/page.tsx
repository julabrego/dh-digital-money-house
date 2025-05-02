"use client";

import Button from "@/components/common/Button";
import ErrorMessage from "@/components/common/ErrorMessage";
import MainContainer from "@/components/common/MainContainer";
import TextInput from "@/components/common/TextInput";
import PATHS from "@/config/routing/paths";
import { useGlobalContext } from "@/contexts/global.context";
import {
  LoginContextProvider,
  useLoginContext,
} from "@/contexts/login.context";

import LoginSchema from "@/schemas/login.schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

const LoginPage = () => {
  return (
    <LoginContextProvider>
      <LoginForm />
    </LoginContextProvider>
  );
};

const LoginForm = () => {
  const { step } = useLoginContext();

  return (
    <MainContainer>
      {(() => {
        switch (step) {
          case 0:
            return <StepOne />;
          case 1:
            return <StepTwo />;
          default:
            return null;
        }
      })()}
    </MainContainer>
  );
};

const StepOne = () => {
  const { setLoginContextState } = useLoginContext();

  const router = useRouter();

  const methods = useForm<{ email: string }>({
    resolver: yupResolver(LoginSchema.stepOne),
  });

  const {
    handleSubmit,
    formState: { errors },
    getValues,
  } = methods;

  const onSubmit = () => {
    setLoginContextState((prevState) => ({
      ...prevState,
      email: getValues().email,
      step: 1,
    }));
  };

  const errorMessages = Object.values(errors);

  return (
    <FormProvider {...methods}>
      <form
        className="form-container md:max-w-[360px];"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-[20px] text-center">¡Hola! Ingresá tu e-mail</h1>

        <div className="fields-container">
          <TextInput name="email" placeholder="Correo electrónico" />

          <Button mode="primary" type="submit">
            Continuar
          </Button>

          <Button
            mode="tertiary"
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              e.preventDefault();
              router.push(PATHS.REGISTER);
            }}
          >
            Crear cuenta
          </Button>

          {errorMessages.length > 0 &&
            errorMessages.map((error, i) => (
              <ErrorMessage key={`error-message-${i}`}>
                {error.message}
              </ErrorMessage>
            ))}
        </div>
      </form>
    </FormProvider>
  );
};

const StepTwo = () => {
  const router = useRouter();
  const {
    serviceProvider: { authService }, setUserToken
  } = useGlobalContext();
  const [serverError, setServerError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { email } = useLoginContext();
  const methods = useForm<{ email: string; password: string }>({
    resolver: yupResolver(LoginSchema.password),
  });

  const {
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
  } = methods;

  useEffect(() => {
    setValue("email", email ?? "");
  }, []);

  const onSubmit = async () => {
    const { email, password } = getValues();

    setServerError(null);

    try {
      if (email && password) {
        setIsLoading(true);

        const token = await authService.login(email, password);
        setUserToken(token?.token);

        router.push("/");
        router.refresh();
      }
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

  const errorMessages = Object.values(errors);

  return (
    <FormProvider {...methods}>
      <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
        <div className="fields-container">
          <h1 className="text-[20px] text-center">Ingresá tu contraseña</h1>

          <TextInput
            name="password"
            placeholder="Contraseña"
            type="password"
            disabled={isLoading}
          />

          <Button mode="primary" type="submit" disabled={isLoading}>
            {isLoading ? "Enviando..." : "Continuar"}
          </Button>

          {serverError ? (
            <ErrorMessage>{serverError}</ErrorMessage>
          ) : (
            errorMessages.length > 0 &&
            errorMessages.map((error, i) => (
              <ErrorMessage key={`error-message-${i}`}>
                {error.message}
              </ErrorMessage>
            ))
          )}
        </div>
      </form>
    </FormProvider>
  );
};

export default LoginPage;
