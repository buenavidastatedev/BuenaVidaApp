export default function Metrics() {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:border-primary/30 transition-colors group">
        <div className="flex justify-between items-start mb-4">
          <div className="p-2 bg-blue-50 rounded-lg text-primary">
            <span className="material-symbols-outlined" data-icon="warehouse">
              warehouse
            </span>
          </div>
          <span className="text-xs font-bold text-emerald-600 flex items-center bg-emerald-50 px-2 py-0.5 rounded">
            <span
              className="material-symbols-outlined text-xs mr-1"
              data-icon="trending_up"
            >
              trending_up
            </span>
            +2
          </span>
        </div>
        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">
          Bodegas Totales
        </p>
        <p className="text-3xl font-black text-slate-900">14</p>
      </div>

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:border-primary/30 transition-colors">
        <div className="flex justify-between items-start mb-4">
          <div className="p-2 bg-slate-50 rounded-lg text-slate-600">
            <span className="material-symbols-outlined" data-icon="group">
              group
            </span>
          </div>
          <span className="text-xs font-bold text-slate-400 flex items-center bg-slate-50 px-2 py-0.5 rounded">
            0%
          </span>
        </div>
        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">
          Clientes Globales
        </p>
        <p className="text-3xl font-black text-slate-900">1,284</p>
      </div>

      <div className="bg-primary p-6 rounded-xl border border-primary shadow-lg shadow-primary/20 text-white group">
        <div className="flex justify-between items-start mb-4">
          <div className="p-2 bg-white/20 rounded-lg text-white">
            <span className="material-symbols-outlined" data-icon="payments">
              payments
            </span>
          </div>
          <span className="text-xs font-bold text-white flex items-center bg-white/20 px-2 py-0.5 rounded">
            +12.4%
          </span>
        </div>
        <p className="text-[11px] font-bold text-white/80 uppercase tracking-widest mb-1">
          Ventas Totales (YTD)
        </p>
        <p className="text-3xl font-black">2.4M €</p>
        <p className="text-[10px] mt-2 font-medium opacity-80">
          Mensual: 242.900 €
        </p>
      </div>

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:border-primary/30 transition-colors">
        <div className="flex justify-between items-start mb-4">
          <div className="p-2 bg-red-50 rounded-lg text-red-500">
            <span
              className="material-symbols-outlined"
              data-icon="pending_actions"
            >
              pending_actions
            </span>
          </div>
          <span className="text-xs font-bold text-red-600 flex items-center bg-red-50 px-2 py-0.5 rounded">
            8 Urgentes
          </span>
        </div>
        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">
          Pagos Pendientes
        </p>
        <p className="text-3xl font-black text-slate-900">48.120 €</p>
      </div>
    </section>
  );
}
