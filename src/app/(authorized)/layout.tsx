import AuthorizedLayout from "@/components/layout/AuthorizedLayout";
import "../globals.css";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AuthorizedLayout>{children}</AuthorizedLayout>;
}
