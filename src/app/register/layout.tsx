import GeneralLayout from "@/components/common/GeneralLayout";
import "../globals.css";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <GeneralLayout mode={"light"}>{children}</GeneralLayout>;
}
