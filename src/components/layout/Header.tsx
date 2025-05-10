"use client";

import PATHS from "@/config/routing/paths";
import { useGlobalContext } from "@/contexts/global.context";
import useNavigation from "@/hooks/useNavigation";
import Image from "next/image";
import Button from "../common/Button";
import { GeneralLayoutMode } from "../common/Layout/types";

const { REGISTER, LOGIN, MAIN } = PATHS;

const Header = ({ mode = "dark" }: HeaderProps) => {
  const { goTo, pathName } = useNavigation();
  const { userData, toggleMenuOpen } = useGlobalContext();

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
        {userData ? (
          <div className="flex gap-[12px] items-center">
            <div className="h-[33px] w-[39px] flex justify-center items-center rounded bg-primary text-background font-bold">
              MB
            </div>
            <Image
              onClick={toggleMenuOpen}
              src={"/images/menu.png"}
              alt="Menu"
              width={33}
              height={33}
              className="h-[33px] w-[33px] md:hidden"
            />
          </div>
        ) : (
          <div className="flex gap-[12px]">
            {isPathMain() && (
              <>
                <Button
                  onClick={() => goTo(LOGIN)}
                  mode={"secondary"}
                  size={"small"}
                >
                  Ingresar
                </Button>
                <Button
                  onClick={() => goTo(REGISTER)}
                  mode={"secondary"}
                  size={"small"}
                >
                  Crear cuenta
                </Button>
              </>
            )}

            {isPathRegister() && (
              <Button
                onClick={() => goTo(LOGIN)}
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
