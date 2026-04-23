// AdminRewards.tsx

export default function AdminRewards() {
  return (
    <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm">
      <h2 className="text-lg font-extrabold mb-6 flex items-center gap-2">
        <span className="material-symbols-outlined text-primary">
          military_tech
        </span>
        Premios Administrativos
      </h2>

      <div className="flex gap-4">
        <div className="flex-1 bg-primary-fixed p-4 rounded-xl text-center">
          <p className="text-[10px] text-primary font-bold uppercase mb-2">
            Objetivo Mensual
          </p>

          <p className="text-2xl font-black text-primary">92%</p>

          <div className="w-full bg-white/50 h-1.5 rounded-full mt-2 overflow-hidden">
            <div className="bg-primary h-full w-[92%]"></div>
          </div>

          <p className="text-[10px] text-primary/70 mt-2 font-medium">
            Bono Proyectado: $450.000
          </p>
        </div>

        <div className="flex-1 bg-zinc-50 p-4 rounded-xl text-center border border-zinc-100">
          <p className="text-[10px] text-zinc-500 font-bold uppercase mb-2">
            Eficiencia Cobranza
          </p>

          <p className="text-2xl font-black text-zinc-900">
            8.4
            <span className="text-sm font-normal text-zinc-400">/10</span>
          </p>

          <div className="flex justify-center gap-1 mt-2">
            <span
              className="material-symbols-outlined text-primary text-xs"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              star
            </span>

            <span
              className="material-symbols-outlined text-primary text-xs"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              star
            </span>

            <span
              className="material-symbols-outlined text-primary text-xs"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              star
            </span>

            <span
              className="material-symbols-outlined text-primary text-xs"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              star
            </span>

            <span className="material-symbols-outlined text-zinc-300 text-xs">
              star
            </span>
          </div>

          <p className="text-[10px] text-zinc-500 mt-2 font-medium">
            Cálculo trimestral
          </p>
        </div>
      </div>

      <div className="mt-6">
        <button className="w-full py-2 text-xs font-bold text-zinc-500 border border-zinc-200 rounded-lg hover:bg-zinc-50 transition-colors uppercase tracking-tight">
          Ver política de incentivos
        </button>
      </div>
    </div>
  );
}
