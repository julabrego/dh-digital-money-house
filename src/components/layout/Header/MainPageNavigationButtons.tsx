"use client";

import Button from "@/components/common/Button";
import PATHS from "@/config/routing/paths";
import useNavigation from "@/hooks/useNavigation";
import Link from "next/link";
import RegisterPageNavigationButtons from "./RegisterPageNavigationButtons";

const { REGISTER, LOGIN } = PATHS;

const MainPageNavigationButtons = () => {
  return (
    <div className="flex gap-[12px]">
      <Buttons />
    </div>
  );
};

const Buttons = () => {
  const { pathName } = useNavigation();

  switch (pathName) {
    case REGISTER:
      return <RegisterPageNavigationButtons />;
    case LOGIN:
      return <></>;
    default:
      return (
        <>
          <Link href={LOGIN}>
            <Button mode={"secondary"} size={"small"}>
              Ingresar
            </Button>
          </Link>
          <Link href={REGISTER}>
            <Button mode={"secondary"} size={"small"}>
              Crear cuenta
            </Button>
          </Link>
        </>
      );
      break;
  }
};

export default MainPageNavigationButtons;
