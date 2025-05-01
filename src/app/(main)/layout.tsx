import GeneralLayout from "@/components/common/Layout";
import "../globals.css";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <GeneralLayout>{children}</GeneralLayout>;
}
