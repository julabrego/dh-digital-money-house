"use client";

import { useHeadersContext } from "@/contexts/headers.context";
import authAPI from "@/services/auth/auth.api";
import { Account } from "@/types/accout.types";
import { useEffect, useState } from "react";
import DataRow from "./DataRow";

export const AccountData = () => {
  const [accountData, setAccountData] = useState<Account | null>(null);
  const { token } = useHeadersContext();

  useEffect(() => {
    const fetchAccountData = async () => {
      const accountData = token ? await authAPI.getAccountInfo(token) : null;
      setAccountData(accountData);
    };
    fetchAccountData();
  }, [token]);

  if (!accountData) return <>Loading...</>;

  return (
    <>
      <DataRow label={"Alias"} value={accountData.alias} fieldName={"alias"} />
      <div className="border-b-1 border-b-white w-full" />
      <DataRow
        label={"CVU"}
        value={String(accountData.cvu)}
        fieldName="cvu"
        readOnly={true}
      />
    </>
  );
};
