"use client";

import Button from "@/components/common/Button";
import ErrorMessage from "@/components/common/ErrorMessage";
import PATHS from "@/config/routing/paths";
import {
  LoginContextProvider,
  useLoginContext,
} from "@/contexts/login.context";

import LoginSchema from "@/schemas/login.schema";
import authAPI from "@/services/auth/auth.api";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

const LoginPage = () => {
  return (
    <LoginContextProvider>
      <LoginForm />
    </LoginContextProvider>
  );
};

const LoginForm = () => {
  const { step, setLoginContextState } = useLoginContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setLoginContextState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <main className="w-full flex justify-center">
      {(() => {
        switch (step) {
          case 0:
            return <StepOne onChange={handleChange} />;
          case 1:
            return <StepTwo onChange={handleChange} />;
          default:
            return null;
        }
      })()}
    </main>
  );
};

const StepOne = ({
  onChange,
}: {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  const { email, setLoginContextState } = useLoginContext();

  const router = useRouter();
  const methods = useForm<{ email: string }>({
    resolver: yupResolver(LoginSchema.email),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = methods;

  const onSubmit = () => {
    setLoginContextState((prevState) => ({
      ...prevState,
      step: 1,
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setValue("email", value);
    onChange(e);
  };

  const errorMessages = Object.values(errors);

  return (
    <FormProvider {...methods}>
      <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-[20px] text-center">¡Hola! Ingresá tu e-mail</h1>
        <input
          {...register("email")}
          type="text"
          placeholder="Correo electrónico"
          value={email || ""}
          onChange={handleChange}
        />
        <Button mode="primary" type="submit">
          Continuar
        </Button>
        <Button mode="tertiary" onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
          e.preventDefault()
          router.push(PATHS.REGISTER)}
          }>
          Crear cuenta
        </Button>
        {errorMessages.length > 0 &&
          errorMessages.map((error, i) => (
            <ErrorMessage key={`error-message-${i}`}>
              {error.message}
            </ErrorMessage>
          ))}
      </form>
    </FormProvider>
  );
};

const StepTwo = ({
  onChange,
}: {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  const { email, password } = useLoginContext();
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const methods = useForm<{ password: string }>({
    resolver: yupResolver(LoginSchema.password),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = methods;

  const onSubmit = async () => {
    setServerError(null);
    try {
      if (email && password) {
        await authAPI.login(email, password);

        router.push("/");
        router.refresh();
      }
    } catch (error) {
      if (error instanceof Error) {
        setServerError(error.message);
      } else {
        setServerError("Ocurrió un error inesperado");
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setValue("password", value);
    onChange(e);
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
          value={password || ""}
          onChange={handleChange}
        />
        <Button mode="primary" type="submit">
          Continuar
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
      </form>
    </FormProvider>
  );
};

export default LoginPage;
