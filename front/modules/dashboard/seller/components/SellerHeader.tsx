// src/modules/dashboard/seller/components/SellerHeader.tsx

export default function SellerHeader() {
  return (
    <header className="sticky top-0 z-50 h-16 bg-black border-b border-zinc-800 shadow-lg px-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="material-symbols-outlined text-pink-600">
          wine_bar
        </span>

        <h1 className="text-xl font-black text-white">Buena Vida</h1>
      </div>

      <button className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition">
        NUEVA VENTA
      </button>
    </header>
  );
}
