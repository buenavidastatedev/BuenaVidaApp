type SellerPerformance = {
  name: string;
  percentage: number;
};

type Props = {
  settlements: {
    winery: string;
    gross: number;
    commission: number;
    iva: number;
    net: number;
  }[];
  clients: {
    name: string;
    total: number;
  }[];
  sellers: SellerPerformance[];
};

export default function MainGrid({ settlements, clients, sellers }: Props) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* ================= TABLA ================= */}
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
              {settlements?.length > 0 ? (
                settlements.map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-medium">
                      {row.winery ?? "-"}
                    </td>

                    <td className="px-6 py-4">
                      ${(row.gross ?? 0).toLocaleString()}
                    </td>

                    <td className="px-6 py-4 text-error">
                      -${(row.commission ?? 0).toLocaleString()}
                    </td>

                    <td className="px-6 py-4">
                      ${(row.iva ?? 0).toLocaleString()}
                    </td>

                    <td className="px-6 py-4 font-bold">
                      ${(row.net ?? 0).toLocaleString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-6 text-gray-400">
                    Sin datos disponibles
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ================= SIDEBAR ================= */}
      <div className="space-y-6">
        {/* ===== PARETO ===== */}
        <div className="bg-white p-6 rounded-xl border border-outline-variant shadow-sm">
          <h3 className="font-bold text-lg text-on-surface mb-4">
            Pareto por Vendedor
          </h3>

          <div className="space-y-4">
            {sellers?.length > 0 ? (
              sellers.map((s, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{s.name}</span>
                    <span className="font-bold">{s.percentage ?? 0}%</span>
                  </div>

                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-blue-600 h-full rounded-full"
                      style={{
                        width: `${s.percentage ?? 0}%`,
                      }}
                    />
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-400">Sin datos disponibles</p>
            )}
          </div>
        </div>

        {/* ===== CLIENTES ===== */}
        <div className="bg-white p-6 rounded-xl border border-outline-variant shadow-sm">
          <h3 className="font-bold text-lg text-on-surface mb-4">
            Ranking de Clientes
          </h3>

          <div className="space-y-4">
            {clients?.length > 0 ? (
              clients.map((c, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-xs">
                    {i + 1}
                  </div>

                  <div className="flex-1">
                    <p className="text-sm font-bold truncate">{c.name}</p>
                    <p className="text-[10px] text-on-surface-variant">
                      Compras: ${(c.total ?? 0).toLocaleString()}
                    </p>
                  </div>

                  <span className="material-symbols-outlined text-success text-sm">
                    trending_up
                  </span>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-400">Sin clientes</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
