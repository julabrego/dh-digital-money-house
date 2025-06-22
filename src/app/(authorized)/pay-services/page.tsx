import PayServiceView from "@/components/service/payServicesView";
import serviceApi from "@/services/service/service.api";

const PayServicesPage = async () => {
  const services = await serviceApi.getServices();

  return (
    <main className="main-panel h-full flex flex-col gap-[16px] bg-[#eeeaea] p-[16px]">
      <PayServiceView services={services || []} />
    </main>
  );
};

export default PayServicesPage;
