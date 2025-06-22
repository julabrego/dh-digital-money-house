import PaySelectedServiceView from "@/components/service/paySelectedServiceView";
import serviceApi from "@/services/service/service.api";

const ChargeMoneyPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const selectedServiceData = await serviceApi.getService(id);

  return (
    <main className="h-full gap-[16px] bg-[#eeeaea] p-[16px]">
      <PaySelectedServiceView service={selectedServiceData} />
    </main>
  );
};

export default ChargeMoneyPage;
