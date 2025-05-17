"use client";

import PATHS from "@/config/routing/paths";
import { useNavigationMenuContext } from "@/contexts/global.context";
import useNavigation from "@/hooks/useNavigation";
import Image from "next/image";
import Link from "next/link";

const AuthenticatedHeaderNavigation = () => {
  const { goTo } = useNavigation();
  const { toggleMenuOpen, userNameData } = useNavigationMenuContext();
  const { initials } = userNameData;

  return (
    <div className="flex gap-[12px] items-center">
      <div
        className="h-[33px] w-[39px] flex justify-center items-center rounded bg-primary text-background font-bold cursor-pointer"
        onClick={() => goTo(PATHS.HOME)}
      >
        {initials}
      </div>
      <h2 className="hidden md:block font-bold">
        Hola, <Link href={PATHS.PROFILE}>{userNameData.fullName}</Link>
      </h2>
      <Image
        onClick={toggleMenuOpen}
        src={"/images/menu.png"}
        alt="Menu"
        width={33}
        height={33}
        className="h-[33px] w-[33px] md:hidden cursor-pointer"
      />
    </div>
  );
};

export default AuthenticatedHeaderNavigation;
