"use client";

import Button from "@/components/common/Button";
import PATHS from "@/config/routing/paths";
import useNavigation from "@/hooks/useNavigation";

const { REGISTER, LOGIN } = PATHS;

const MainPageNavigationButtons = () => {
  const { goTo } = useNavigation();
  return (
    <div className="flex gap-[12px]">
      <Button onClick={() => goTo(LOGIN)} mode={"secondary"} size={"small"}>
        Ingresar
      </Button>
      <Button onClick={() => goTo(REGISTER)} mode={"secondary"} size={"small"}>
        Crear cuenta
      </Button>
    </div>
  );
};

export default MainPageNavigationButtons;
