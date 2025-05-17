"use client";

import { copyToClipboard } from "@/app/utils/clipboard";
import Typography from "@/components/common/Typography";
import Image from "next/image";
import { useState } from "react";

export const AccountData = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = (value: string) => {
    copyToClipboard(value)
      ?.then(() => {
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 1000);
      })
      .catch(() => {
        console.error("Error al copiar el texto");
        setIsCopied(false);
      });
  };

  return (
    <article className="grid grid-cols-[1fr_min-content] pb-[16px]">
      <div>
        <Typography type={"heading3"} className="text-primary">
          {label}
        </Typography>
        <Typography type={"text2"} className="font-normal">
          {value}
        </Typography>
      </div>
      <div className="w-[24px] flex items-center relative">
        <>
          {isCopied && (
            <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
              <div className=" text-[12px] bg-black text-primary">Copiado</div>
            </div>
          )}
          <Image
            src={"/images/carbon_copy.svg"}
            alt={"Ver toda tu actividad"}
            width={24}
            height={24}
            className="w-[24px] h-[24px] cursor-pointer"
            onClick={() => handleCopy(value)}
          />
        </>
      </div>
    </article>
  );
};
