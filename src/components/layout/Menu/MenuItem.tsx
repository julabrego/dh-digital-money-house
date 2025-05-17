"use client";
import Link from "next/link";
import { MenuItemProps } from "./types";
import { useNavigationMenuContext } from "@/contexts/global.context";

const MenuItem = ({
  label,
  path,
  isSemitransparent,
  onClick,
}: MenuItemProps) => {
  const { isMenuOpen, toggleMenuOpen } = useNavigationMenuContext();

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
          className={`font-bold cursor-pointer ${
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
        className={`font-bold cursor-pointer ${
          isSemitransparent ? "opacity-50" : ""
        }`}
        onClick={handleClick}
      >
        {label}
      </Link>
    </li>
  );
};

export default MenuItem;
