"use client";

import { User } from "@/types/user.types";
import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from "react";

type GlobalContextState = {
  userData: User | null;
  toggleMenuOpen: () => void;
  isMenuOpen: boolean;
};

const GlobalContext = createContext<GlobalContextState | undefined>(undefined);

type GlobalContextProps = PropsWithChildren & {
  userData: User | null;
};

const GlobalContextProvider = ({ userData, children }: GlobalContextProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenuOpen = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const value = { userData, toggleMenuOpen, isMenuOpen };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};

const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error(
      "useGlobalContext must be used within a GlobalContextProvider"
    );
  }
  return context;
};

export { GlobalContextProvider, useGlobalContext };
