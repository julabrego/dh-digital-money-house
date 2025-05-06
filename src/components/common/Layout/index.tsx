"use client";

import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { useGlobalContext } from "@/contexts/global.context";
import { GeneralLayoutProps } from "./types";
import MobileMenu from "@/components/layout/Menu/MobileMenu";
import DesktopMenu from "@/components/layout/Menu/DesktopMenu";
import useNavigation from "@/hooks/useNavigation";

const GeneralLayout = ({ children, mode }: GeneralLayoutProps) => {
  const { isUserAuthenticated, isMenuOpen, toggleMenuOpen } =
    useGlobalContext();
  const { pathName } = useNavigation();
  return (
    <main
      className={`relative pt-16 pb-16 flex flex-col justify-center items-center ${
        hasToShowMenu() ? "md:grid md:grid-cols-[222px_1fr]" : ""
      }`}
    >
      <Header mode={mode} />
      {pathName !== "/" && isUserAuthenticated && (
        <>
          <MobileMenu isOpen={isMenuOpen} toggleMenuOpen={toggleMenuOpen} />
          <DesktopMenu />
        </>
      )}
      {children}
      <Footer />
    </main>
  );

  function hasToShowMenu() {
    return pathName !== "/" && isUserAuthenticated;
  }
};

export default GeneralLayout;
