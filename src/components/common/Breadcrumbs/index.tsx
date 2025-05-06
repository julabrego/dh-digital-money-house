import React from "react";
import Image from "next/image";

type BreadcrumbsProps = {
  title: string;
};
const Breadcrumbs = ({ title }: BreadcrumbsProps) => {
  return (
    <div className="flex flex-row flex-nowrap items-center gap-[8px] text-[#201F22] text-[16px] underline mb-[8px]">
      <Image
        src={"/images/right-arrow.png"}
        alt={title}
        width={14}
        height={14}
        className="w-[14px] h-[14px]"
      />
      {title}
    </div>
  );
};

export default Breadcrumbs;
