import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />

      <div className="flex-1 ml-64 flex flex-col">
        <Header />
        <main className="flex-1 p-10 bg-background pt-24">{children}</main>
        <Footer />
      </div>
    </div>
  );
}
