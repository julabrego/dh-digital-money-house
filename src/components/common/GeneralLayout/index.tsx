import Footer from "@/components/layout/Footer";
import GeneralHeader from "@/components/layout/Header/GeneralHeader";
import { GeneralLayoutProps } from "./types";

const GeneralLayout = ({ children, mode,headerMenuButtons }: GeneralLayoutProps) => {
  return (
    <main
      className={`relative pt-16 pb-16 flex flex-col justify-center items-center`}
    >
      <GeneralHeader mode={mode} menuButtons={headerMenuButtons} />
      {children}
      <Footer />
    </main>
  );
};

export default GeneralLayout;
