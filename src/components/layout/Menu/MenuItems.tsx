"use client";

import PATHS from "@/config/routing/paths";
import { useGlobalContext } from "@/contexts/global.context";
import MenuItem from "./MenuItem";
import { MENU_ITEMS } from "./types";

const MenuItems = () => {
  const { handleLogout } = useGlobalContext();
  return (
    <ul>
      {MENU_ITEMS.map((item) => (
        <MenuItem key={item.path} {...item} />
      ))}
      <MenuItem
        key={"logout"}
        path={PATHS.MAIN}
        label="Cerrar sesión"
        isSemitransparent
        onClick={handleLogout}
      />
    </ul>
  );
};

export default MenuItems;
