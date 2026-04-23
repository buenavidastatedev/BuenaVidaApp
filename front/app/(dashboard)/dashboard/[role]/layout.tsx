import { ReactNode } from "react";
import { notFound } from "next/navigation";
import Navbar from "@/components/landing/Navbar";

import { navigationByRole } from "@/config/navigation";
import Footer from "@/components/layout/Footer";

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
    <div className="min-h-screen flex flex-col">
      {/* NAVBAR */}
      <Navbar
        links={navConfig.links}
        ctaLabel={navConfig.ctaLabel}
        ctaHref={navConfig.ctaHref}
        showLogout={navConfig.showLogout}
      />

      {/* CONTENIDO */}
      <main className="flex-1 max-w-7xl mx-auto px-4 py-8 space-y-8 pt-20">
        {children}
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
