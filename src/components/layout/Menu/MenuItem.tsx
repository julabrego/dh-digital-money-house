"use client";

import useNavigation from "@/hooks/useNavigation";
import { MenuItemProps } from "./types";

const MenuItem = ({
  label,
  path,
  isSemitransparent,
  onClick,
}: MenuItemProps) => {
  const { goTo, pathName } = useNavigation();

  const handleClick = () => {
    if (onClick) onClick();
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
