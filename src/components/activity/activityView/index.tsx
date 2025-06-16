"use client";
import TransactionLogs from "@/components/activityLog/TransactionLogs";
import Button from "@/components/common/Button";
import Card from "@/components/common/Card";
import CardHeader from "@/components/common/CardHeader";
import TextInput from "@/components/common/TextInput";
import Typography from "@/components/common/Typography";
import { Transaction } from "@/types/transaction.types";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

type ActivityViewProps = {
  transactions: Transaction[];
  limit: number;
};

const ActivityView = ({ transactions, limit }: ActivityViewProps) => {
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

  const methods = useForm<{ search: string }>({});

  const handleFilterChange = (value: string | null) => {
    setSelectedFilter(value);
  };

  const { watch, register } = methods;

  const searchValue = watch("search");

  return (
    <FormProvider {...methods}>
      <section className="flex flex-row gap-4 relative">
        <TextInput placeholder="Buscar" {...register("search")} />
        <div>
          <Button
            mode="primary"
            className="w-[150px]"
            onClick={() => setShowFilters(!showFilters)}
          >
            Filtrar
          </Button>
          {showFilters && (
            <Filters
              selectedFilter={selectedFilter}
              onFilterChange={handleFilterChange}
            />
          )}
        </div>
      </section>
      <section className="activity_log flex flex-col gap-[16px]">
        <Card>
          <CardHeader>Tu actividad</CardHeader>

          <TransactionLogs
            transactions={transactions || []}
            limit={limit}
            filter={selectedFilter}
            paginate
            search={searchValue}
          />
        </Card>
      </section>
    </FormProvider>
  );
};

const Filters = ({
  selectedFilter,
  onFilterChange,
}: {
  selectedFilter: string | null;
  onFilterChange: (value: string | null) => void;
}) => {
  return (
    <div className="absolute right-0 text-[#777575] bg-[#EEEAEA] w-[300px]">
      <header className="grid grid-cols-2 border-b-1 border-b-black px-[16px] py-[8px]">
        <Typography type={"heading6"} className="text-black">
          Período
        </Typography>
        <p
          onClick={() => onFilterChange(null)}
          className="text-right cursor-pointer"
        >
          Borrar filtros
        </p>
      </header>

      <section className="grid grid-cols-[1fr_min-content] px-[16px] py-[8px]">
        {filters.map((filter) => (
          <div
            onClick={() => onFilterChange(filter.value)}
            key={`filter-${filter.value}`}
            className="contents  cursor-pointer"
          >
            <div>{filter.name}</div>
            <div>
              <input readOnly checked={filter.value === selectedFilter} type="radio" />
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

const filters = [
  {
    name: "Hoy",
    value: "today",
  },
  {
    name: "Ayer",
    value: "yesterday",
  },
  {
    name: "Última semana",
    value: "lastWeek",
  },
  {
    name: "Últimos 15 días",
    value: "last15Days",
  },
  {
    name: "Último mes",
    value: "lastMonth",
  },
  {
    name: "Último año",
    value: "lastYear",
  },
  {
    name: "Otro período",
    value: "custom",
  },
];

export default ActivityView;
