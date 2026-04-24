"use client";

import { useEffect, useState } from "react";

import SummaryGrid from "./components/OwnerSummaryGrid";
import Welcome from "./components/OwnerWelcome";
import MainGrid from "./components/OwnerMainGrid";
import Alerts from "./components/OwnerAlerts";
import FloatingButton from "./components/FloatingBottom";

import {
  getDashboardSummary,
  getAlerts,
  getSettlements,
  getTopClients,
  getSellerPerformance,
  DashboardSummary,
  SellerPerformance,
} from "@/lib/api";

type DashboardData = {
  summary: DashboardSummary;
  alerts: {
    pendingOrders: number;
    lowStock: number;
  };
  settlements: {
    winery: string;
    gross: number;
    commission: number;
    iva: number;
    net: number;
  }[];
  clients: {
    name: string;
    total: number;
  }[];
  sellers: SellerPerformance[];
};

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [summary, alerts, settlements, clients, sellers] =
          await Promise.all([
            getDashboardSummary(),
            getAlerts(),
            getSettlements(),
            getTopClients(),
            getSellerPerformance(),
          ]);

        setData({ summary, alerts, settlements, clients, sellers });
      } catch (err) {
        console.error("Error cargando dashboard:", err);
      }
    };

    fetchData();
  }, []);

  if (!data) {
    return <div className="p-8">Cargando dashboard...</div>;
  }

  return (
    <div className="bg-background text-on-surface antialiased pb-24 md:pb-0">
      <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        <Welcome />
        <SummaryGrid data={data.summary} />
        <Alerts data={data.alerts} />
        <MainGrid
          settlements={data.settlements}
          clients={data.clients}
          sellers={data.sellers}
        />
      </main>
      <FloatingButton />
    </div>
  );
}
