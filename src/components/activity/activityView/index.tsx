"use client";
import TransactionLogs from "@/components/activityLog/TransactionLogs";
import Button from "@/components/common/Button";
import Card from "@/components/common/Card";
import CardHeader from "@/components/common/CardHeader";
import TextInput from "@/components/common/TextInput";
import { Transaction } from "@/types/transaction.types";
import { FormProvider, useForm } from "react-hook-form";

type ActivityViewProps = {
  transactions: Transaction[];
  limit: number;
};

const ActivityView = ({ transactions, limit }: ActivityViewProps) => {
  const methods = useForm<{ search: string }>({});

  const { watch, register } = methods;

  const searchValue = watch("search");

  return (
    <FormProvider {...methods}>
      <section className="flex flex-row gap-4">
        <TextInput placeholder="Buscar" {...register("search")} />
        <div>
          <Button mode="primary" className="w-[150px]">
            Filtrar
          </Button>
        </div>
      </section>
      <section className="activity_log flex flex-col gap-[16px]">
        <Card>
          <CardHeader>Tu actividad</CardHeader>

          <TransactionLogs
            transactions={transactions || []}
            limit={limit}
            paginate
            search={searchValue}
          />
        </Card>
      </section>
    </FormProvider>
  );
};

export default ActivityView;
