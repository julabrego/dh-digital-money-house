"use client";

import { copyToClipboard } from "@/app/utils/clipboard";
import { EditableInput } from "@/components/common/form/EditableInput";
import Typography from "@/components/common/Typography";
import { useHeadersContext } from "@/contexts/headers.context";
import AccountDataSchema from "@/schemas/accountData.schema";
import authService from "@/services/auth/auth.service";
import { Account } from "@/types/accout.types";
import Image from "next/image";
import { useRef, useState } from "react";

const DataRow = ({ label, fieldName, value, readOnly }: DataRowProps) => {
  const [editMode, setEditMode] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [internalValue, setInternalValue] = useState(value);
  const { token, accountId } = useHeadersContext();

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = async () => {
    return authService
      .updateAccount(
        accountId!,
        {
          [fieldName]: inputRef.current?.value,
        },
        token!
      )
      .then((newValue) => {
        setInternalValue(String(newValue[fieldName as keyof Account]) ?? value);
      });
  };

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
    <article className="account-data-container grid grid-cols-[1fr_min-content] pb-[16px]">
      <div onClick={() => !readOnly && setEditMode(true)}>
        <Typography type={"heading3"} className="text-primary">
          {label}
        </Typography>
        {!readOnly && editMode ? (
          <EditableInput
            inputRef={inputRef}
            fieldName={fieldName}
            value={internalValue}
            onBlur={() => setEditMode(false)}
            label={label}
            onSubmit={handleSubmit}
            className="bg-none"
            validationSchema={AccountDataSchema}
          />
        ) : (
          <Typography type={"text2"} className="font-normal">
            {internalValue}
          </Typography>
        )}
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
            onClick={() => handleCopy(internalValue)}
          />
        </>
      </div>
    </article>
  );
};

type DataRowProps = {
  label: string;
  fieldName: keyof Account;
  value: string;
  readOnly?: boolean;
};

export default DataRow;
