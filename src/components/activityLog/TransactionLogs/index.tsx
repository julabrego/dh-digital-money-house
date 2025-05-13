"use client";
import { Transaction } from "@/types/transaction.types";
import TransactionLogEntry from "../TransactionLogEntry";

type TransactionLogsProps = {
  transactions: Transaction[];
  limit?: number;
};

const TransactionLogs = ({ transactions, limit }: TransactionLogsProps) => {
  const limitedTransactions = transactions.slice(
    0,
    limit || transactions.length
  ).sort((a, b) => new Date(b.dated).getTime() - new Date(a.dated).getTime());
  
  return limitedTransactions.map((transaction) => (
    <TransactionLogEntry
      key={transaction.id}
      status={"success"}
      description={transaction.description}
      amount={transaction.amount}
      dated={transaction.dated}
    />
  ));
};

export default TransactionLogs;
