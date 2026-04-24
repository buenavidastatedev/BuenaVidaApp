"use client";

import { DashboardSummary } from "@/lib/api";

type Props = {
  data: DashboardSummary;
};

export default function SummaryGrid({ data }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {/* Ventas */}
      <div className="md:col-span-2 bg-white p-6 rounded-xl border shadow-sm flex flex-col justify-between">
        <div>
          <p className="text-sm font-medium text-on-surface-variant">
            Ventas Totales
          </p>

          <h2 className="text-4xl font-black mt-2 text-blue-900">
            ${data.totalSales.toLocaleString()}
          </h2>
        </div>

        <div className="mt-4 text-sm text-gray-500">
          Promedio por orden: ${data.avgOrderValue?.toFixed(2) ?? "0.00"}
        </div>
      </div>

      {/* Órdenes */}
      <div className="bg-white p-6 rounded-xl border shadow-sm">
        <p className="text-sm font-medium text-on-surface-variant mb-4">
          Órdenes
        </p>

        <div className="text-3xl font-bold">{data.ordersCount}</div>

        <p className="text-xs text-gray-500 mt-2">
          Pendientes: {data.pendingOrders}
        </p>
      </div>

      {/* Productos */}
      <div className="bg-blue-600 p-6 rounded-xl text-white">
        <p className="text-sm opacity-80">Productos</p>

        <h2 className="text-3xl font-bold mt-2">{data.productsCount}</h2>

        <p className="text-xs mt-2 opacity-70">
          Stock crítico: {data.lowStockCount}
        </p>
      </div>
    </div>
  );
}
