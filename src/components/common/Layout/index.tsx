import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import React from "react";

type LayoutProps = React.PropsWithChildren & {
  mode?: "main" | "login" | "register";
};

const GeneralLayout = ({ children, mode }: LayoutProps) => {
  return (
    <div className="pt-16 pb-16 flex flex-col min-h-screen justify-center items-center">
      <Header mode={mode} />
      {children}
      <Footer />
    </div>
  );
};

export default GeneralLayout;
