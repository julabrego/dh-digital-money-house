"use client";
import { splitEveryFour } from "@/app/utils/string-utils";
import { useNewCardContext } from "@/contexts/newCard.context";
import Image from "next/image";

export const CardDrawing = () => {
  const { newCardContextState } = useNewCardContext();
  const { cardHolderName, numberId, expirationDate } = newCardContextState;

  const fragmentedNumberId = splitEveryFour(
    String(numberId ?? "").padEnd(16, "*")
  );

  const cardProvider = determineCardProvider(String(numberId ?? ""));

  return (
    <div
      className={`${
        cardProvider ? "bg-[#201F22]" : "bg-[#EEEAEA]"
      } rounded-[8px] w-[301px] h-[174px] shadow-md relative`}
    >
      <div
        className={`${
          cardProvider ? "bg-[#201F22]" : "bg-[#D9D9D9]"
        } rounded-[8px] w-[43px] h-[32px] absolute top-[22px] right-[20px]`}
      >
        {cardProvider && (
          <Image
            src={`/images/logo-${cardProvider}.png`}
            alt={cardProvider}
            layout="fill"
            objectFit={"contain"}
            className="w-[38px] p-[4px]"
          />
        )}
      </div>
      <div className="flex flex-col items-center gap-[8px] w-full absolute bottom-[36px]">
        <div className="flex justify-between w-[262px]">
          {fragmentedNumberId.map((fragment, index) => (
            <div
              key={index}
              className={`text-[14px] ${
                cardProvider ? "text-white" : "text-black opacity-50"
              }`}
            >
              {fragment.length < 4 ? fragment.padEnd(4, "*") : fragment}
            </div>
          ))}
        </div>
        <div className="flex justify-between w-[262px]">
          <div
            className={`text-[14px] uppercase  ${
              cardProvider ? "text-white" : "text-black opacity-50"
            }`}
          >
            {cardHolderName
              ? cardHolderName.slice(0, 20)
              : "Nombre del titular"}
          </div>
          <div
            className={`text-[14px] ${
              cardProvider ? "text-white" : "text-black opacity-50"
            }`}
          >
            {expirationDate ? expirationDate : "MM/YY"}
          </div>
        </div>
      </div>
    </div>
  );
};

function determineCardProvider(numberId: string) {
  if (
    numberId.startsWith("51") ||
    numberId.startsWith("52") ||
    numberId.startsWith("53") ||
    numberId.startsWith("54") ||
    numberId.startsWith("55")
  ) {
    return "mastercard";
  }
  if (numberId.startsWith("34") || numberId.startsWith("37")) {
    return "amex";
  }
  if (numberId.startsWith("4")) {
    return "visa";
  }
  if (
    numberId.startsWith("5018") ||
    numberId.startsWith("5020") ||
    numberId.startsWith("5038") ||
    numberId.startsWith("6304") ||
    numberId.startsWith("6759") ||
    numberId.startsWith("6761") ||
    numberId.startsWith("6762") ||
    numberId.startsWith("6763")
  ) {
    return "diners";
  }
  return null;
}
