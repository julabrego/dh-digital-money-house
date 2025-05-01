import React from "react";
import Image from "next/image";
import Button from "@/components/common/Button";
import PATHS from "@/config/routing/paths";
import { useRouter } from "next/navigation";

const AccountCreated = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center gap-4 px-16 py-8">
      <h1 className="text-[35px] md:text-[64px] font-semibold text-center">Registro Exitoso</h1>
      <Image
        src={"/images/check.png"}
        alt="Registro Exitoso"
        width={94}
        height={97}
      />
      <p className="text-[14px] md:text-[16px] mb-8 text-center">
        Hemos enviado un correo de confirmación para validar tu email, por favor
        revisalo para iniciar sesión.
      </p>
      <Button
        mode="primary"
        onClick={() => {
          router.push(PATHS.LOGIN);
          router.refresh()
        }}
        size="small"
        className="w-[300px]"
      >
        Continuar
      </Button>
    </div>
  );
};

export default AccountCreated;
