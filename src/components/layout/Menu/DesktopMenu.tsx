"use client";
import useNavigation from "@/hooks/useNavigation";
import MenuItems from "./MenuItems";
import PATHS from "@/config/routing/paths";

const DesktopMenu = () => {
  const { pathName } = useNavigation();

  if (pathName === PATHS.MAIN) return <></>;
  
  return (
    <div className="hidden md:block sticky left-0 top-0 w-full h-screen self-baseline">
      <aside
        className={`absolute left-0 w-full h-screen bg-primary text-background`}
      >
        <nav className="p-[32px] sticky top-[64px]">
          <MenuItems />
        </nav>
      </aside>
    </div>
  );
};

export default DesktopMenu;
