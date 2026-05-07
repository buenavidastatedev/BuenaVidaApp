"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { logoutRequest } from "@/lib/api";

type NavLink = {
  label: string;
  href: string;
};

type Props = {
  links: NavLink[];
  ctaLabel: string;
  ctaHref: string;
  showLogout?: boolean;
};

export default function DashboardNavbar({
  links,
  ctaLabel,
  ctaHref,
  showLogout = false,
}: Props) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logoutRequest();
    } catch (e) {
      console.error(e, "Logout failed");
    }

    router.push("/");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-slate-200 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 px-4 py-3">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-blue-800 text-3xl">
            wine_bar
          </span>
          <div>
            <p className="text-sm font-semibold text-blue-800">Buena Vida</p>
            <p className="text-xs text-slate-500">Panel de control</p>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-4">
          {links.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              className={
                index === 0
                  ? "text-sm font-semibold text-pink-600 border-b-2 border-pink-600 pb-0.5"
                  : "text-sm font-medium text-slate-600 hover:text-pink-600 transition-colors"
              }
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href={ctaHref}
            className="hidden md:inline-flex items-center gap-2 bg-pink-600 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-pink-700 transition"
          >
            {ctaLabel}
          </Link>

          <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-surface-container-high border border-surface-variant">
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-700">
              <span className="material-symbols-outlined">person</span>
            </div>
            <div className="hidden sm:block">
              <p className="text-xs text-slate-500">Vendedor</p>
              <p className="text-sm font-semibold text-on-surface">
                Marcos Paz
              </p>
            </div>
          </div>

          {showLogout && (
            <button
              onClick={handleLogout}
              className="hidden md:inline text-sm font-medium text-slate-500 hover:text-red-500 transition-colors"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
