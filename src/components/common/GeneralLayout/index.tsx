import { getHeaderValues } from "@/app/utils/headers";
import Footer from "@/components/layout/Footer";
import AuthenticatedHeaderNavigation from "@/components/layout/Header/AuthenticatedHeaderNavigation";
import GeneralHeader from "@/components/layout/Header/GeneralHeader";
import MainPageNavigationButtons from "@/components/layout/Header/MainPageNavigationButtons";
import DesktopMenu from "@/components/layout/Menu/DesktopMenu";
import MobileMenu from "@/components/layout/Menu/MobileMenu";
import { GeneralLayoutProps } from "./types";
import { HeadersContextProvider } from "@/contexts/headers.context";
import { NavigationMenuContextProvider } from "@/contexts/global.context";

const GeneralLayout = async ({ children, mode }: GeneralLayoutProps) => {
  const headers = await getHeaderValues();
  const { userId } = headers;

  return !!userId ? (
    <main
      className={`relative pt-16 pb-16 flex flex-col justify-center items-center md:grid md:grid-cols-[222px_1fr]`}
    >
      <HeadersContextProvider {...headers}>
        <NavigationMenuContextProvider>
          <GeneralHeader
            mode={mode}
            menuButtons={<AuthenticatedHeaderNavigation />}
          />
          <MobileMenu />
          <DesktopMenu />
          {children}
          <Footer />
        </NavigationMenuContextProvider>
      </HeadersContextProvider>
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
