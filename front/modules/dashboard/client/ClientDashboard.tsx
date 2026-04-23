import TopBar from "./components/TopBar";
import SideBar from "./components/ClientSideBar";
import WelcomeHeader from "./components/ClientWelcomeHeader";
import AccountSummary from "./components/AccountSummary";
import OrdersSection from "./components/OrdersSection";
import WineriesGrid from "./components/WineriesGrid";
import SupportFooter from "./components/SupportFooter";

export default function ClientDashboard() {
  return (
    <>
      <TopBar />
      <SideBar />

      <main className="ml-64 pt-16 min-h-screen p-8 bg-background">
        <div className="max-w-7xl mx-auto space-y-8">
          <WelcomeHeader />
          <AccountSummary />
          <OrdersSection />
          <WineriesGrid />
          <SupportFooter />
        </div>
      </main>
    </>
  );
}
