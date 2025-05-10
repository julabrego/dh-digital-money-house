"use client";

import Button from "@/components/common/Button";
import PATHS from "@/config/routing/paths";
import useNavigation from "@/hooks/useNavigation";

const { LOGIN } = PATHS;

const RegisterPageNavigationButtons = () => {
  const { goTo } = useNavigation();
  return (
    <>
      <Button onClick={() => goTo(LOGIN)} mode={"primary"} size={"small"}>
        Iniciar sesión
      </Button>
    </>
  );
};

export default RegisterPageNavigationButtons;
