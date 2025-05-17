import StatusCircle from "@/components/common/StatusCircle";

type CardEntryProps = {
  id: number; 
  status: "success" | "pending" | "failed";
  number: number;
};

const CardEntry = ({ id, status = "success", number }: CardEntryProps) => {

  const handleDelete = () => {
    console.log("Eliminar tarjeta", id)
  }

  return (
    <article className="border-b-1 border-y-gray-400 py-[16px] flex flex-row gap-[12px] items-center">
      <StatusCircle status={status} />
      <div className="grow items-center">
        Terminada en {String(number).slice(-4)}
      </div>
      <div className="flex flex-col">
        <div className="text-[14px] text-right font-bold cursor-pointer" onClick={handleDelete}>Eliminar</div>
      </div>
    </article>
  );
};

export default CardEntry;
