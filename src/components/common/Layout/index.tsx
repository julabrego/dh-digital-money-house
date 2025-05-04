"use client";

import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { useGlobalContext } from "@/contexts/global.context";
import { GeneralLayoutProps } from "./types";
import MobileMenu from "@/components/layout/Menu/MobileMenu";
import DesktopMenu from "@/components/layout/Menu/DesktopMenu";

const GeneralLayout = ({ children, mode }: GeneralLayoutProps) => {
  const { isMenuOpen, toggleMenuOpen } = useGlobalContext();
  return (
    <main className="relative pt-16 pb-16 flex flex-col md:grid md:grid-cols-[222px_1fr] justify-center items-center">
      <Header mode={mode} />
      <MobileMenu isOpen={isMenuOpen} toggleMenuOpen={toggleMenuOpen} />
      <DesktopMenu />
      {children}
      <Footer />
    </main>
  );
};

export default GeneralLayout;
