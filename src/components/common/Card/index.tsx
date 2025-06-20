import { PropsWithChildren } from "react";

type CardProps = PropsWithChildren & {
  className?: string;
  mode?: "white" | "dark" | "green";
};

const Card = ({ children, mode = "white", className }: CardProps) => {
  let background = "";

  switch (mode) {
    case "dark":
      background = "bg-black text-white";
      break;
    case "green":
      background = "bg-primary text-black";
      break;
    case "white":
    default:
      background = "bg-white text-black";
      break;
  }

  return (
    <div
      className={`rounded-md p-4 text-[16px] shadow-md ${background} ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
