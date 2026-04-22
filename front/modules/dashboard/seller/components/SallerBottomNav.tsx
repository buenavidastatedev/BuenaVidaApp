// src/modules/dashboard/seller/components/SellerBottomNav.tsx

export default function SellerBottomNav() {
  const items = [
    ["dashboard", "Inicio"],
    ["group", "Clientes"],
    ["payments", "Cobros"],
    ["analytics", "Métricas"],
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full h-16 bg-white border-t border-zinc-200 flex justify-around items-center z-50">
      {items.map(([icon, label], i) => (
        <button
          key={label}
          className={`flex flex-col items-center text-xs ${
            i === 0 ? "text-pink-600 font-bold" : "text-zinc-500"
          }`}
        >
          <span className="material-symbols-outlined">{icon}</span>

          {label}
        </button>
      ))}
    </nav>
  );
}
