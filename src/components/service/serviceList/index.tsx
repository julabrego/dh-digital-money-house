"use client";

import StatusCircle from "@/components/common/StatusCircle";
import Typography from "@/components/common/Typography";
import { Service } from "@/types/service.types";
import Link from "next/link";

type ServiceListProps = {
  services: Service[];
  search: string;
};

const ServiceList = ({ services, search = "" }: ServiceListProps) => {
  const filteredServices = services.filter((service) =>
    service.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      {filteredServices.map((service) => (
        <ServiceEntry key={service.id} service={service} />
      ))}
    </>
  );
};

const ServiceEntry = ({ service }: { service: Service }) => {
  return (
    <article className="border-b-1 border-y-gray-400 py-[16px] flex flex-row gap-[12px] items-center">
      <StatusCircle status={"success"} />
      <div className="grow items-center">{service.name}</div>
      <div className="flex flex-col">
        <Link href={`/pay-services/${service.id}`}>
          <Typography type="heading5">Seleccionar</Typography>
        </Link>
      </div>
    </article>
  );
};

export default ServiceList;
