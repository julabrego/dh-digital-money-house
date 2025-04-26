import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import "../globals.css";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="pt-16 pb-16 flex flex-col min-h-screen justify-center items-center">
        <Header mode="login" />
        {children}
        <Footer />
      </body>
    </html>
  );
}
