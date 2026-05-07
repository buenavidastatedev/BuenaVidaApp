import Link from "next/link";

export default function DashboardFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white py-6 shadow-sm">
      <div className="max-w-7xl mx-auto flex flex-col gap-4 px-4 text-slate-600 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold text-on-surface">Buena Vida</p>
          <p className="text-xs text-slate-500">
            Representante comercial exclusivo de bodegas.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 items-center">
          <Link
            href="/dashboard/seller"
            className="text-sm text-pink-600 hover:underline"
          >
            Dashboard vendedor
          </Link>
          <Link
            href="/dashboard/winery"
            className="text-sm text-slate-600 hover:text-pink-600 transition-colors"
          >
            Dashboard bodega
          </Link>
          <Link
            href="/dashboard/client"
            className="text-sm text-slate-600 hover:text-pink-600 transition-colors"
          >
            Dashboard cliente
          </Link>
        </div>
      </div>
    </footer>
  );
}
