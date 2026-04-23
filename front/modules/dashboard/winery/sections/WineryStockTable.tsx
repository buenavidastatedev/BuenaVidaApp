import Image from "next/image";

export default function StockTable() {
  return (
    <div className="md:col-span-7 bg-white rounded-2xl border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm">
      <div className="p-6 border-b border-slate-50 dark:border-slate-800 flex justify-between items-center">
        <h3 className="text-xl font-bold flex items-center gap-2">
          <span className="material-symbols-outlined text-blue-600">
            inventory_2
          </span>
          Stock en Depósito Central
        </h3>
        <span className="px-3 py-1 bg-error/10 text-error text-xs font-bold rounded-full">
          2 Alertas Críticas
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-secondary text-xs uppercase tracking-wider">
              <th className="px-6 py-4 font-semibold">Etiqueta / Producto</th>
              <th className="px-6 py-4 font-semibold text-center">Stock</th>
              <th className="px-6 py-4 font-semibold">Estado</th>
              <th className="px-6 py-4 font-semibold text-right">Acción</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
            {/* ROW 1 */}
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-12 bg-slate-100 rounded-md overflow-hidden shrink-0 relative">
                    <Image
                      src="/buenavida.png"
                      alt=""
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-bold text-on-surface">
                      Malbec Reserva 2021
                    </p>
                    <p className="text-xs text-secondary">Tinto Premium</p>
                  </div>
                </div>
              </td>

              <td className="px-6 py-4 text-center font-semibold">142</td>

              <td className="px-6 py-4">
                <span className="px-2 py-1 bg-success/10 text-success text-[10px] font-bold rounded uppercase">
                  Saludable
                </span>
              </td>

              <td className="px-6 py-4 text-right">
                <button className="text-blue-600 hover:underline text-sm font-medium">
                  Editar
                </button>
              </td>
            </tr>

            {/* ROW 2 */}
            <tr className="bg-error/5 hover:bg-error/10 transition-colors">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-12 bg-slate-100 rounded-md overflow-hidden shrink-0 relative">
                    <Image
                      src="/buenavida.png"
                      alt=""
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-bold text-on-surface">Chardonnay Oak</p>
                    <p className="text-xs text-secondary">Blanco Roble</p>
                  </div>
                </div>
              </td>

              <td className="px-6 py-4 text-center font-bold text-error">12</td>

              <td className="px-6 py-4">
                <span className="px-2 py-1 bg-error/20 text-error text-[10px] font-bold rounded uppercase">
                  Stock Mínimo
                </span>
              </td>

              <td className="px-6 py-4 text-right">
                <button className="bg-error text-white px-3 py-1 rounded-lg text-xs font-bold hover:opacity-90">
                  Reponer
                </button>
              </td>
            </tr>

            {/* ROW 3 */}
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-12 bg-slate-100 rounded-md overflow-hidden shrink-0 relative">
                    <Image
                      src="/buenavida.png"
                      alt=""
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-bold text-on-surface">
                      Rosé de Provence
                    </p>
                    <p className="text-xs text-secondary">Rosado</p>
                  </div>
                </div>
              </td>

              <td className="px-6 py-4 text-center font-semibold">58</td>

              <td className="px-6 py-4">
                <span className="px-2 py-1 bg-warning/10 text-warning text-[10px] font-bold rounded uppercase">
                  Próximo a Mín.
                </span>
              </td>

              <td className="px-6 py-4 text-right">
                <button className="text-blue-600 hover:underline text-sm font-medium">
                  Editar
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
