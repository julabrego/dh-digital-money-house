import { Card as CardType } from "@/types/card.types";
import React, { PropsWithChildren, useContext } from "react";

type ChargeMoneyContextValue = PropsWithChildren & {
  cards: CardType[];
  step: number;
  goToNextStep: () => void;
  selectedCard: number | null;
};

const ChargeMoneyContext = React.createContext<ChargeMoneyContextValue | null>(
  null
);

const ChargeMoneyContextProvider = ({
  children,
  cards,
  step,
  goToNextStep,
  selectedCard,
}: ChargeMoneyContextValue) => {
  return (
    <ChargeMoneyContext.Provider value={{ cards, step, goToNextStep, selectedCard }}>
      {children}
    </ChargeMoneyContext.Provider>
  );
};

const useChargeMoneyContext = () => {
  const context = useContext(ChargeMoneyContext);
  if (!context) {
    throw new Error(
      "useChargeMoneyContext must be used within a ChargeMoneyContextProvider"
    );
  }
  return context;
};

export { ChargeMoneyContextProvider, useChargeMoneyContext };

