import Button from "@/components/common/Button";
import CallToActionRow from "@/components/common/CallToActionRow";
import Card from "@/components/common/Card";
import Typography from "@/components/common/Typography";
import { AccountData } from "@/components/profile/AccountData";
import ProfileData from "@/components/profile/ProfileData";
import PATHS from "@/config/routing/paths";
import { HeadersContextProvider } from "@/contexts/headers.context";
import authAPI from "@/services/auth/auth.api";
import { headers } from "next/headers";
import Image from "next/image";
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
        <section className="call-to-actions">
          <CallToActionRow>
            <Button
              mode="primary"
              size="large"
              className="flex flex-row justify-between items-center p-0"
            >
              <Typography type={"heading4"}>
                Gestioná los medios de pago
              </Typography>
              <Image
                src={"/images/right-arrow-black.png"}
                alt={"Gestioná los medios de pago"}
                width={14}
                height={14}
                className="w-[14px] h-[14px]"
              />
            </Button>
          </CallToActionRow>
        </section>

        <section className="cvu">
          <Card mode="dark">
            <article className="w-full flex flex-row gap-[16px] justify-end mb-[14px]">
              <p className="text-[16px] mb-[8px]">
                Copia tu cvu o alias para ingresar o transferir dinero desde
                otra cuenta
              </p>
            </article>
            <AccountData label={"CVU"} value={"00000000000000000000"} />
            <div className="border-b-1 border-b-white w-full mb-[16px]"></div>
            <AccountData label={"Alias"} value={"estealiasnoexiste"} />
          </Card>
        </section>
      </main>
    </HeadersContextProvider>
  );
};

export default ProfilePage;
