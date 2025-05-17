"use client";

import useNavigation from "@/hooks/useNavigation";
import { MenuItemProps } from "./types";
import { useNavigationMenuContext } from "@/contexts/global.context";

const MenuItem = ({
  label,
  path,
  isSemitransparent,
  onClick,
}: MenuItemProps) => {
  const { goTo, pathName } = useNavigation();
  const { isMenuOpen, toggleMenuOpen } = useNavigationMenuContext();

  const handleClick = () => {
    if (onClick) onClick();
    if (isMenuOpen) toggleMenuOpen();
    if (path) goTo(path);
  };

  const isActive = path === pathName;

  return (
    <li
      className={`mb-[12px] ${isActive ? "font-bold" : "font-semibold"} ${
        isSemitransparent ? "opacity-50" : ""
      } cursor-pointer`}
      onClick={handleClick}
    >
      {label}
    </li>
  );
};

export default MenuItem;
