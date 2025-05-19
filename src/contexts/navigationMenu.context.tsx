"use client";

import userApi from "@/services/user/user.api";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { useHeadersContext } from "./headers.context";

type NavigationMenuContextValue = PropsWithChildren & {
  toggleMenuOpen: () => void;
  isMenuOpen: boolean;
  userNameData: {
    fullName: string;
    initials: string;
  };
};

const NavigationMenuContext = createContext<
  NavigationMenuContextValue | undefined
>(undefined);

const NavigationMenuContextProvider = ({ children }: PropsWithChildren) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userNameData, setUserNameData] = useState({
    fullName: "",
    initials: "",
  });

  const { userId, token } = useHeadersContext();

  useEffect(() => {
    const fetchUserData = async () => {
      if (userId && token) {
        const userData = await userApi.getUser(userId, token);

        setUserNameData({
          fullName: userData.firstname + " " + userData.lastname,
          initials:
            (userData.firstname || "")[0] + (userData.lastname || "")[0],
        });
      }
    };
    fetchUserData();
  }, [token, userId]);

  const toggleMenuOpen = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const value = {
    toggleMenuOpen,
    isMenuOpen,
    userNameData,
  };

  return (
    <NavigationMenuContext.Provider value={value}>
      {children}
    </NavigationMenuContext.Provider>
  );
};

const useNavigationMenuContext = () => {
  const context = useContext(NavigationMenuContext);
  if (!context) {
    throw new Error(
      "useNavigationMenuContext must be used within a NavigationMenuContextProvider"
    );
  }
  return context;
};

export { NavigationMenuContextProvider, useNavigationMenuContext };
