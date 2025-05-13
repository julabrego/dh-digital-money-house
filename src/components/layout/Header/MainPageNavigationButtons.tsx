"use client";

import Button from "@/components/common/Button";
import PATHS from "@/config/routing/paths";
import useNavigation from "@/hooks/useNavigation";
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
  const { goTo, pathName } = useNavigation();

  switch (pathName) {
    case REGISTER:
      return <RegisterPageNavigationButtons />;
    case LOGIN:
      return <></>;
    default:
      return (
        <>
          <Button onClick={() => goTo(LOGIN)} mode={"secondary"} size={"small"}>
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
      );
      break;
  }
};

export default MainPageNavigationButtons;
