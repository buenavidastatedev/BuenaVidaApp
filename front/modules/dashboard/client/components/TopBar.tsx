export default function TopBar() {
  return (
    <header className="fixed top-0 w-full z-40 bg-white border-b border-zinc-200 shadow-sm flex justify-between items-center px-6 h-16">
      <h1 className="text-2xl font-black text-pink-600">Buena Vida</h1>

      <div className="flex items-center gap-4">
        <span className="text-sm font-bold text-pink-600">Inicio</span>
        <button>🔔</button>
        <button>👤</button>
      </div>
    </header>
  );
}
