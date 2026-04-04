export default function TransactionsTable() {
  return (
    <section>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h3 className="text-xl font-extrabold text-primary">
          Ventas Recientes
        </h3>
        <div className="flex bg-slate-100 p-1 rounded-lg w-full sm:w-auto">
          <button className="flex-1 sm:flex-none px-4 py-1.5 text-xs font-bold bg-white text-primary shadow-sm rounded-md transition-all">
            TODAS
          </button>
          <button className="flex-1 sm:flex-none px-4 py-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors">
            PENDIENTES
          </button>
        </div>
      </div>
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500">
                  Fecha
                </th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500">
                  Referencia
                </th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500">
                  Ubicación
                </th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500">
                  Agente
                </th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500 text-right">
                  Monto
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 text-sm text-slate-600">
                  24 oct, 2023
                </td>
                <td className="px-6 py-4 text-sm font-bold text-slate-900">
                  ORD-22941-X
                </td>
                <td className="px-6 py-4 text-sm text-slate-500">
                  Cavas Oak Ridge
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">
                  Marcus Vane
                </td>
                <td className="px-6 py-4 text-right font-black text-slate-900">
                  12.450,00 €
                </td>
              </tr>
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 text-sm text-slate-600">
                  23 oct, 2023
                </td>
                <td className="px-6 py-4 text-sm font-bold text-slate-900">
                  ORD-22940-A
                </td>
                <td className="px-6 py-4 text-sm text-slate-500">
                  Depósito Saint-Émilion
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">
                  Eliza Thorne
                </td>
                <td className="px-6 py-4 text-right font-black text-slate-900">
                  8.120,00 €
                </td>
              </tr>
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 text-sm text-slate-600">
                  23 oct, 2023
                </td>
                <td className="px-6 py-4 text-sm font-bold text-slate-900">
                  ORD-22938-P
                </td>
                <td className="px-6 py-4 text-sm text-slate-500">
                  Reserva Chianti
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">
                  Julian Rossi
                </td>
                <td className="px-6 py-4 text-right font-black text-slate-900">
                  24.900,00 €
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex justify-center mt-6">
        <button className="bg-white text-slate-700 px-6 py-2.5 rounded-lg font-bold text-xs uppercase tracking-widest hover:bg-slate-50 border border-slate-200 transition-all shadow-sm">
          Ver Libro Histórico
        </button>
      </div>
    </section>
  );
}
