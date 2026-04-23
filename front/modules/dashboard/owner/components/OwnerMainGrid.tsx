export default function MainGrid() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 bg-white rounded-xl border border-outline-variant shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-outline-variant flex justify-between items-center">
          <h3 className="font-bold text-lg text-on-surface">
            Rendiciones a Bodegas
          </h3>
          <span className="text-xs font-medium text-on-surface-variant">
            Últimas 24 horas
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-surface-container-low text-on-surface-variant font-semibold">
              <tr>
                <th className="px-6 py-3">Bodega</th>
                <th className="px-6 py-3">Monto Bruto</th>
                <th className="px-6 py-3">Comisión</th>
                <th className="px-6 py-3">IVA (19%)</th>
                <th className="px-6 py-3">Total Neto</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant">
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-medium">Bodega Central Sur</td>
                <td className="px-6 py-4">$4,500,000</td>
                <td className="px-6 py-4 text-error">-$225,000</td>
                <td className="px-6 py-4">$855,000</td>
                <td className="px-6 py-4 font-bold">$3,420,000</td>
              </tr>
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-medium">Logística Norte</td>
                <td className="px-6 py-4">$2,800,000</td>
                <td className="px-6 py-4 text-error">-$140,000</td>
                <td className="px-6 py-4">$532,000</td>
                <td className="px-6 py-4 font-bold">$2,128,000</td>
              </tr>
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-medium">Distribución Este</td>
                <td className="px-6 py-4">$1,250,000</td>
                <td className="px-6 py-4 text-error">-$62,500</td>
                <td className="px-6 py-4">$237,500</td>
                <td className="px-6 py-4 font-bold">$950,000</td>
              </tr>
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-medium">Express Poniente</td>
                <td className="px-6 py-4">$890,000</td>
                <td className="px-6 py-4 text-error">-$44,500</td>
                <td className="px-6 py-4">$169,100</td>
                <td className="px-6 py-4 font-bold">$676,400</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-white p-6 rounded-xl border border-outline-variant shadow-sm">
          <h3 className="font-bold text-lg text-on-surface mb-4">
            Pareto por Vendedor
          </h3>
          <div className="space-y-4">
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="font-medium">Carlos Ruiz</span>
                <span className="font-bold">42%</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-blue-600 h-full rounded-full"
                  style={{ width: "42%" }}
                ></div>
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="font-medium">Elena Martínez</span>
                <span className="font-bold">35%</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-blue-500 h-full rounded-full"
                  style={{ width: "35%" }}
                ></div>
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="font-medium">Otros (12)</span>
                <span className="font-bold">23%</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-slate-300 h-full rounded-full"
                  style={{ width: "23%" }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-outline-variant shadow-sm">
          <h3 className="font-bold text-lg text-on-surface mb-4">
            Ranking de Clientes
          </h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-xs">
                1
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold truncate">
                  Restaurante El Gourmet
                </p>
                <p className="text-[10px] text-on-surface-variant">
                  Compras: $5.2M
                </p>
              </div>
              <span
                className="material-symbols-outlined text-success text-sm"
                data-icon="trending_up"
              >
                trending_up
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 font-bold text-xs">
                2
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold truncate">
                  Hotel Plaza Central
                </p>
                <p className="text-[10px] text-on-surface-variant">
                  Compras: $3.8M
                </p>
              </div>
              <span
                className="material-symbols-outlined text-slate-400 text-sm"
                data-icon="horizontal_rule"
              >
                horizontal_rule
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 font-bold text-xs">
                3
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold truncate">
                  Distribuidora Hnos. Vega
                </p>
                <p className="text-[10px] text-on-surface-variant">
                  Compras: $2.1M
                </p>
              </div>
              <span
                className="material-symbols-outlined text-error text-sm"
                data-icon="trending_down"
              >
                trending_down
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
