import Image from "next/image";
import MenuItem from "./MenuItem";
import { MENU_ITEMS, MenuProps } from "./types";

const MobileMenu = ({ isOpen, toggleMenuOpen }: MenuProps) => {
  return (
    <div className="md:hidden fixed top-0 w-full h-screen z-30 contents">
      {isOpen && (
        <div
          className={`fixed top-0 w-full h-screen z-20 bg-black opacity-50`}
          onClick={toggleMenuOpen}
        />
      )}
      <aside
        className={`fixed top-0 w-[219px] h-screen z-30 bg-white text-black transition-[right] delay-150 duration-300 ease-in-out text-[16px] ${
          isOpen ? "right-0" : "right-[-100vw]"
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
            <br /> Juan Perez
          </h2>
        </header>
        <nav className="bg-primary h-full p-[16px]">
          <ul>
            {MENU_ITEMS.map((item) => (
              <MenuItem key={item.path} {...item} />
            ))}
          </ul>
        </nav>
      </aside>
    </div>
  );
};

export default MobileMenu;
