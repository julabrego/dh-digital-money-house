"use client";

import { User } from "@/types/user.types";
import React, { createContext, useContext, useState } from "react";

type GlobalContextValue = {
  userData?: User;
  setUserData: React.Dispatch<React.SetStateAction<User | undefined>>;
  toggleMenuOpen: () => void;
  isMenuOpen: boolean;
};

const GlobalContext = createContext<GlobalContextValue | undefined>(undefined);

const GlobalContextProvider = ({ children }: React.PropsWithChildren) => {
  const [userData, setUserData] = useState<User | undefined>();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenuOpen = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const value = { userData, setUserData, toggleMenuOpen, isMenuOpen };

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
