// src/modules/dashboard/seller/components/SalesMetrics.tsx

export default function SalesMetrics() {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-zinc-200">
      <div className="flex justify-between mb-8">
        <div>
          <h2 className="font-bold text-lg">Progreso de Objetivos Mensuales</h2>

          <p className="text-sm text-zinc-500">Octubre 2023</p>
        </div>

        <div className="text-right">
          <p className="text-3xl font-black">72%</p>
          <p className="text-xs text-green-600 font-bold">
            +$1.2M para el objetivo
          </p>
        </div>
      </div>

      <div className="h-24 bg-zinc-100 rounded-lg flex items-end gap-1 px-2">
        {[30, 45, 60, 40, 75, 85, 65, 92].map((h, i) => (
          <div
            key={i}
            className="flex-1 bg-pink-500 rounded-t"
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
    </div>
  );
}
