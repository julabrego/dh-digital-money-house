"use client";

import { User } from "@/types/user.types";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

type RegisterContext = User;

const RegisterContext = createContext<RegisterContextType | undefined>(
  undefined
);

const RegisterContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [registerContextState, setRegisterContextState] =
    useState<RegisterContext>({
      dni: 0,
      email: "",
      firstname: "",
      lastname: "",
      password: "",
      phone: "",
    });

  const value = {
    ...registerContextState,
    setRegisterContextState,
  };

  return (
    <RegisterContext.Provider value={value}>
      {children}
    </RegisterContext.Provider>
  );
};

type RegisterContextType = RegisterContext & {
  setRegisterContextState: Dispatch<SetStateAction<RegisterContext>>;
};

const useRegisterContext = () => {
  const context = useContext(RegisterContext);
  if (!context) {
    throw new Error(
      "useRegisterContext must be used within a RegisterContextProvider"
    );
  }
  return context;
};

export { RegisterContextProvider, useRegisterContext };
