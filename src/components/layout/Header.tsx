import React from "react";
import Image from "next/image";

const Header = () => {
  return (
    <nav className="h-16 w-full bg-secondary">
      <div className="flex justify-between items-center h-full w-full px-4">
        <Image src="/images/logo-01-primary.png" alt="Digital Money House" width={83} height={33} />
        <div>
          <button className="mx-2">Button 1</button>
          <button className="mx-2">Button 2</button>
        </div>
      </div>
    </nav>
  );
};

export default Header;

