import Footer from "@/components/layout/Footer";
import AuthenticatedHeaderNavigation from "@/components/layout/Header/AuthenticatedHeaderNavigation";
import GeneralHeader from "@/components/layout/Header/GeneralHeader";
import MainPageNavigationButtons from "@/components/layout/Header/MainPageNavigationButtons";
import DesktopMenu from "@/components/layout/Menu/DesktopMenu";
import MobileMenu from "@/components/layout/Menu/MobileMenu";
import { GlobalContextProvider } from "@/contexts/global.context";
import userApi from "@/services/user/user.api";
import { headers } from "next/headers";
import { GeneralLayoutProps } from "./types";

const GeneralLayout = async ({ children, mode }: GeneralLayoutProps) => {
  const token = (await headers()).get("x-access-token") ?? null;
  const userId = (await headers()).get("x-user-id") ?? null;
  const accountId = (await headers()).get("x-account-id") ?? null;

  const userData =
    userId && token && accountId ? await userApi.getUser(userId, token) : null;

  return !!userData ? (
    <main
      className={`relative pt-16 pb-16 flex flex-col justify-center items-center md:grid md:grid-cols-[222px_1fr]`}
    >
      <GlobalContextProvider
        userData={userData}
        authData={{ token: token ?? "", accountId: accountId ?? "" }}
      >
        <GeneralHeader
          mode={mode}
          menuButtons={<AuthenticatedHeaderNavigation />}
        />
        <MobileMenu />
        <DesktopMenu />
        {children}
        <Footer />
      </GlobalContextProvider>
    </main>
  ) : (
    <main
      className={`relative pt-16 pb-16 flex flex-col justify-center items-center `}
    >
      <GeneralHeader mode={mode} menuButtons={<MainPageNavigationButtons />} />
      {children}
      <Footer />
    </main>
  );
};

export default GeneralLayout;
