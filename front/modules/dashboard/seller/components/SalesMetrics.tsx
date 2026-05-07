"use client";

import { useEffect, useState } from "react";

interface Summary {
  totalSales: number;
  ordersCount: number;
  productsCount: number;
  lowStockCount: number;
  avgOrderValue: number;
  pendingOrders: number;
}

export default function SalesMetrics() {
  const [summary, setSummary] = useState<Summary | null>(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/dashboard/summary`)
      .then((res) => res.json())
      .then((data) => setSummary(data))
      .catch((err) => console.error(err));
  }, []);

  if (!summary) return <div>Cargando...</div>;

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-zinc-200">
      <div className="flex justify-between mb-8">
        <div>
          <h2 className="font-bold text-lg">Métricas de Ventas</h2>
          <p className="text-sm text-zinc-500">Resumen General</p>
        </div>

        <div className="text-right">
          <p className="text-3xl font-black">${summary.totalSales}</p>
          <p className="text-xs text-green-600 font-bold">
            {summary.ordersCount} órdenes
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center">
          <p className="text-2xl font-bold">{summary.productsCount}</p>
          <p className="text-sm text-zinc-500">Productos</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold">{summary.lowStockCount}</p>
          <p className="text-sm text-zinc-500">Stock Bajo</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold">${summary.avgOrderValue}</p>
          <p className="text-sm text-zinc-500">Promedio Orden</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold">{summary.pendingOrders}</p>
          <p className="text-sm text-zinc-500">Órdenes Pendientes</p>
        </div>
      </div>
    </div>
  );
}
