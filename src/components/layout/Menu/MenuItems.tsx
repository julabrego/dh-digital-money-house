"use client";

import PATHS from "@/config/routing/paths";
import MenuItem from "./MenuItem";
import { MENU_ITEMS } from "./types";
import authAPI from "@/services/auth/auth.api";
import { redirect } from "next/navigation";

const MenuItems = () => {
  const handleLogout = async () => {
    await authAPI.logout();
    redirect(PATHS.LOGIN);
  }
  
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
