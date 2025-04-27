"use client"

import React from "react";
import Image from "next/image";
import Button from "../common/Button";
import { useRouter } from "next/navigation";
import PATHS from "@/config/routing/paths";

const { REGISTER, LOGIN } = PATHS;

const Header = ({ mode = "main" }: HeaderProps) => {
  const router = useRouter();

  const onGoToLink = (href: string) => {
    console.log("click", href)
    router.push(href);
    router.refresh();
  };

  return (
    <nav
      className={`fixed top-0 h-16 w-full ${
        mode === "main" ? "bg-background" : "bg-primary"
      } z-20`}
    >
      <div className="flex justify-between items-center h-full w-full px-4">
        <Image
          src={`${
            mode === "main"
              ? "/images/logo-01-primary.png"
              : "/images/logo-01-secondary.png"
          }`}
          alt="Digital Money House"
          width={83}
          height={33}
          className="w-[63px] md:w-[83px]"
        />
        {mode === "main" && (
          <div className="flex gap-4">
            <Button
              onClick={() => onGoToLink(LOGIN)}
              mode={"secondary"}
              size={"small"}
            >
              Ingresar
            </Button>
            <Button
              onClick={() => onGoToLink(REGISTER)}
              mode={"primary"}
              size={"small"}
            >
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
