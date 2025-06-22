import { Service } from "@/types/service.types";
import React, { PropsWithChildren, useContext } from "react";

type PaySelectedServiceContextValue = PropsWithChildren & {
  service: Service | null;
  setAccountNumber: (accountNumber: number | null) => void;
  accountNumber: number | null;
  step: number;
  goToNextStep: () => void;
  goToPrevStep: () => void;
};

const PaySelectedServiceContext =
  React.createContext<PaySelectedServiceContextValue | null>(null);

const PaySelectedServiceContextProvider = ({
  children,
  service,
  accountNumber,
  setAccountNumber,
  step,
  goToNextStep,
  goToPrevStep,
}: PaySelectedServiceContextValue) => {
  return (
    <PaySelectedServiceContext.Provider
      value={{
        step,
        goToNextStep,
        goToPrevStep,
        service,
        accountNumber,
        setAccountNumber,
      }}
    >
      {children}
    </PaySelectedServiceContext.Provider>
  );
};

const usePaySelectedServiceContext = () => {
  const context = useContext(PaySelectedServiceContext);
  if (!context) {
    throw new Error(
      "usePaySelectedServiceContext must be used within a PaySelectedServiceContextProvider"
    );
  }
  return context;
};

export { PaySelectedServiceContextProvider, usePaySelectedServiceContext };

