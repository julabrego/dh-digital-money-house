import { PropsWithChildren } from "react";

type CardProps = PropsWithChildren & {
  className?: string;
  mode?: "white" | "dark";
};

const Card = ({ children, mode = "white", className }: CardProps) => {
  return (
    <div
      className={`rounded-md p-4 text-[16px] shadow-md ${
        mode === "white" ? "bg-white text-black" : "bg-black text-white"
      } ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
