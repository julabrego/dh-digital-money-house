"use client";

import { useGlobalContext } from "@/contexts/global.context";
import useNavigation from "@/hooks/useNavigation";
import Image from "next/image";

const AuthenticatedHeaderNavigation = () => {
  const { goTo, pathName } = useNavigation();
  const { userData, toggleMenuOpen } = useGlobalContext();

  return userData ? (
    <div className="flex gap-[12px] items-center">
      <div className="h-[33px] w-[39px] flex justify-center items-center rounded bg-primary text-background font-bold">
        {userData.firstname[0] + userData.lastname[0]}
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
    <></>
  );
};

export default AuthenticatedHeaderNavigation;
