import { PropsWithChildren } from "react";

type CallToActionRowProps = PropsWithChildren;

const CallToActionRow = ({ children }: CallToActionRowProps) => {
  return (
    <div className="actions flex flex-col lg:flex-row gap-[16px]">
      {children}
    </div>
  );
};

export default CallToActionRow;
