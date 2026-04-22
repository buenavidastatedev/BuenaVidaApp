import { notFound } from "next/navigation";
import { JSX } from "react/jsx-dev-runtime";
import WineryDashboard from "@/modules/dashboard/winery/WineryDashboard";
import SellerDashboard from "@/modules/dashboard/seller/SellerDashboard";
import ClientDashboard from "@/modules/dashboard/client/ClientDashboard";
import OwnerDashboardPage from "@/modules/dashboard/owner/OwnerDashboard";

type Role = "winery" | "seller" | "owner" | "client";

type Props = {
  params: Promise<{
    role: string;
  }>;
};

const dashboards: Record<Role, JSX.Element> = {
  winery: <WineryDashboard />,
  seller: <SellerDashboard />,
  owner: <OwnerDashboardPage />,
  client: <ClientDashboard />,
};

export default async function DashboardRolePage({ params }: Props) {
  const { role } = await params;

  if (!Object.hasOwn(dashboards, role)) {
    notFound();
  }

  return dashboards[role as Role];
}
