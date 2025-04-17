import React from "react";
import Image from "next/image";
import Button from "../common/Button";

const Header = () => {
  return (
    <nav className="h-16 w-full bg-secondary">
      <div className="flex justify-between items-center h-full w-full px-4">
        <Image src="/images/logo-01-primary.png" alt="Digital Money House" width={83} height={33} />
        <div className="flex gap-4">
          <Button mode={'secondary'} size={"small"}>Ingresar</Button>
          <Button mode={'primary'} size={"small"}>Crear cuenta</Button>
        </div>
      </div>
    </nav>
  );
};

export default Header;

