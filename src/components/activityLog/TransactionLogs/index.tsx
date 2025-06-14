"use client";
import { Transaction } from "@/types/transaction.types";
import { useState } from "react";
import TransactionLogEntry from "../TransactionLogEntry";

type TransactionLogsProps = {
  transactions: Transaction[];
  limit?: number;
  paginate?: boolean;
};

const TransactionLogs = ({
  transactions,
  limit,
  paginate,
}: TransactionLogsProps) => {
  const [page, setPage] = useState(1);

  const limitedTransactions = transactions
    .slice((page - 1) * (limit || transactions.length), page * (limit || transactions.length))
    .sort((a, b) => new Date(b.dated).getTime() - new Date(a.dated).getTime());

  const totalPages = Math.ceil(
    transactions.length / (limit || transactions.length)
  );

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  return (
    <>
      {limitedTransactions.map((transaction) => (
        <TransactionLogEntry
          key={transaction.id}
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

export default TransactionLogs;
