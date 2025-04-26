import React from "react";
import Image from "next/image";
import Button from "../common/Button";

const Header = ({ mode = "main" }: HeaderProps) => {
  return (
    <nav
      className={`fixed top-0 h-16 w-full ${
        mode === "main" ? "bg-background" : "bg-primary"
      } z-20`}
    >
      <div className="flex justify-between items-center h-full w-full px-4">
        <Image
          src={`${mode === "main" ? "/images/logo-01-primary.png" : "/images/logo-01-secondary.png"}`}
          alt="Digital Money House"
          width={83}
          height={33}
          className="w-[63px] md:w-[83px]"
        />
        {mode === "main" && (
          <div className="flex gap-4">
            <Button mode={"secondary"} size={"small"}>
              Ingresar
            </Button>
            <Button mode={"primary"} size={"small"}>
              Crear cuenta
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

type HeaderProps = {
  mode?: "main" | "login";
};

export default Header;
