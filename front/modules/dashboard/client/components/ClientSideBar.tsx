export default function SideBar() {
  const items = ["Inicio", "Portafolio", "Pedidos", "Perfil"];

  return (
    <aside className="fixed left-0 top-16 w-64 h-screen bg-white border-r border-zinc-200 p-6">
      <h2 className="text-xl font-bold text-pink-600 mb-8">Portal Clientes</h2>

      <nav className="space-y-2">
        {items.map((item) => (
          <div
            key={item}
            className="px-4 py-3 rounded-xl hover:bg-zinc-100 cursor-pointer font-medium"
          >
            {item}
          </div>
        ))}
      </nav>
    </aside>
  );
}
