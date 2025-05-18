import { splitEveryFour } from "@/app/utils/string-utils";

type CardDrawingProps = {
  numberId?: number;
  name?: string;
  expirationDate?: string;
};

export const CardDrawing = ({
  numberId,
  name,
  expirationDate,
}: CardDrawingProps) => {
    
  const fragmentedNumberId = splitEveryFour(String(numberId ?? "").padEnd(16, "*"));

  return (
    <div className="bg-[#EEEAEA] rounded-[8px] w-[301px] h-[174px] shadow-md relative">
      <div className="bg-[#D9D9D9] rounded-[8px] w-[43px] h-[32px] absolute top-[22px] right-[20px]" />
      <div className="flex flex-col items-center gap-[8px] w-full absolute bottom-[36px] opacity-50">
        <div className="flex justify-between w-[262px]">
          {fragmentedNumberId.map((fragment, index) => (
            <div key={index} className="text-[14px]">
              {fragment.length < 4 ? fragment.padEnd(4, "*") : fragment}
            </div>
          ))}
        </div>
        <div className="flex justify-between w-[262px]">
          <div className="text-[14px] uppercase">
            {name ? name.slice(0, 20) : "Nombre del titular"}
          </div>
          <div className="text-[14px]">
            {expirationDate ? expirationDate : "MM/YY"}
          </div>
        </div>
      </div>
    </div>
  );
};
