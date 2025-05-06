import React, { PropsWithChildren } from "react";

type CardProps = PropsWithChildren;
const Card = ({ children }: CardProps) => {
  return (
    <div className="bg-white text-black rounded-md p-4 text-[16px] shadow-md">
      {children}
    </div>
  );
};

export default Card;
