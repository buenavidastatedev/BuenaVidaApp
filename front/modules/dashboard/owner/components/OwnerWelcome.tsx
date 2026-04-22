export default function Welcome() {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
      <div>
        <h1 className="text-3xl font-extrabold text-on-surface tracking-tight">
          Panel Administrativo
        </h1>
        <p className="text-on-surface-variant">
          Bienvenido de nuevo, Gerente. Aquí está el balance operativo de hoy.
        </p>
      </div>
      <div className="flex gap-2">
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-outline-variant rounded-lg text-on-surface hover:bg-surface-container-low transition-all">
          <span className="material-symbols-outlined text-sm">
            calendar_today
          </span>
          <span>Octubre 2023</span>
        </button>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-on-primary rounded-lg shadow-lg active:opacity-80 transition-opacity">
          <span className="material-symbols-outlined text-sm">download</span>
          <span>Reporte PDF</span>
        </button>
      </div>
    </div>
  );
}
