export default function OrdersCard() {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-300 dark:border-slate-500 shadow-md flex-1">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold flex items-center gap-2">
          <span className="material-symbols-outlined text-blue-600">
            local_shipping
          </span>
          Mis Pedidos LT
        </h3>
        <a className="text-blue-600 text-sm font-bold hover:underline" href="#">
          Ver todos
        </a>
      </div>

      <div className="space-y-4">
        {/* ITEM 1 */}
        <div className="group p-4 bg-slate-50 dark:bg-slate-300/50 rounded-xl hover:ring-2 hover:ring-primary/20 transition-all cursor-pointer">
          <div className="flex justify-between items-start">
            <div>
              <p className="font-bold text-sm">Pedido #LT-9402</p>
              <p className="text-xs text-secondary">
                24 Botellas • Asignado por BV
              </p>
            </div>
            <span className="bg-primary/10 text-primary text-[10px] font-black px-2 py-1 rounded">
              EN CAMINO
            </span>
          </div>

          <div className="mt-4 flex items-center gap-2">
            <div className="flex -space-x-2">
              <div className="w-6 h-6 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCtP4Tw-cA0ZVg3iqSuY8j8e8QvjaEr8R7_LgFuxXCUxRHd_PDg1dBDPXi7O7sw2AQQ4AxvYJorGIwqSYRVFV2AViQYo0RaGBat_K7d-XnID4SOWToAIX_QzOVwF2AG4d6Vh7H9mPIMY0tE0VyrK9zfAistKeqUXtd8C9vu4YAuZyJn_MBB-AT01WZyAMmJXUd4RJOKOOM-eQbjw3-7ZIA-TXpNWwbIBCAT3SCQnzvcE5bOycmL7gQNQnR8GMJ7fEMYeQnhUJ1lqqs"
                  alt=""
                />
              </div>
              <div className="w-6 h-6 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAI9-GGH76E8XZymY7Cw8d7Fxf0mI3y2mmYwmhbwdVmhNrGUonIFVBY-mb5IFkJFl6QxoqBcqhRR752Xtc2WVHACdXkEQ5HYJLiNYvzgtr2iKe7M5x_LpieBdYH0qkDzNvjGZR4c3hlIFnNu3elMEYNt1k_1UM0oqN9brZhiy9QrZwf6vAHpC7MyVUby365OOKk7D8F2FELpl045gNeiHrujGjYzzSU7EGDADoeC4xgWLjFbsTUNSBc9kybRU_5oOjMX_7mNGY8-AI"
                  alt=""
                />
              </div>
            </div>
            <p className="text-[10px] text-blue-600 font-medium">
              Entrega estimada: Hoy, 18:00hs
            </p>
          </div>
        </div>

        {/* ITEM 2 */}
        <div className="group p-4 bg-slate-50 dark:bg-slate-300/50 rounded-xl hover:ring-2 hover:ring-primary/20 transition-all cursor-pointer">
          <div className="flex justify-between items-start">
            <div>
              <p className="font-bold text-sm">Pedido #LT-9398</p>
              <p className="text-xs text-secondary">
                12 Botellas • Asignado por BV
              </p>
            </div>
            <span className="bg-green-100 text-green-700 text-[10px] font-black px-2 py-1 rounded">
              ENTREGADO
            </span>
          </div>

          <div className="mt-4">
            <p className="text-[10px] text-emerald-600 font-medium">
              Finalizado el 24/10/2023
            </p>
          </div>
        </div>

        {/* ITEM 3 */}
        <div className="group p-4 bg-slate-50 dark:bg-slate-300/50 rounded-xl hover:ring-2 hover:ring-primary/20 transition-all cursor-pointer">
          <div className="flex justify-between items-start">
            <div>
              <p className="font-bold text-sm">Pedido #LT-9410</p>
              <p className="text-xs text-secondary">36 Botellas • Pendiente</p>
            </div>
            <span className="bg-amber-100 text-amber-700 text-[10px] font-black px-2 py-1 rounded">
              PROCESANDO
            </span>
          </div>

          <div className="mt-4">
            <p className="text-[10px] text-amber-600 font-medium">
              Validación de stock pendiente
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
