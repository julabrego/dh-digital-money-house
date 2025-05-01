"use client"
import { User } from "@/types/user.types";
import React, {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

type GlobalContextValue = {
  userToken: string | null;
  userData?: User;
};

const GlobalContext = createContext<GlobalContextValue | undefined>(undefined);

const GlobalContextProvider = ({ children }: React.PropsWithChildren) => {
  const [userToken, setUserToken] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setUserToken(token);
  }, []);

  const value = { userToken };

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

