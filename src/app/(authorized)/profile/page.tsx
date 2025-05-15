import Button from "@/components/common/Button";
import CallToActionRow from "@/components/common/CallToActionRow";
import Card from "@/components/common/Card";
import Typography from "@/components/common/Typography";
import ProfileData from "@/components/profile/ProfileData";
import PATHS from "@/config/routing/paths";
import { HeadersContextProvider } from "@/contexts/headers.context";
import authAPI from "@/services/auth/auth.api";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const ProfilePage = async () => {
  const token = (await headers()).get("x-access-token") ?? null;
  const userId = (await headers()).get("x-user-id") ?? null;
  const accountId = (await headers()).get("x-account-id") ?? null;

  if (!token || !userId || !accountId) {
    const handleLogout = async () => {
      await authAPI.logout();
      redirect(PATHS.LOGIN);
    };

    return handleLogout();
  }

  return (
    <HeadersContextProvider userId={userId} token={token} accountId={accountId}>
      <main className="main-panel w-full h-full flex flex-col gap-[16px] bg-[#eeeaea] p-[16px]">
        <section className="your_data flex flex-col gap-[16px]">
          <Card className="p-[32px]">
            <Typography type={"heading4"}>Tus datos</Typography>

            <ProfileData />
          </Card>
        </section>
        <section className="summary">
          <Card mode="dark">
            <div className="w-full flex flex-row gap-[16px] justify-end mb-[14px]">
              <p className="text-[12px] hover:underline cursor-pointer">
                Ver tarjetas
              </p>
              <p className="text-[12px] hover:underline cursor-pointer">
                Ver CVU
              </p>
            </div>
            <p className="text-[16px] mb-[8px]">Dinero disponible</p>
            <div className="px-[16px] py-[8px] border border-primary rounded-[100px] w-fit min-w-[100px] text-center">
              <p className="text-[24px] font-semibold">$6.890.534,17</p>
            </div>
          </Card>
        </section>

        <section className="call-to-actions">
          <CallToActionRow>
            <Button mode="primary" size="large">
              Ingresar dinero
            </Button>
            <Button mode="primary" size="large">
              Pago de servicios
            </Button>
          </CallToActionRow>
        </section>
      </main>
    </HeadersContextProvider>
  );
};

export default ProfilePage;
