import { ReactNode } from "react";
import { notFound } from "next/navigation";
import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import DashboardFooter from "@/components/dashboard/DashboardFooter";

import { navigationByRole } from "@/config/navigation";

type Props = {
  children: ReactNode;
  params: Promise<{
    role: string;
  }>;
};

export default async function DashboardRoleLayout({ children, params }: Props) {
  const { role } = await params;

  const validRoles = ["winery", "seller", "client", "owner"];

  if (!validRoles.includes(role)) {
    notFound();
  }

  const navConfig = navigationByRole[role as keyof typeof navigationByRole];

  return (
    <div className="min-h-screen bg-background text-on-background flex flex-col">
      <DashboardNavbar
        links={navConfig.links}
        ctaLabel={navConfig.ctaLabel}
        ctaHref={navConfig.ctaHref}
        showLogout={navConfig.showLogout}
      />

      <main className="flex-1 max-w-7xl mx-auto px-4 py-8 pt-24">
        {children}
      </main>

      <DashboardFooter />
    </div>
  );
}
