import { formatArgentinePesos } from "@/app/utils/number-utils";
import StatusCircle from "@/components/common/StatusCircle";

type TransactionLogEntryProps = {
  status: "success" | "pending" | "failed";
  description: string;
  amount: number;
  dated: string;
};

const TransactionLogEntry = ({
  status = "success",
  description,
  amount,
  dated,
}: TransactionLogEntryProps) => {
  return (
    <article className="border-b-1 border-y-gray-400 py-[16px] flex flex-row gap-[12px] items-center">
      <StatusCircle status={status} />
      <div className="grow items-center">{description}</div>
      <div className="flex flex-col">
        <div className="text-[14px] text-right">{formatArgentinePesos(amount)}</div>
        <div className="text-[12px] text-right text-gray-400">{dated}</div>
      </div>
    </article>
  );
};

export default TransactionLogEntry;
