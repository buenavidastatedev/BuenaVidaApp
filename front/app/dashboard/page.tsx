import Metrics from "@/components/dashboard/Metrics";
import WarehouseSection from "@/components/dashboard/WarehouseSection";
import TransactionsTable from "@/components/dashboard/TransactionsTables";

export default function DashboardPage() {
  return (
    <>
      <section className="relative z-10 max-w-7xl mx-auto space-y-4 mb-10">
        <h2 className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight">
          Panel Administrativo
        </h2>

        <p className="text-sm text-[#94a3b8] font-medium">
          Una auditoría integral de los movimientos globales de inventario, la
          conciliación fiscal y las métricas de rendimiento de los almacenes
        </p>
      </section>

      <Metrics />
      <WarehouseSection />
      <TransactionsTable />
    </>
  );
}
