export default function HeaderSection() {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
      <div>
        <h2 className="text-3xl font-extrabold text-on-surface tracking-tight">
          Dashboard de Bodega
        </h2>
        <p className="text-secondary mt-1">
          Gestión centralizada de stock, pedidos y liquidaciones
        </p>
      </div>

      <button className="bg-primary text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 shadow-lg shadow-primary/20">
        <span className="material-symbols-outlined">add_shopping_cart</span>
        Generar Pedido de Reposición
      </button>
    </div>
  );
}
