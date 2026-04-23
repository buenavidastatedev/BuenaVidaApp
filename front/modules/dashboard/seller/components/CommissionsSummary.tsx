// src/modules/dashboard/seller/components/CommissionSummary.tsx

export default function CommissionSummary() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-zinc-200 h-full">
      <div className="flex justify-between items-start mb-6">
        <div>
          <p className="text-xs uppercase tracking-widest text-zinc-500 font-bold">
            Resumen de Comisiones
          </p>

          <h2 className="text-3xl font-black text-pink-600">$452.840</h2>
        </div>

        <div className="flex gap-2">
          <button className="p-2 rounded-lg bg-zinc-100">
            <span className="material-symbols-outlined text-[20px]">
              download
            </span>
          </button>

          <button className="p-2 rounded-lg bg-zinc-100">
            <span className="material-symbols-outlined text-[20px]">
              filter_list
            </span>
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {[
          ["LUPA", "$185.300", "65%"],
          ["Albaflor", "$142.540", "45%"],
          ["Domiciano", "$125.000", "35%"],
        ].map(([name, value, width]) => (
          <div
            key={name}
            className="bg-zinc-50 rounded-lg p-4 border-l-4 border-pink-500"
          >
            <p className="text-xs text-zinc-500 font-semibold">{name}</p>
            <p className="text-lg font-bold">{value}</p>

            <div className="w-full h-1 bg-zinc-200 mt-2 rounded-full overflow-hidden">
              <div className="h-full bg-pink-500" style={{ width }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
