"use client";

import { useEffect, useState } from "react";

export default function Header() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <header className="fixed top-0 right-0 left-0 md:left-64 h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 flex justify-between items-center px-6 z-30 shadow-sm">
      <div className="flex items-center gap-4">
        <button className="md:hidden text-slate-600">
          <span className="material-symbols-outlined">menu</span>
        </button>

        <h1 className="text-lg font-bold text-slate-900 md:hidden">
          Buena Vida
        </h1>

        <div className="hidden md:flex items-center gap-2 text-slate-500">
          <span className="text-sm font-medium">Panel de Control</span>
          <span className="material-symbols-outlined text-sm">
            chevron_right
          </span>
          <span className="text-sm font-bold text-primary">Resumen Global</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* 📅 FECHA + ⏰ HORA EN VIVO */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-lg text-slate-600 text-xs font-semibold">
          <span className="material-symbols-outlined text-sm">
            calendar_today
          </span>

          <span>
            {time.toLocaleDateString("es-AR", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </span>

          <span className="text-slate-400">|</span>

          <span>
            {time.toLocaleTimeString("es-AR", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>

        <button className="w-10 h-10 rounded-full flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors">
          <span className="material-symbols-outlined">notifications</span>
        </button>

        <button className="w-10 h-10 rounded-lg bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
          <span className="material-symbols-outlined">add</span>
        </button>
      </div>
    </header>
  );
}
