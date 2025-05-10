"use client";

import useNavigation from "@/hooks/useNavigation";
import { MenuItemProps } from "./types";

const MenuItem = ({ label, path, isSemitransparent }: MenuItemProps) => {
  const { goTo, pathName } = useNavigation();

  const isActive = path === pathName;

  return (
    <li
      className={`mb-[12px] ${isActive ? "font-bold" : "font-semibold"} ${
        isSemitransparent ? "opacity-50" : ""
      } cursor-pointer`}
      onClick={() => goTo(path)}
    >
      {label}
    </li>
  );
};

export default MenuItem;
