"use client";

import { createContext, PropsWithChildren, useContext, useState } from "react";

type NewCardContextState = {
  numberId: string;
  cardHolderName: string;
  expirationDate: string;
  cvv: string;
};

type NewCardContextValue = PropsWithChildren & {
  newCardContextState: NewCardContextState;
  setNewCardContextState: React.Dispatch<
    React.SetStateAction<NewCardContextState>
  >;
};

const NewCardContext = createContext<NewCardContextValue | undefined>(
  undefined
);

const NewCardContextProvider = ({ children }: PropsWithChildren) => {
  const [newCardContextState, setNewCardContextState] =
    useState<NewCardContextState>({
      numberId: "",
      cardHolderName: "",
      expirationDate: "",
      cvv: "",
    });

  const value = { newCardContextState, setNewCardContextState };

  return (
    <NewCardContext.Provider value={value}>{children}</NewCardContext.Provider>
  );
};

const useNewCardContext = () => {
  const context = useContext(NewCardContext);
  if (!context) {
    throw new Error(
      "useNewCardContext must be used within a NewCardContextProvider"
    );
  }
  return context;
};

export { NewCardContextProvider, useNewCardContext };

