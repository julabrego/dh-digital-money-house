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
  const [selectedTransactionType, setSelectedTransactionType] = useState<
    string
  >("all");
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

  const methods = useForm<{ search: string }>({});

  const handleFilterChange = (value: {
    date: string | null;
    type: string;
  }) => {
    setShowFilters(false);
    setSelectedFilter(value.date);
    setSelectedTransactionType(value.type);
    console.log({ value });
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
              selectedTrsansactionType={selectedTransactionType}
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
            filterType={selectedTransactionType}
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
  selectedTrsansactionType,
}: {
  selectedFilter: string | null;
  selectedTrsansactionType: string;
  onFilterChange: (value: { date: string | null; type: string }) => void;
}) => {
  const [internalFilter, setInternalFilter] = useState<string | null>(
    selectedFilter
  );
  const [internalTransactionType, setInternalTransactionType] = useState<
    string 
  >(selectedTrsansactionType || "all");

  const onSelectTransactionType = (value: string) => {
    setInternalTransactionType(value);
  };

  const onSelectFilter = (value: string | null) => {
    setInternalFilter(value);
  };

  const handleApplyFilter = () => {
    onFilterChange({ date: internalFilter, type: internalTransactionType });
  };

  const handleResetFilters = () => {
    onSelectFilter(null);
    onSelectTransactionType("all");
  };

  return (
    <div className="filter-selector absolute right-0 text-[#777575] bg-[#EEEAEA] w-[300px]">
      <header className="grid grid-cols-2 border-b-1 border-b-black px-[16px] py-[8px]">
        <Typography type={"heading6"} className="text-black">
          Período
        </Typography>
        <p onClick={handleResetFilters} className="text-right cursor-pointer">
          Borrar filtros
        </p>
      </header>

      <section className="grid grid-cols-[1fr_min-content] px-[16px] py-[8px] gap-[8px]">
        <>
          {transaction_type_filtes.map((filter) => (
            <div
              onClick={() => onSelectTransactionType(filter.value)}
              key={`filter-${filter.value}`}
              className="contents  cursor-pointer"
            >
              <div>{filter.name}</div>
              <div>
                <input
                  readOnly
                  checked={filter.value === internalTransactionType}
                  type="radio"
                />
              </div>
            </div>
          ))}
          <div className="col-span-2 border-b-1 border-b-black" />
          {filters.map((filter) => (
            <div
              onClick={() => onSelectFilter(filter.value)}
              key={`filter-${filter.value}`}
              className="contents  cursor-pointer"
            >
              <div>{filter.name}</div>
              <div>
                <input
                  readOnly
                  checked={filter.value === internalFilter}
                  type="radio"
                />
              </div>
            </div>
          ))}
        </>
        <Button
          onClick={handleApplyFilter}
          size="small"
          className="col-span-2 w-full"
        >
          Aplicar
        </Button>
      </section>
    </div>
  );
};

const transaction_type_filtes = [
  {
    name: "Todos",
    value: "all",
  },
  {
    name: "Ingresos",
    value: "Deposit",
  },
  {
    name: "Egresos",
    value: "Transaction",
  },
];

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
];

export default ActivityView;
