import StatusCircle from "@/components/common/StatusCircle";

type CardEntryProps = {
  id: number;
  number: number;
  onSelectCard: (id: number) => void;
  selected: boolean;
};

const CardOption = ({ id, number, onSelectCard, selected }: CardEntryProps) => {
  return (
    <article
      onClick={() => onSelectCard(id)}
      className="border-b-1 border-y-gray-400 py-[16px] flex flex-row gap-[12px] items-center cursor-pointer"
    >
      <StatusCircle status={"success"} />
      <div className="grow items-center">
        Terminada en {String(number).slice(-4)}
      </div>
      <div className="flex flex-col">
        <div>
          <input readOnly checked={selected} type="radio" />
        </div>
      </div>
    </article>
  );
};

export default CardOption;
