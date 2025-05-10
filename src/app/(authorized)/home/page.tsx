"use client";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import Button from "@/components/common/Button";
import TextInput from "@/components/common/TextInput";
import Card from "@/components/mainPage/Card/indext";
import { FormProvider, useForm } from "react-hook-form";
import Image from "next/image";

const HomePage = () => {
  return (
    <main className="main-panel w-full h-full flex flex-col gap-[16px] bg-[#eeeaea] p-[16px]">
      <Breadcrumbs title="Inicio" />

      <section className="summary bg-[#201F22] text-white p-[16px] rounded-md w-full h-[147px]">
        <div className="w-full flex flex-row gap-[16px] justify-end mb-[14px]">
          <p className="text-[12px] hover:underline cursor-pointer">
            Ver tarjetas
          </p>
          <p className="text-[12px] hover:underline cursor-pointer">Ver CVU</p>
        </div>
        <p className="text-[16px] mb-[8px]">Dinero disponible</p>
        <div className="px-[16px] py-[8px] border border-primary rounded-[100px] w-fit min-w-[100px] text-center">
          <p className="text-[24px] font-semibold">$6.890.534,17</p>
        </div>
      </section>

      <section className="actions flex flex-col gap-[16px]">
        <Button mode="primary" size="large">
          Ingresar dinero
        </Button>
        <Button mode="primary" size="large">
          Pago de servicios
        </Button>
      </section>

      <Filters />

      <Card>
        <header className="pb-[16px] border-b-1 border-y-gray-400">
          <h2 className="text-[16px] font-semibold">Tu actividad</h2>
        </header>
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="border-b-1 border-y-gray-400 py-[16px] flex flex-row gap-[12px] items-center"
          >
            <div className="w-[24px] h-[24px] bg-primary rounded-full"></div>
            <div className="grow items-center">Pago de servicios</div>
            <div className="flex flex-col">
              <div className="text-[14px] text-right">$100</div>
              <div className="text-[12px] text-right text-gray-400">Sábado</div>
            </div>
          </div>
        ))}
        <footer className="pt-[16px] flex flex-row justify-between">
          <h2 className="font-semibold">Ver toda tu actividad</h2>
          <Image
            src={"/images/right-arrow.png"}
            alt={"Ver toda tu actividad"}
            width={14}
            height={14}
            className="w-[14px] h-[14px]"
          />
        </footer>
      </Card>
    </main>
  );
};

const Filters = () => {
  const methods = useForm({});

  return (
    <FormProvider {...methods}>
      <section className="filters">
        <TextInput placeholder="Buscar" name={"search"} />
      </section>
    </FormProvider>
  );
};

export default HomePage;
