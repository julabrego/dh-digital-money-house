"use client";
import TransactionLogs from "@/components/activityLog/TransactionLogs";
import Card from "@/components/common/Card";
import CardFooter from "@/components/common/CardFooter";
import CardHeader from "@/components/common/CardHeader";
import TextInput from "@/components/common/TextInput";
import PATHS from "@/config/routing/paths";
import { Transaction } from "@/types/transaction.types";
import { FormProvider, useForm } from "react-hook-form";

type HomeActivityLogProps = {
  transactions: Transaction[];
};

const HomeActivityLog = ({ transactions }: HomeActivityLogProps) => {
  const methods = useForm<{ search: string }>({});

  const { watch, register } = methods;

  const searchValue = watch("search");

  return (
    <FormProvider {...methods}>
      <section className="activity_log flex flex-col gap-[16px]">
        <TextInput placeholder="Buscar" {...register("search")} />

        <Card>
          <CardHeader>Tu actividad</CardHeader>

          <TransactionLogs
            transactions={transactions || []}
            limit={10}
            filter={null}
            search={searchValue}
          />

          <CardFooter footerClickPath={PATHS.ACTIVITY}>
            Ver toda tu actividad
          </CardFooter>
        </Card>
      </section>
    </FormProvider>
  );
};

export default HomeActivityLog;
