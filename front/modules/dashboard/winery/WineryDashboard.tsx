import AlertBanner from "./sections/WineryAlertBanner";
import HeaderSection from "./sections/WineryHeaderSection";
import OrdersCard from "./sections/WineryOrdersCards";
import StatsCards from "./sections/WineryStatsCards";
import StockTable from "./sections/WineryStockTable";
import WarehouseStatus from "./sections/WineryWarehouseStatus";

export default function DashboardPage() {
  return (
    <div className="bg-background text-on-background min-h-screen pb-20 md:pb-0">
      <main className="max-w-7xl mx-auto p-4 md:p-8">
        <HeaderSection />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <StatsCards />
          </div>

          <WarehouseStatus />

          <StockTable />

          <div className="md:col-span-5 flex flex-col gap-6">
            <OrdersCard />
            <AlertBanner />
          </div>
        </div>
      </main>
    </div>
  );
}
