// src/modules/dashboard/seller/components/QuickActions.tsx

export default function QuickActions() {
  const actions = [
    ["payments", "Registrar Cobranza"],
    ["shopping_cart", "Cargar Pedido"],
  ];

  return (
    <div className="flex flex-col gap-4">
      {actions.map(([icon, label]) => (
        <button
          key={label}
          className="bg-white border border-zinc-200 rounded-xl shadow-sm p-5 flex items-center justify-between hover:shadow-md transition"
        >
          <div className="flex items-center gap-4">
            <div className="bg-pink-100 text-pink-600 p-3 rounded-lg">
              <span className="material-symbols-outlined">{icon}</span>
            </div>

            <span className="font-bold">{label}</span>
          </div>

          <span className="material-symbols-outlined text-zinc-400">
            chevron_right
          </span>
        </button>
      ))}
    </div>
  );
}
