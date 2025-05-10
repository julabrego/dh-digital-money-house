import { PropsWithChildren } from "react";
import Typography from "../Typography";

type CardHeaderProps = PropsWithChildren & {
  className?: string;
  textClassName?: string;
};

const CardHeader = ({
  children,
  className,
  textClassName,
}: CardHeaderProps) => {
  return (
    <header className={`pb-[16px] border-b-1 border-y-gray-400 ${className}`}>
      <Typography type="heading6" className={textClassName}>
        {children}
      </Typography>
    </header>
  );
};

export default CardHeader;
