"use client";

import Button from "@/components/common/Button";
import PATHS from "@/config/routing/paths";
import Link from "next/link";

const { LOGIN } = PATHS;

const RegisterPageNavigationButtons = () => {
  return (
    <Link href={LOGIN}>
      <Button mode={"primary"} size={"small"}>
        Iniciar sesión
      </Button>
    </Link>
  );
};

export default RegisterPageNavigationButtons;
