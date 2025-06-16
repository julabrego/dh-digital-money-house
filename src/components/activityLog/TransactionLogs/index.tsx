"use client";
import { Transaction } from "@/types/transaction.types";
import { useState } from "react";
import TransactionLogEntry from "../TransactionLogEntry";

type TransactionLogsProps = {
  transactions: Transaction[];
  filter: string | null;
  limit?: number;
  paginate?: boolean;
  search: string;
};

const TransactionLogs = ({
  transactions,
  limit,
  filter,
  paginate,
  search = "",
}: TransactionLogsProps) => {
  const [page, setPage] = useState(1);

  const filteredTransactions = filterTransactionsByDates(
    transactions.filter((transaction) =>
      transaction.description.toLowerCase().includes(search.toLowerCase())
    ),
    filter
  );

  const limitedTransactions = filteredTransactions
    .slice(
      (page - 1) * (limit || transactions.length),
      page * (limit || transactions.length)
    )
    .sort((a, b) => new Date(b.dated).getTime() - new Date(a.dated).getTime());

  const totalPages = Math.ceil(
    filteredTransactions.length / (limit || filteredTransactions.length)
  );

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  return (
    <>
      {limitedTransactions.map((transaction) => (
        <TransactionLogEntry
          key={transaction.id}
          id={transaction.id}
          status={"success"}
          description={transaction.description}
          amount={transaction.amount}
          dated={transaction.dated}
        />
      ))}
      {paginate && (
        <Pagination
          onPageChange={handlePageChange}
          totalPages={totalPages}
          currentPage={page}
        />
      )}
    </>
  );
};

const Pagination = ({
  totalPages,
  currentPage,
  onPageChange,
}: {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}) => {
  const pages: number[] = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex flex-row justify-center p-[8px] gap-2">
      {pages.map((page) => (
        <p
          className={`p-4 text-[14px] font-semibold hover:bg-gray-200 cursor-pointer ${
            currentPage === page ? "bg-gray-200" : ""
          }`}
          key={`page-${page}`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </p>
      ))}
    </div>
  );
};

function filterTransactionsByDates(
  transactions: Transaction[],
  filterValue: string | null
): Transaction[] {
  const today = new Date();
  const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
  const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
  const last15Days = new Date(today.getTime() - 15 * 24 * 60 * 60 * 1000);
  const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
  const lastYear = new Date(today.getFullYear() - 1, 0, 1);

  switch (filterValue) {
    case "today":
      return transactions.filter(
        (transaction) =>
          new Date(transaction.dated).toDateString() === today.toDateString()
      );
    case "yesterday":
      return transactions.filter(
        (transaction) =>
          new Date(transaction.dated).toDateString() ===
          yesterday.toDateString()
      );
    case "lastWeek":
      return transactions.filter(
        (transaction) => new Date(transaction.dated) >= lastWeek
      );
    case "last15Days":
      return transactions.filter(
        (transaction) => new Date(transaction.dated) >= last15Days
      );
    case "lastMonth":
      return transactions.filter(
        (transaction) => new Date(transaction.dated) >= lastMonth
      );
    case "lastYear":
      return transactions.filter(
        (transaction) => new Date(transaction.dated) >= lastYear
      );
    default:
      return transactions;
  }
}

export default TransactionLogs;
