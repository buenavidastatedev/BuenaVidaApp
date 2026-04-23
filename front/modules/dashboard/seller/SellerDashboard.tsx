import SellerHeader from "./components/SellerHeader";
import CommissionSummary from "./components/CommissionsSummary";
import QuickActions from "./components/QuickActions";
import ClientPortfolio from "./components/ClientPorfolio";
import FollowUpTasks from "./components/FollowUpTasks";
import SalesMetrics from "./components/SalesMetrics";
import SellerBottomNav from "./components/SallerBottomNav";

export default function SellerDashboard() {
  return (
    <div className="bg-background text-on-surface min-h-screen pb-20">
      <SellerHeader />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <section className="lg:col-span-8">
            <CommissionSummary />
          </section>

          <section className="lg:col-span-4">
            <QuickActions />
          </section>

          <section className="lg:col-span-7">
            <ClientPortfolio />
          </section>

          <section className="lg:col-span-5">
            <FollowUpTasks />
          </section>

          <section className="lg:col-span-12">
            <SalesMetrics />
          </section>
        </div>
      </main>

      <SellerBottomNav />
    </div>
  );
}
