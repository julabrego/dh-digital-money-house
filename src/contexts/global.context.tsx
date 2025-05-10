"use client";

import authAPI from "@/services/auth/auth.api";
import { User } from "@/types/user.types";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from "react";

type GlobalContextState = {
  userData: User | null;
  toggleMenuOpen: () => void;
  isMenuOpen: boolean;
  handleLogout: () => Promise<void>;
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

  const handleLogout = async () => {
    await authAPI.logout();
  };

  const value = { userData, toggleMenuOpen, isMenuOpen, handleLogout };

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
