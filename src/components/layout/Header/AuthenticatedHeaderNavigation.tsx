"use client";

import PATHS from "@/config/routing/paths";
import { useGlobalContext } from "@/contexts/global.context";
import useNavigation from "@/hooks/useNavigation";
import Image from "next/image";

const AuthenticatedHeaderNavigation = () => {
  const { userData, toggleMenuOpen } = useGlobalContext();
  const { goTo } = useNavigation();

  return userData ? (
    <div className="flex gap-[12px] items-center">
      <div
        className="h-[33px] w-[39px] flex justify-center items-center rounded bg-primary text-background font-bold cursor-pointer"
        onClick={() => goTo(PATHS.HOME)}
      >
        {userData.firstname[0] + userData.lastname[0]}
      </div>
      <Image
        onClick={toggleMenuOpen}
        src={"/images/menu.png"}
        alt="Menu"
        width={33}
        height={33}
        className="h-[33px] w-[33px] md:hidden cursor-pointer"
      />
    </div>
  ) : (
    <></>
  );
};

export default AuthenticatedHeaderNavigation;
