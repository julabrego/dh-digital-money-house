import GeneralLayout from "@/components/common/GeneralLayout";
import "../globals.css";
import MainPageNavigationButtons from "@/components/layout/Header/MainPageNavigationButtons";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <GeneralLayout headerMenuButtons={<MainPageNavigationButtons />}>
      {children}
    </GeneralLayout>
  );
}
