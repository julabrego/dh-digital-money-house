"use client";
import Link from "next/link";
import { MenuItemProps } from "./types";
import { useNavigationMenuContext } from "@/contexts/navigationMenu.context";
import useNavigation from "@/hooks/useNavigation";

const MenuItem = ({
  label,
  path,
  isSemitransparent,
  onClick,
}: MenuItemProps) => {
  const { isMenuOpen, toggleMenuOpen } = useNavigationMenuContext();
  const { pathName } = useNavigation();

  const handleClick = () => {
    if (onClick) onClick();
    if (isMenuOpen) toggleMenuOpen();
  };

  if (!path) {
    return (
      <li
        className={`mb-[12px] ${
          isSemitransparent ? "opacity-50" : ""
        } cursor-pointer`}
      >
        <a
          className={`cursor-pointer ${
            isSemitransparent ? "opacity-50" : ""
          }`}
          onClick={handleClick}
        >
          {label}
        </a>
      </li>
    );
  }

  return (
    <li
      className={`mb-[12px] ${
        isSemitransparent ? "opacity-50" : ""
      } cursor-pointer`}
    >
      <Link
        href={path}
        className={`cursor-pointer ${
          isSemitransparent ? "opacity-50" : ""
        } ${pathName.startsWith(path) ? "font-bold" : ""}`}
        onClick={handleClick}
      >
        {label}
      </Link>
    </li>
  );
};

export default MenuItem;
