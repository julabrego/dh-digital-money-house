"use client";

import AuthService from "@/services/auth/auth.service";
import UserService from "@/services/user/user.service";
import React, { createContext, useContext, useEffect, useState } from "react";

type GlobalContextValue = {
  userToken?: string;
  setUserToken: React.Dispatch<React.SetStateAction<string | undefined>>;
  serviceProvider: ServiceProvider;
  toggleMenuOpen: () => void;
  isMenuOpen: boolean;
  isUserAuthenticated: boolean;
};

type ServiceProvider = {
  userService: UserService;
  authService: AuthService;
};

const GlobalContext = createContext<GlobalContextValue | undefined>(undefined);

const GlobalContextProvider = ({ children }: React.PropsWithChildren) => {
  const [serviceProvider] = useState<ServiceProvider>({
    userService: new UserService(),
    authService: new AuthService(),
  });
  const [userToken, setUserToken] = useState<string | undefined>("pending");

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUserToken(token);
    } else {
      setUserToken(undefined);
    }
  }, []);

  useEffect(() => {
    if (userToken !== null) {
      serviceProvider.userService.userToken = userToken;
    }
  }, [serviceProvider, userToken]);

  const toggleMenuOpen = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isUserAuthenticated = userToken !== undefined && userToken !== "pending";

  const value = { userToken, setUserToken, isUserAuthenticated, serviceProvider, toggleMenuOpen, isMenuOpen };

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
