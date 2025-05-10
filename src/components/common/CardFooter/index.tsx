import Image from "next/image";
import { PropsWithChildren } from "react";
import Typography from "../Typography";

type CardFooterProps = PropsWithChildren & {
  className?: string;
  textClassName?: string;
  onClick?: () => void;
};

const CardFooter = ({
  children,
  className,
  textClassName,
  onClick
}: CardFooterProps) => {
  return (
    <footer className={`pt-[16px] flex flex-row justify-between ${className} cursor-pointer`} onClick={onClick}>
      <Typography type="heading6" className={textClassName}>
        {children}
      </Typography>
      <Image
        src={"/images/right-arrow.png"}
        alt={"Ver toda tu actividad"}
        width={14}
        height={14}
        className="w-[14px] h-[14px]"
      />
    </footer>
  );
};

export default CardFooter;
