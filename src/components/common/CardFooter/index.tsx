"use client";

import Image from "next/image";
import Link from "next/link";
import { PropsWithChildren } from "react";
import Typography from "../Typography";

type CardFooterProps = PropsWithChildren & {
  className?: string;
  textClassName?: string;
  footerClickPath?: string;
  arrowColor?: "default" | "black";
};

const CardFooter = ({
  children,
  className,
  textClassName,
  footerClickPath,
  arrowColor,
}: CardFooterProps) => {
  return (
    <Link href={footerClickPath || "#"}>
    <footer
      className={`pt-[16px] flex flex-row justify-between ${className} cursor-pointer`}
    >
        <Typography type="heading6" className={textClassName}>
          {children}
        </Typography>
        <Image
          src={
            arrowColor === "black"
              ? "/images/right-arrow-black.png"
              : "/images/right-arrow.png"
          }
          alt={"Ver toda tu actividad"}
          width={14}
          height={14}
          className="w-[14px] h-[14px]"
        />
    </footer>
      </Link>
  );
};

export default CardFooter;
