import useNavigation from "@/hooks/useNavigation";
import { MenuItemProps } from "./types";

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

export default MenuItem;
