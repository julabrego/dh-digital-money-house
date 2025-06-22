"use client";
import Card from "@/components/common/Card";
import CardHeader from "@/components/common/CardHeader";
import TextInput from "@/components/common/TextInput";
import { Service } from "@/types/service.types";
import { FormProvider, useForm } from "react-hook-form";
import ServiceList from "../serviceList";

type PayServiceViewProps = {
  services: Service[];
};

const PayServiceView = ({ services }: PayServiceViewProps) => {
  const methods = useForm<{ search: string }>({});
  const { watch, register } = methods;

  const searchValue = watch("search");

  return (
    <FormProvider {...methods}>
      <section className="flex flex-row gap-4 relative">
        <TextInput placeholder="Buscar" {...register("search")} />
      </section>
      <section className="activity_log flex flex-col gap-[16px]">
        <Card>
          <CardHeader>Más recientes</CardHeader>

          <ServiceList services={services} search={searchValue} />
        </Card>
      </section>
    </FormProvider>
  );
};

export default PayServiceView;
