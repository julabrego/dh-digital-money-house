// TODO: TESTS -> SPRINT2

"use client";

import React from "react";
import Image from "next/image";
import Button from "../common/Button";
import { useRouter, usePathname } from "next/navigation";
import PATHS from "@/config/routing/paths";
import { useGlobalContext } from "@/contexts/global.context";
import { GeneralLayoutMode } from "../common/Layout/types";

const { REGISTER, LOGIN, MAIN } = PATHS;

const Header = ({ mode = "dark" }: HeaderProps) => {
  const router = useRouter();
  const pathName = usePathname();
  const { userToken } = useGlobalContext();

  const onGoToLink = (href: string) => {
    console.log("click", href);
    router.push(href);
    router.refresh();
  };

  return (
    <nav
      className={`fixed top-0 h-16 w-full ${
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
        {!userToken && userToken !== "pending" && (
          <div className="flex gap-4">
            {isPathMain() && (
              <>
                <Button
                  onClick={() => onGoToLink(LOGIN)}
                  mode={"secondary"}
                  size={"small"}
                >
                  Ingresar
                </Button>
                <Button
                  onClick={() => onGoToLink(REGISTER)}
                  mode={"secondary"}
                  size={"small"}
                >
                  Crear cuenta
                </Button>
              </>
            )}

            {isPathRegister() && (
              <Button
                onClick={() => onGoToLink(LOGIN)}
                mode={"primary"}
                size={"small"}
              >
                Iniciar sesión
              </Button>
            )}
          </div>
        )}
      </div>
    </nav>
  );

  function isPathMain() {
    return pathName === MAIN;
  }
  function isPathRegister() {
    return pathName === REGISTER;
  }
};

type HeaderProps = {
  mode?: GeneralLayoutMode;
};

export default Header;
