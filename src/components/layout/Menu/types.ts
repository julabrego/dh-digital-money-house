import PATHS from "@/config/routing/paths";

export type MenuProps = {
  isOpen: boolean;
  toggleMenuOpen: () => void;
};

export type MenuItemProps = {
  label: string;
  path?: string;
  isSemitransparent?: boolean;
  onClick?: () => void;
};

const { HOME, TRANSACTION_LOG: ACTIVITY_LOG, PROFILE, CHARGE_MONEY, PAY_SERVICES, CARDS } =
  PATHS;

export const MENU_ITEMS = [
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
];
