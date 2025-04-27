import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";

type LoginContext = {
  step: number;
  email?: string;
  password?: string;
  error?: string;
};

const LoginContext = createContext<LoginContextSarasa | undefined>(undefined);

const LoginContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [loginContextState, setLoginContextState] = useState<LoginContext>({
    step: 0,
  });
  const value = {
    ...loginContextState,
    setLoginContextState,
  };

  return (
    <LoginContext.Provider value={value}>{children}</LoginContext.Provider>
  );
};

type LoginContextSarasa = LoginContext & {setLoginContextState: Dispatch<SetStateAction<LoginContext>>}

const useLoginContext = () => {
  const context = useContext(LoginContext);
  if (!context) {
    throw new Error(
      "useLoginContext must be used within a LoginContextProvider"
    );
  }
  return context;
};

export { useLoginContext, LoginContextProvider };
