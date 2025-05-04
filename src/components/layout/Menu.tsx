import PATHS from "@/config/routing/paths";
import useNavigation from "@/hooks/useNavigation";
import Image from "next/image";

type MenuProps = {
  isOpen: boolean;
  toggleMenuOpen: () => void;
};

const {
  HOME,
  ACTIVITY_LOG,
  PROFILE,
  CHARGE_MONEY,
  PAY_SERVICES,
  CARDS,
  LOGOUT,
} = PATHS;

const menuItems = [
  {
    label: "Inicio",
    path: HOME,
  },
  {
    label: "Actividad",
    path: ACTIVITY_LOG,
  },
  {
    label: "Perfil",
    path: PROFILE,
  },
  {
    label: "Cargar dinero",
    path: CHARGE_MONEY,
  },
  {
    label: "Pagar servicios",
    path: PAY_SERVICES,
  },
  {
    label: "Tarjetas",
    path: CARDS,
  },
  {
    label: "Cerrar sesión",
    path: LOGOUT,
    isSemitransparent: true,
  },
];

const Menu = ({ isOpen, toggleMenuOpen }: MenuProps) => {
  return (
    <div className="fixed top-0 w-full h-screen z-30 contents">
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
            {menuItems.map((item) => (
              <MenuItem key={item.path} {...item} />
            ))}
          </ul>
        </nav>
      </aside>
    </div>
  );
};

type MenuItemProps = {
  label: string;
  path: string;
  isSemitransparent?: boolean;
};
const MenuItem = ({ label, path, isSemitransparent }: MenuItemProps) => {
  const { onGoToLink, pathName } = useNavigation();

  const isActive = path === pathName;

  return (
    <li
      className={`mb-[12px] ${isActive ? "font-bold" : "font-semibold"} ${
        isSemitransparent ? "opacity-50" : ""
      } cursor-pointer`}
      onClick={() => onGoToLink(path)}
    >
      {label}
    </li>
  );
};

export default Menu;
