"use client";

import Button from "@/components/common/Button";
import PATHS from "@/config/routing/paths";
import {
  LoginContextProvider,
  useLoginContext,
} from "@/contexts/login.context";

import LoginSchema from "@/schemas/login.schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
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
    <main className="w-full flex justify-center">
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
    </main>
  );
};

const StepOne = () => {
  const { setLoginContextState } = useLoginContext();
  // TODO serverError
  const router = useRouter();
  const methods = useForm<{ email: string }>({
    resolver: yupResolver(LoginSchema.email),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = (data: { email: string }) => {
    try {
      // Validar contra la api que el mail exista
    } catch (error) {
      // y si no existe mostrar error
    }
    setLoginContextState((prevState) => ({
      ...prevState,
      email: data.email,
      step: 1,
    }));
  };

  const errorMessages = Object.values(errors);

  return (
    <FormProvider {...methods}>
      <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-[20px] text-center">¡Hola! Ingresá tu e-mail</h1>
        <input
          {...register("email")}
          type="email"
          placeholder="Correo electrónico"
        />
        <Button mode="primary" type="submit">
          Continuar
        </Button>
        <Button mode="tertiary" onClick={() => router.push(PATHS.REGISTER)}>
          Crear cuenta
        </Button>
        {errorMessages.length > 0 &&
          errorMessages.map((error, i) => (
            <p key={`error-message-${i}`} className="error-message text-center">
              {error.message}
            </p>
          ))}
      </form>
    </FormProvider>
  );
};

const StepTwo = () => {
  const router = useRouter();
  const { setLoginContextState } = useLoginContext();
  // TODO serverError
  const methods = useForm<{ password: string }>({
    resolver: yupResolver(LoginSchema.password),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = (data: { password: string }) => {
    try {
      // Validar contra la api que la contraseña sea válida
    } catch (error) {
      // y si no existe mostrar error
    }
    setLoginContextState((prevState) => ({
      ...prevState,
      email: data.password,
      step: 2,
    }));
  };

  const errorMessages = Object.values(errors);

  return (
    <FormProvider {...methods}>
      <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-[20px] text-center">Ingresá tu contraseña</h1>
        <input
          {...register("password")}
          type="password"
          placeholder="Contraseña"
        />
        <Button mode="primary" type="submit">
          Continuar
        </Button>
        {errorMessages.length > 0 &&
          errorMessages.map((error, i) => (
            <p key={`error-message-${i}`} className="error-message text-center">
              {error.message}
            </p>
          ))}
      </form>
    </FormProvider>
  );
};

export default LoginPage;
