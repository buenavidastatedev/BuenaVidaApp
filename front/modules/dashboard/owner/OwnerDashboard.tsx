import SummaryGrid from "./components/OwnerSummaryGrid";
import Welcome from "./components/OwnerWelcome";
import MainGrid from "./components/OwnerMainGrid";
import Alerts from "./components/OwnerAlerts";
import FloatingButton from "./components/FloatingBottom";

export default function DashboardPage() {
  return (
    <div className="bg-background text-on-surface antialiased pb-24 md:pb-0">
      <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        <Welcome />
        <SummaryGrid />
        <Alerts />
        <MainGrid />
      </main>
      <FloatingButton />
    </div>
  );
}
