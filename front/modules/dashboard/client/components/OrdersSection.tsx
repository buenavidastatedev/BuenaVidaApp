const orders = [
  { id: "94821", status: "En Camino" },
  { id: "94755", status: "Preparado" },
];

export default function OrdersSection() {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-6">Seguimiento de Pedidos</h2>

      <div className="grid md:grid-cols-2 gap-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-2xl border p-6 shadow-sm"
          >
            <p className="text-xs text-zinc-500">PEDIDO #{order.id}</p>

            <h3 className="text-xl font-bold mt-2">{order.status}</h3>

            <div className="w-full h-2 bg-zinc-100 rounded-full mt-6">
              <div className="w-2/3 h-full bg-pink-600 rounded-full"></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
