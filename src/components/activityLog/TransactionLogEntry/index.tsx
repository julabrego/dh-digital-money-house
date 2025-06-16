import { spanishTextDate } from "@/app/utils/date";
import { formatArgentinePesos } from "@/app/utils/number-utils";
import StatusCircle from "@/components/common/StatusCircle";
import PATHS from "@/config/routing/paths";
import Link from "next/link";

type TransactionLogEntryProps = {
  id: number;
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
  id,
}: TransactionLogEntryProps) => {
  return (
    <Link href={`${PATHS.ACTIVITY}/${id}`}>
      <article className="border-b-1 border-y-gray-400 py-[16px] flex flex-row gap-[12px] items-center">
        <StatusCircle status={status} />
        <div className="grow items-center">{description}</div>
        <div className="flex flex-col">
          <div className="text-[14px] text-right">
            {formatArgentinePesos(amount)}
          </div>
          <div className="text-[12px] text-right text-gray-400">{spanishTextDate(new Date(dated))}</div>
        </div>
      </article>
    </Link>
  );
};

export default TransactionLogEntry;
