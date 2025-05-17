"use client";

import { useNavigationMenuContext } from "@/contexts/global.context";
import Image from "next/image";
import MenuItems from "./MenuItems";
import Link from "next/link";
import PATHS from "@/config/routing/paths";

const MobileMenu = () => {
  const { isMenuOpen, toggleMenuOpen, userNameData } =
    useNavigationMenuContext();
  return (
    <div className="md:hidden fixed top-0 w-full h-screen z-30 contents">
      {isMenuOpen && (
        <div
          className={`fixed top-0 w-full h-screen z-20 bg-black opacity-50`}
          onClick={toggleMenuOpen}
        />
      )}
      <aside
        className={`fixed top-0 w-[219px] h-screen z-30 bg-white text-black transition-[right] delay-150 duration-300 ease-in-out text-[16px] ${
          isMenuOpen ? "right-0" : "right-[-100vw]"
        }`}
      >
        <header className="h-64px bg-secondary text-primary p-[16px] flex flex-col">
          <div className="justify-items-end">
            <Image
              onClick={toggleMenuOpen}
              src="/images/cross.png"
              alt="close"
              width={14}
              height={14}
            />
          </div>
          <h2 className="font-bold px-[16px] pt-[16px] pb-[8px]">
            Hola,
            <br /> <Link href={PATHS.PROFILE} onClick={() => toggleMenuOpen()}>{userNameData.fullName}</Link>
          </h2>
        </header>
        <nav className="bg-primary h-full p-[16px]">
          <MenuItems />
        </nav>
      </aside>
    </div>
  );
};

export default MobileMenu;
