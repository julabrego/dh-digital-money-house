import MenuItems from "./MenuItems";

const DesktopMenu = () => {
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
