import GeneralLayout from "@/components/common/GeneralLayout";
import "../globals.css";

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <GeneralLayout>{children}</GeneralLayout>;
}
