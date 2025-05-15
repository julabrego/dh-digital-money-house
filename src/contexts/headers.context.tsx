"use client";

import { createContext, PropsWithChildren, useContext } from "react";

type HeadersContextValue = PropsWithChildren & {
  userId: string | null;
  token: string | null;
  accountId: string | null;
};

const HeadersContext = createContext<HeadersContextValue | undefined>(
  undefined
);

const HeadersContextProvider = ({
  userId,
  token,
  accountId,
  children,
}: HeadersContextValue) => {
  const value = {
    userId,
    token,
    accountId,
  };

  return (
    <HeadersContext.Provider value={value}>{children}</HeadersContext.Provider>
  );
};

const useHeadersContext = () => {
  const context = useContext(HeadersContext);
  if (!context) {
    throw new Error(
      "useHeadersContext must be used within a HeadersContextProvider"
    );
  }
  return context;
};

export { HeadersContextProvider, useHeadersContext };
