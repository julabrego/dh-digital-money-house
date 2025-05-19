import { GeneralLayoutMode } from "@/components/common/GeneralLayout/types";
import Image from "next/image";
import { ReactNode } from "react";

const GeneralHeader = ({ mode = "dark", menuButtons }: HeaderProps) => {
  return (
    <nav
      className={`fixed top-0 h-16 w-full overflow-x-hidden max-w-[100vw] ${
        mode === "dark"
          ? "bg-background dark-container"
          : "bg-primary light-container"
      } z-20`}
    >
      <div className="flex justify-between items-center h-full w-full px-4">
        <Image
          src={`${
            mode === "dark"
              ? "/images/logo-01-primary.png"
              : "/images/logo-01-secondary.png"
          }`}
          alt="Digital Money House"
          width={83}
          height={33}
          className="w-[63px] md:w-[83px]"
        />

        {menuButtons &&
          (typeof menuButtons === "function" ? menuButtons() : menuButtons)}
      </div>
    </nav>
  );
};

type HeaderProps = {
  mode?: GeneralLayoutMode;
  menuButtons?: ReactNode | (() => ReactNode);
};

export default GeneralHeader;
