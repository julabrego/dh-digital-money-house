import GeneralLayout from "@/components/common/GeneralLayout";
import "../globals.css";
import RegisterPageNavigationButtons from "@/components/layout/Header/RegisterPageNavigationButtons";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <GeneralLayout
      mode={"light"}
      headerMenuButtons={<RegisterPageNavigationButtons />}
    >
      {children}
    </GeneralLayout>
  );
}
