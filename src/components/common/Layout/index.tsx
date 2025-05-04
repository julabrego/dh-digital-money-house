"use client"

import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import React from "react";
import { GeneralLayoutProps } from "./types";
import { useGlobalContext } from "@/contexts/global.context";
import Menu from "@/components/layout/Menu";

const GeneralLayout = ({ children, mode }: GeneralLayoutProps) => {
  const { isMenuOpen, toggleMenuOpen } = useGlobalContext();
  return (
    <main className="relative pt-16 pb-16 flex flex-col min-h-screen justify-center items-center">
      <Header mode={mode} />
      <Menu isOpen={isMenuOpen} toggleMenuOpen={toggleMenuOpen} />
      {children}
      <Footer />
    </main>
  );
};

export default GeneralLayout;
